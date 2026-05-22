{
  "family": "figuverse-backend",
  "networkMode": "awsvpc",
  "executionRoleArn": "${ECS_EXECUTION_ROLE_ARN}",
  "taskRoleArn": "${ECS_TASK_ROLE_ARN}",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "containerDefinitions": [
    {
      "name": "figuverse-backend",
      "image": "${IMAGE_URI}",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 5000,
          "protocol": "tcp",
          "appProtocol": "http"
        }
      ],
      "environment": [
        { "name": "NODE_ENV",   "value": "production" },
        { "name": "PORT",       "value": "5000" },
        { "name": "DB_HOST",    "value": "${DB_HOST}" },
        { "name": "DB_PORT",    "value": "5432" },
        { "name": "DB_NAME",    "value": "figuverse" },
        { "name": "REDIS_HOST", "value": "${REDIS_HOST}" },
        { "name": "REDIS_PORT", "value": "6379" },
        { "name": "REDIS_TLS",  "value": "true" },
        { "name": "DB_SSL",     "value": "true" }
      ],
      "secrets": [
        { "name": "DB_USER",     "valueFrom": "${DB_USER_SECRET_ARN}" },
        { "name": "DB_PASSWORD", "valueFrom": "${DB_PASSWORD_SECRET_ARN}" },
        { "name": "JWT_SECRET",  "valueFrom": "${JWT_SECRET_ARN}" }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/figuverse-backend",
          "awslogs-region": "${AWS_REGION}",
          "awslogs-stream-prefix": "ecs",
          "awslogs-create-group": "true"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 15
      }
    }
  ]
}
