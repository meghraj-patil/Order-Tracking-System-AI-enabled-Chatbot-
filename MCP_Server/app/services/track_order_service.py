import httpx

from app.schemas.track_order import (
    TrackOrderRequest,
    TrackOrderResponse
)


async def get_order_tracking(
    payload: TrackOrderRequest
) -> TrackOrderResponse:

    base_url = "https://shipmentapi.vercel.app/api/shipments/"

    async with httpx.AsyncClient() as client:

        # First request to know total pages
        response = await client.get(
            base_url,
            params={"page": 1}
        )

        print("API URL:", response.url)
        print("API STATUS:", response.status_code)

        response.raise_for_status()

        first_page = response.json()

        total = first_page.get("total", 0)
        limit = first_page.get("limit", 20)

        # Calculate total number of pages
        total_pages = (total + limit - 1) // limit

        print("TOTAL SHIPMENTS:", total)
        print("LIMIT:", limit)
        print("TOTAL PAGES:", total_pages)

        # Search page by page
        for page in range(1, total_pages + 1):

            # Use first response for page 1
            if page == 1:
                response_data = first_page

            else:
                response = await client.get(
                    base_url,
                    params={"page": page}
                )

                print(
                    f"Checking page {page}:",
                    response.url
                )

                response.raise_for_status()

                response_data = response.json()

            shipments = response_data.get("data", [])

            # Search orderId
            shipment = next(
                (
                    item
                    for item in shipments
                    if item.get("orderId") == payload.order_id
                ),
                None
            )

            # Order found
            if shipment:

                live_location = shipment.get(
                    "liveLocation",
                    {}
                )

                return TrackOrderResponse(
    order_id=shipment.get("orderId"),

    shipment_id=shipment.get("shipmentId"),

    tracking_number=shipment.get("trackingNumber"),

    status=shipment.get("status"),

    status_code=shipment.get("statusCode"),

    created_at=shipment.get("createdAt"),

    last_updated=shipment.get("lastUpdated"),

    estimated_delivery=shipment.get(
        "estimatedDelivery"
    ),

    carrier=shipment.get("carrier"),

    sender=shipment.get("sender"),

    receiver=shipment.get("receiver"),

    package=shipment.get("package"),

    payment=shipment.get("payment"),

    delivery_agent=shipment.get(
        "deliveryAgent"
    ),

    live_location=shipment.get(
        "liveLocation"
    ),

    tracking_history=shipment.get(
        "trackingHistory",
        []
    ),

    map=shipment.get("map")
)
        # Order not found after checking all pages
        raise ValueError(
            f"Order {payload.order_id} not found"
        )