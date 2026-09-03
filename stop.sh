#!/bin/bash
echo "[*] Cleaning docker containers, images, volumes and network..."
echo ""
docker compose down
docker container prune
docker volume rm $(docker volume ls|awk 'NR>1{print $2}') 2>/dev/null
docker network rm $(docker network ls|awk 'NR>1{print $1}') 2>/dev/null
docker rmi my-backend-app:latest
echo ""
echo "[+] Cleaned up completed"
echo ""
docker images
echo ""
docker volume ls
echo ""
docker network ls

