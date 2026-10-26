from typing import Any, Optional

from pydantic import BaseModel


class TrackOrderRequest(BaseModel):
    order_id: str


class TrackOrderResponse(BaseModel):
    order_id: str
    shipment_id: Optional[str] = None
    tracking_number: Optional[str] = None

    status: Optional[str] = None
    status_code: Optional[str] = None

    created_at: Optional[str] = None
    last_updated: Optional[str] = None
    estimated_delivery: Optional[str] = None

    carrier: Optional[dict[str, Any]] = None
    sender: Optional[dict[str, Any]] = None
    receiver: Optional[dict[str, Any]] = None

    package: Optional[dict[str, Any]] = None
    payment: Optional[dict[str, Any]] = None

    delivery_agent: Optional[dict[str, Any]] = None

    live_location: Optional[dict[str, Any]] = None

    tracking_history: list[dict[str, Any]] = []

    map: Optional[dict[str, Any]] = None