module "app_config" {
  source              = "git::https://github.com/vivitian930/terraform-azurerm-app-config?ref=v0.1.2"
  name                = module.naming.appconf
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  key_values          = local.app_config_kv_map


  tags = {
    environment = var.environment
    channel     = var.channel
    project     = var.project_short
  }
}
