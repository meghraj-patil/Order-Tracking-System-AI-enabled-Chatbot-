from fastapi import APIRouter
from app.schemas.track_order import TrackOrderRequest, TrackOrderResponse
from app.services.track_order_service import get_order_tracking

router = APIRouter(prefix="/tools", tags=["Track Order Tool"])


@router.post("/track-order", response_model=TrackOrderResponse)
async def track_order(payload: TrackOrderRequest) -> TrackOrderResponse:
    return await get_order_tracking(payload)