output "cloudfront_domain" {
  description = "CloudFront distribution domain (entry point for the app)"
  value       = aws_cloudfront_distribution.main.domain_name
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (for cache invalidation in CI/CD)"
  value       = aws_cloudfront_distribution.main.id
}

output "alb_dns_name" {
  description = "ALB DNS name (for debugging, not used directly)"
  value       = aws_alb.main.dns_name
}

output "rds_host" {
  description = "RDS hostname (set as DB_HOST in GitHub secrets)"
  value       = aws_db_instance.main.address
}

output "redis_host" {
  description = "Redis hostname (set as REDIS_HOST in GitHub secrets)"
  value       = aws_elasticache_replication_group.main.primary_endpoint_address
}

output "ecr_backend_url" {
  description = "ECR repository URL for backend (set as secret in CI/CD)"
  value       = aws_ecr_repository.backend.repository_url
}

output "s3_frontend_bucket" {
  description = "S3 bucket name for frontend static files"
  value       = aws_s3_bucket.frontend.id
}

output "s3_images_bucket" {
  description = "S3 bucket name for product images"
  value       = aws_s3_bucket.images.id
}

output "ecs_cluster_name" {
  description = "ECS cluster name"
  value       = aws_ecs_cluster.main.name
}

output "ecs_backend_service_name" {
  description = "Backend ECS service name"
  value       = aws_ecs_service.backend.name
}

output "ecs_execution_role_arn" {
  description = "ECS execution role ARN (for task definition templates)"
  value       = aws_iam_role.ecs_execution.arn
}

output "ecs_task_role_arn" {
  description = "ECS task role ARN (for task definition templates)"
  value       = aws_iam_role.ecs_task.arn
}

output "db_user_secret_arn" {
  description = "Secrets Manager ARN for DB user"
  value       = aws_secretsmanager_secret.db_user.arn
}

output "db_password_secret_arn" {
  description = "Secrets Manager ARN for DB password"
  value       = aws_secretsmanager_secret.db_password.arn
}

output "jwt_secret_arn" {
  description = "Secrets Manager ARN for JWT secret"
  value       = aws_secretsmanager_secret.jwt_secret.arn
}
