module "linux_web_app" {
  source               = "git::https://github.com/vivitian930/tf-azurerm-linux-web-app?ref=v0.2.0"
  name                 = module.naming.app
  resource_group_name  = azurerm_resource_group.rg.name
  location             = var.location
  app_service_plan_sku = "B1"
  os_type              = "Linux"
  docker_image         = "vivitian/prompt-server"
  docker_image_tag     = "0.1.0"

  app_service_plan_name            = module.naming.asp
  system_assigned_managed_identity = true

  app_settings = local.web_app_settings

  tags = local.tags
}
