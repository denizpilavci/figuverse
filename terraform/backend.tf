# Terraform state is stored locally by default.
# After the first `terraform apply`, uncomment the block below and run
# `terraform init -migrate-state` to migrate to S3 backend.
#
# Before doing so, create the S3 bucket and DynamoDB table manually or
# use a separate bootstrap Terraform configuration.
#
# ```bash
# aws s3 mb s3://figuverse-terraform-state --region eu-west-1
# aws dynamodb create-table \
#   --table-name figuverse-terraform-locks \
#   --attribute-definitions AttributeName=LockID,AttributeType=S \
#   --key-schema AttributeName=LockID,KeyType=HASH \
#   --billing-mode PAY_PER_REQUEST \
#   --region eu-west-1
# ```
#
# terraform {
#   backend "s3" {
#     bucket         = "figuverse-terraform-state"
#     key            = "terraform.tfstate"
#     region         = "eu-west-1"
#     dynamodb_table = "figuverse-terraform-locks"
#     encrypt        = true
#   }
# }
