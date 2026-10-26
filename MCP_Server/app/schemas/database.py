from pydantic import BaseModel, Field
from typing import Any


class DatabaseQueryRequest(BaseModel):
    table: str = Field(..., min_length=1, description="Table name to query")
    filters: dict[str, Any] = Field(
        default_factory=dict, description="Key-value filters to apply"
    )


class DatabaseQueryResponse(BaseModel):
    table: str
    filters: dict[str, Any]
    results: list[dict[str, Any]]
    count: int