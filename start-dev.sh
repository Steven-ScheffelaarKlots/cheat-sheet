#!/bin/bash

# Colors for output
BLUE='\033[0;34m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Starting development servers..."

# Start backend and frontend in parallel, prefixing output
(cd "$SCRIPT_DIR/node" && node server.js 2>&1 | sed "s/^/$(echo -e "${GREEN}[backend]${NC}") /") &
BACKEND_PID=$!

(cd "$SCRIPT_DIR/react/cheat-sheet" && npm run dev 2>&1 | sed "s/^/$(echo -e "${BLUE}[frontend]${NC}") /") &
FRONTEND_PID=$!

# Handle Ctrl+C to kill both processes
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM

# Wait for both processes
wait
