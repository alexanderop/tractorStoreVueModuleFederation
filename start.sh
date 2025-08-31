#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored messages
print_message() {
    echo -e "${2}[$(date '+%H:%M:%S')] ${1}${NC}"
}

# Function to cleanup processes on exit
cleanup() {
    print_message "Stopping all processes..." $YELLOW
    if [ -n "$HOST_PID" ]; then
        kill $HOST_PID 2>/dev/null
    fi
    if [ -n "$DECIDE_PID" ]; then
        kill $DECIDE_PID 2>/dev/null
    fi
    if [ -n "$EXPLORE_PID" ]; then
        kill $EXPLORE_PID 2>/dev/null
    fi
    if [ -n "$CHECKOUT_PID" ]; then
        kill $CHECKOUT_PID 2>/dev/null
    fi
    # Kill any remaining npm/node processes from our apps
    pkill -f "rsbuild dev" 2>/dev/null
    pkill -f "vite.*decide" 2>/dev/null
    print_message "All processes stopped." $GREEN
    exit 0
}

# Set up signal trapping
trap cleanup SIGINT SIGTERM

print_message "Starting Module Federation Development Environment..." $CYAN
print_message "==========================================================" $CYAN

# Check if directories exist
if [ ! -d "apps/host" ]; then
    print_message "ERROR: apps/host directory not found!" $RED
    exit 1
fi

if [ ! -d "apps/decide" ]; then
    print_message "ERROR: apps/decide directory not found!" $RED
    exit 1
fi

if [ ! -d "apps/explore" ]; then
    print_message "ERROR: apps/explore directory not found!" $RED
    exit 1
fi

if [ ! -d "apps/checkout" ]; then
    print_message "ERROR: apps/checkout directory not found!" $RED
    exit 1
fi

# Start decide microfrontend (port 5175)
print_message "Starting DECIDE microfrontend on port 5175..." $BLUE
cd apps/decide
pnpm dev > ../../logs/decide.log 2>&1 &
DECIDE_PID=$!
cd ../..

# Start explore microfrontend (port 3004)
print_message "Starting EXPLORE microfrontend on port 3004..." $CYAN
cd apps/explore
pnpm dev > ../../logs/explore.log 2>&1 &
EXPLORE_PID=$!
cd ../..

# Start checkout microfrontend (port 3003)
print_message "Starting CHECKOUT microfrontend on port 3003..." $YELLOW
cd apps/checkout
pnpm dev > ../../logs/checkout.log 2>&1 &
CHECKOUT_PID=$!
cd ../..

# Wait a moment for microfrontends to start
sleep 3

# Start host application (port 3001)
print_message "Starting HOST application on port 3001..." $GREEN
cd apps/host
pnpm dev > ../../logs/host.log 2>&1 &
HOST_PID=$!
cd ../..

# Create logs directory if it doesn't exist
mkdir -p logs

print_message "All applications are starting up..." $YELLOW
print_message "Host: http://localhost:3001" $GREEN
print_message "Decide: http://localhost:5175" $BLUE  
print_message "Explore: http://localhost:3004" $CYAN
print_message "Checkout: http://localhost:3003" $YELLOW
print_message "" $NC
print_message "Press Ctrl+C to stop all applications" $YELLOW
print_message "Logs are saved in ./logs/ directory" $CYAN

# Monitor processes and show logs
while true; do
    # Check if processes are still running
    if ! kill -0 $HOST_PID 2>/dev/null; then
        print_message "Host application stopped unexpectedly!" $RED
        break
    fi
    
    if ! kill -0 $DECIDE_PID 2>/dev/null; then
        print_message "Decide application stopped unexpectedly!" $RED
        break
    fi
    
    if ! kill -0 $EXPLORE_PID 2>/dev/null; then
        print_message "Explore application stopped unexpectedly!" $RED
        break
    fi
    
    if ! kill -0 $CHECKOUT_PID 2>/dev/null; then
        print_message "Checkout application stopped unexpectedly!" $RED
        break
    fi
    
    sleep 1
done

cleanup