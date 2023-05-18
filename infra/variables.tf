variable "location" {
  description = "Location where to provision resources."
  type        = string
}

variable "environment" {
  description = "Environment."
  type        = string
}

variable "channel" {
  description = "project channel"
  type        = string
}
variable "project_short" {
  description = "Project short code."
  type        = string
}

variable "solution" {
  description = "solution"
  type        = string
}

variable "key_vault_name" {
  type        = string
  description = "key vault name"
}

variable "key_vault_rg_name" {
  type        = string
  description = "key vault resource group name"
}
