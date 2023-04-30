module "naming" {
  source      = "git::https://github.com/vivitian930/tf-azurerm-naming?ref=v0.1.0"
  location    = var.location
  environment = var.environment
  channel     = var.channel
  project     = var.project_short
  solution    = var.solution
}

resource "azurerm_resource_group" "rg" {
  name     = module.naming.rg
  location = var.location
}
