# MCP Nexus Server

Python FastAPI MCP (Model Context Protocol) tool server for the MCP Nexus chatbot project.

## Setup

1. Create a virtual environment:
   python3 -m venv venv

2. Activate it:
   - Mac/Linux: source venv/bin/activate
   - Windows: venv\Scripts\activate

3. Install dependencies:
   pip install -r requirements.txt

4. Run the server:
   uvicorn app.main:app --reload --port 8000

5. Open API docs:
   http://localhost:8000/docs

## Available Tools

- GET  /health
- POST /tools/track-order

