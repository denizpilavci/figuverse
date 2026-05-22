provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "FiguVerse"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

# CloudFront-scoped WAFv2 WebACLs must be created in us-east-1
provider "aws" {
  alias  = "us-east-1"
  region = "us-east-1"

  default_tags {
    tags = {
      Project     = "FiguVerse"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}
