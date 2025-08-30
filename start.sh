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
if [ ! -d "host" ]; then
    print_message "ERROR: host directory not found!" $RED
    exit 1
fi

if [ ! -d "decide" ]; then
    print_message "ERROR: decide directory not found!" $RED
    exit 1
fi

# Start decide microfrontend (port 5175)
print_message "Starting DECIDE microfrontend on port 5175..." $BLUE
cd decide
npm run dev > ../logs/decide.log 2>&1 &
DECIDE_PID=$!
cd ..

# Wait a moment for decide to start
sleep 2

# Start host application (port 3001)
print_message "Starting HOST application on port 3001..." $GREEN
cd host
npm run dev > ../logs/host.log 2>&1 &
HOST_PID=$!
cd ..

# Create logs directory if it doesn't exist
mkdir -p logs

print_message "Both applications are starting up..." $YELLOW
print_message "Host: http://localhost:3001" $GREEN
print_message "Decide: http://localhost:5175" $BLUE
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
    
    sleep 1
done

cleanup