#!/bin/bash

echo "[*] Starting Docker..."
echo ""
docker compose up --build -d
docker compose logs -f app
