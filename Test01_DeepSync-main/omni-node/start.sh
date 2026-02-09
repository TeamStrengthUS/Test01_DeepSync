#!/usr/bin/env bash
set -e

echo "Starting Letta server..."
letta server --host 0.0.0.0 --port 8283 &
SERVER_PID=$!

echo "Starting relay worker..."
node relay_worker.js

wait $SERVER_PID
