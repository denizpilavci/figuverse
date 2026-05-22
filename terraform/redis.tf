resource "aws_elasticache_replication_group" "main" {
  replication_group_id          = "${var.project_name}-redis"
  description                   = "FiguVerse Redis - session, cart, cache"
  engine                        = "redis"
  engine_version                = "7.1"
  node_type                     = var.redis_node_type
  num_cache_clusters            = 1
  parameter_group_name          = "default.redis7"
  port                          = 6379
  subnet_group_name             = aws_elasticache_subnet_group.main.name
  security_group_ids            = [aws_security_group.redis.id]

  transit_encryption_enabled    = true
  at_rest_encryption_enabled    = true

  maintenance_window            = "sun:05:00-sun:06:00"
  snapshot_retention_limit      = 3
  snapshot_window               = "03:00-04:00"
}
