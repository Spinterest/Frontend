provider "aws" {
  region = var.region
  profile = "rotenda"
  default_tags {
    tags = var.common_tags
  }
}