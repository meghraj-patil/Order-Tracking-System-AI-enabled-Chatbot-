from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Centralized application settings.
    Values are loaded from environment variables / the .env file.
    Never hardcode config values directly in business logic — read them from here.
    """

    app_name: str = "MCP Nexus Server"
    app_env: str = "development"
    debug: bool = True
    host: str = "0.0.0.0"
    port: int = 8000
    allowed_origins: str = "http://localhost:3000,http://localhost:5000"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    @property
    def allowed_origins_list(self) -> list[str]:
        """Splits the comma-separated ALLOWED_ORIGINS string into a Python list."""
        return [origin.strip() for origin in self.allowed_origins.split(",")]


# A single shared instance, imported everywhere config is needed.
settings = Settings()