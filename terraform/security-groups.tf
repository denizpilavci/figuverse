# ── ALB Security Group ──
# CloudFront connects to ALB over HTTP. Viewer HTTPS is handled by CloudFront.
resource "aws_security_group" "alb" {
  name        = "${var.project_name}-alb-sg"
  description = "ALB: accepts HTTP from CloudFront"
  vpc_id      = data.aws_vpc.main.id

  ingress {
    description = "HTTP from CloudFront"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ── ECS Security Group ──
# Allows ALB to reach the backend Express API container on port 5000.
resource "aws_security_group" "ecs" {
  name        = "${var.project_name}-ecs-sg"
  description = "ECS: receives traffic from ALB, connects to DBs & AWS services"
  vpc_id      = data.aws_vpc.main.id

  ingress {
    description     = "Backend: Express API receives HTTP from ALB"
    from_port       = 5000
    to_port         = 5000
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    description = "All outbound (via public subnets + IGW)"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ── RDS Security Group ──
# PostgreSQL accessible only by ECS tasks (not from internet or ALB).
resource "aws_security_group" "rds" {
  name        = "${var.project_name}-rds-sg"
  description = "RDS: accepts PostgreSQL only from ECS tasks"
  vpc_id      = data.aws_vpc.main.id

  ingress {
    description     = "PostgreSQL from ECS tasks (backend app)"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.ecs.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ── Redis Security Group ──
# Redis accessible only by ECS tasks (sessions, cart, cache).
resource "aws_security_group" "redis" {
  name        = "${var.project_name}-redis-sg"
  description = "Redis: accepts connections only from ECS tasks"
  vpc_id      = data.aws_vpc.main.id

  ingress {
    description     = "Redis from ECS tasks (session, cart, cache)"
    from_port       = 6379
    to_port         = 6379
    protocol        = "tcp"
    security_groups = [aws_security_group.ecs.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
