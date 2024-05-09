variable "common_tags" {
  type        = map(string)
  description = "Common tags applied to all resources"
  default     = {
    "name": "spinFront"
  }
}

variable "region" {
  type        = string
  description = "The region where the resources will be deployed."
  default     = "eu-wesr-1"
}

variable "vpc_cidr" {
  type        = string
  description = "The CIDR block for the VPC."
  default     = "10.0.0.0/16"
}

variable "vpc_az" {
  type        = string
  description = "The availability zone for the VPC."
  default     = "eu-west-1a"
}

variable "vpc_public_subnet" {
  type        = string
  description = "The public subnet for the VPC."
  default     = "10.0.1.0/24"
}

variable "ec2_public_key" {
  type        = string
  description = "The public key to use for the EC2 instance."
  default     = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDE3h9XwIHlNCDZyxPV04r/FGUP56fSI6r1DO9Ds7IGenoCkeVAQH47obsghOUTcvrtpXTdRWiSS2M+vZ0Ua9AIW+wKKBEiIXIJ+NnhQQ5m4owoe3DiwugpkGrzvUrXz3u73a8Fg8VvZZc2VTnJGkpenoONrLzIPShZ+0s6axZm6Gt+LyFmqQuysknDxTB0D/TzNLlwYVEpXKt2uFLjNd0O8RwZ0VnNZHhgE7d6YqFezzaGh+NlVoFbrVPyLLBoeKVbskYVP+mNnS3Sdm4+5s7G8Y6x3k6P5kEDEAZ7m2B+EfDjI84jsTm98HtFqNH/hS1sfK0VsUoRRPfldBahg8CnS7yDyaS8+ViC+Wlpd/y3FnZYk5olpnPW1K85WM1gAdPXPyxSPoL3PIbjNvJI1YXQmtefv0xEMJX164cikBlaSunnNQwC6MzAbe3SXENV4TQPOY1E6CFKCv4W9Ws4nilIJULxJN93iRU6qYu5sSAJc9S/DqOOOYUyZWAV9IneClE= vf-root"
}

variable "naming_prefix" {
  type        = string
  description = "The prefix to use for naming resources."
  default     = "spinFront"
}

