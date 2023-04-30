module "function_app" {
  source               = "git::https://github.com/vivitian930/tf-azurerm-function-app?ref=v0.1.1"
  name                 = module.naming.func
  resource_group_name  = azurerm_resource_group.rg.name
  location             = var.location
  app_service_plan_sku = "Y1"
  os_type              = "Linux"

  app_service_plan_name                = module.naming.asp
  system_assigned_managed_identity     = true
  new_storage_account_name             = module.naming.sa
  new_storage_account_tier             = "Standard"
  new_storage_account_replication_type = "LRS"
  node_version                         = 16

  tags = local.tags
}
