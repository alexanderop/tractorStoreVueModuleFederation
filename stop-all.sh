#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_message() {
    echo -e "${2}[$(date '+%H:%M:%S')] ${1}${NC}"
}

print_message "Stopping all Module Federation applications..." $YELLOW

# Stop all related processes
print_message "Killing rsbuild dev processes..." $RED
pkill -f "rsbuild dev" 2>/dev/null

print_message "Killing vite processes..." $RED  
pkill -f "vite.*decide" 2>/dev/null

# Also kill any node processes on our specific ports
print_message "Checking for processes on ports 3001, 5175, and 3004..." $YELLOW
lsof -ti:3001 | xargs kill -9 2>/dev/null || true
lsof -ti:5175 | xargs kill -9 2>/dev/null || true
lsof -ti:3004 | xargs kill -9 2>/dev/null || true

print_message "All Module Federation applications stopped." $GREEN