"""
Native MCP server built with FastMCP.

This defines each tool using the @mcp.tool decorator, reusing the exact
same service-layer functions your REST routers already call. This means
your business logic lives in ONE place (app/services/), and both the
REST API (for Node.js) and the MCP server (for MCP-compliant clients)
call into it identically.
"""

from fastmcp import FastMCP

from app.schemas.track_order import TrackOrderRequest


from app.services.track_order_service import get_order_tracking


# Create the MCP server instance. This name is what MCP clients
# (e.g. Claude Desktop, an MCP-aware Node client) will see when they connect.
mcp = FastMCP("MCP Nexus Tools")


@mcp.tool
async def track_order(order_id: str) -> dict:
    """
    Track the delivery status of an order by its order ID.
    Returns current status, estimated delivery date, and current location.
    """
    payload = TrackOrderRequest(order_id=order_id)
    result = await get_order_tracking(payload)
    return result.model_dump()


