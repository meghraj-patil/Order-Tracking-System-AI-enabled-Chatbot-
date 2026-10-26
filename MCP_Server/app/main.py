import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from fastmcp.utilities.lifespan import combine_lifespans

from app.core.config import settings
from app.core.logging_config import configure_logging
from app.routers import track_order
from app.mcp_server import mcp

configure_logging()
logger = logging.getLogger(__name__)


@asynccontextmanager
async def app_lifespan(app: FastAPI):
    """
    Your app's own startup/shutdown logic (replaces the old @app.on_event
    handlers, since a FastAPI app can only have ONE lifespan — and we need
    to combine this with the MCP server's lifespan below).
    """
    logger.info("%s starting up in '%s' mode", settings.app_name, settings.app_env)
    yield
    logger.info("%s shutting down", settings.app_name)


# Build the MCP server as a mountable ASGI app.
# path="/" because we choose the final mount path ourselves below (app.mount("/mcp", ...)).
mcp_app = mcp.http_app(path="/")

# combine_lifespans runs BOTH your app's startup/shutdown AND the MCP
# server's own required startup/shutdown (session manager init, etc.).
# Skipping this would leave the MCP server's internals uninitialized.
app = FastAPI(
    title=settings.app_name,
    description="MCP Nexus server: REST tool endpoints (for Node.js) + native MCP server (for MCP clients).",
    version="1.0.0",
    lifespan=combine_lifespans(app_lifespan, mcp_app.lifespan),
)

# CORS: only affects browser-based calls (e.g. /docs). Server-to-server
# calls from Node.js are unaffected by CORS rules.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.exception("Unhandled error while processing request: %s", request.url)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error in MCP Server."},
        
    )


# --- Your existing REST tool endpoints (unchanged, used by Node.js) ---

app.include_router(track_order.router)

# --- The native MCP server, mounted at /mcp ---
# Any MCP-compliant client can now connect to http://localhost:8000/mcp
app.mount("/mcp", mcp_app)