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

  web_app_settings = {
    "BASIC_AUTH_TOKEN"           = "@Microsoft.KeyVault(VaultName=kv-aue-eric-01;SecretName=BASIC-AUTH-TOKEN)"
    "OPENAI_ORG"                 = "@Microsoft.KeyVault(VaultName=kv-aue-eric-01;SecretName=OPENAI-ORG)"
    "OPENAI_API_KEY"             = "@Microsoft.KeyVault(VaultName=kv-aue-eric-01;SecretName=OPENAI-KEY)"
    "DOCKER_REGISTRY_SERVER_URL" = "https://index.docker.io/v1"
    "WEBSITES_PORT"              = "3080"
  }
}
