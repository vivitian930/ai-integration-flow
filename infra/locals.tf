locals {
  tags = {
    environment = var.environment
    channel     = var.channel
    project     = var.project_short
  }
  app_config_kv_map = {
    gpt_complete = {
      key   = "gpt_complete"
      value = ""
      label = "dev"
    }
    gpt_mock = {
      key   = "gpt_mock"
      value = ""
      label = "dev"
    }
  }
}
