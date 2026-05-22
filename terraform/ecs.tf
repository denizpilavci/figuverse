# ── ECS Cluster ──
resource "aws_ecs_cluster" "main" {
  name = "${var.project_name}-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

# ── Backend Task Definition (Express API) ──
resource "aws_ecs_task_definition" "backend" {
  family                   = "${var.project_name}-backend"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.ecs_backend_cpu
  memory                   = var.ecs_backend_memory
  execution_role_arn       = aws_iam_role.ecs_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([
    {
      name      = "figuverse-backend"
      image     = "${aws_ecr_repository.backend.repository_url}:latest"
      essential = true

      portMappings = [
        {
          containerPort = 5000
          protocol      = "tcp"
          appProtocol   = "http"
        }
      ]

      environment = [
        { name = "NODE_ENV",    value = "production" },
        { name = "PORT",        value = "5000" },
        { name = "DB_HOST",     value = aws_db_instance.main.address },
        { name = "DB_PORT",     value = "5432" },
        { name = "DB_NAME",     value = "figuverse" },
        { name = "REDIS_HOST",  value = aws_elasticache_replication_group.main.primary_endpoint_address },
        { name = "REDIS_PORT",  value = "6379" },
        { name = "S3_BUCKET",   value = aws_s3_bucket.images.id }
      ]

      secrets = [
        { name = "DB_USER",     valueFrom = aws_secretsmanager_secret.db_user.arn },
        { name = "DB_PASSWORD", valueFrom = aws_secretsmanager_secret.db_password.arn },
        { name = "JWT_SECRET",  valueFrom = aws_secretsmanager_secret.jwt_secret.arn }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.backend.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
          "awslogs-create-group"  = "true"
        }
      }

      healthCheck = {
        command     = ["CMD-SHELL", "wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 15
      }
    }
  ])

  depends_on = [
    aws_db_instance.main,
    aws_elasticache_replication_group.main,
    aws_secretsmanager_secret_version.db_user,
    aws_secretsmanager_secret_version.db_password,
    aws_secretsmanager_secret_version.jwt_secret,
    aws_cloudwatch_log_group.backend
  ]
}

# ── Backend ECS Service ──
resource "aws_ecs_service" "backend" {
  name            = "${var.project_name}-backend-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.backend.arn
  desired_count   = var.ecs_min_capacity
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = data.aws_subnets.main.ids
    security_groups = [aws_security_group.ecs.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.backend.arn
    container_name   = "figuverse-backend"
    container_port   = 5000
  }

  health_check_grace_period_seconds = 30

  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }

  depends_on = [aws_alb_listener.http]
}
