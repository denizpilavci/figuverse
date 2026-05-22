variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "eu-west-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "figuverse"
}

variable "redis_node_type" {
  description = "ElastiCache node type"
  type        = string
  default     = "cache.t3.micro"
}

variable "ecs_backend_cpu" {
  description = "Backend ECS task CPU units (Express)"
  type        = number
  default     = 512
}

variable "ecs_backend_memory" {
  description = "Backend ECS task memory (MB)"
  type        = number
  default     = 1024
}

variable "ecs_min_capacity" {
  description = "Minimum backend ECS tasks"
  type        = number
  default     = 2
}

variable "ecs_max_capacity" {
  description = "Maximum backend ECS tasks (for Crazy Friday scale-out)"
  type        = number
  default     = 10
}

variable "domain_name" {
  description = "Custom domain name (optional, e.g. figuverse.com)"
  type        = string
  default     = ""
}
