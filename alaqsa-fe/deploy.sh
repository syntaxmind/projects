#!/bin/bash
set -e
APP=/root/medusa-store/q-store/apps/storefront
STANDALONE=$APP/.next/standalone/medusa-store/q-store/apps/storefront

cd "$APP"
set -a && source "$APP/.env.local" && set +a
npm run build

cp -r "$APP/.next/static" "$STANDALONE/.next/static"
cp -r "$APP/public" "$STANDALONE/public"

kill $(ss -tlnp | grep ':8000' | grep -oP 'pid=\K[0-9]+' | head -1) 2>/dev/null || true
sleep 2

cd "$STANDALONE"
set -a && source "$APP/.env.local" && set +a
PORT=8000 HOSTNAME=0.0.0.0 nohup node server.js > /root/medusa-store/storefront-prod.log 2>&1 &
echo "Deployed. PID: $!"
sleep 3
curl -s -o /dev/null -w "home: %{http_code}\n" http://localhost:8000/
curl -s -o /dev/null -w "products: %{http_code}\n" http://localhost:8000/products
curl -s -o /dev/null -w "api: %{http_code}\n" "http://localhost:8000/api/store/products?limit=1&region_id=reg_01KWTBHBPTF6CDBJNK83K80FB0"
