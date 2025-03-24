#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}Starting Task Manager Application${NC}"
echo -e "${GREEN}=========================================${NC}"

# Check if Python is installed
if ! command -v python &> /dev/null && ! command -v python3 &> /dev/null; then
    echo -e "${RED}Python is not installed. Please install Python 3.8+ to run the backend.${NC}"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js 16+ to run the frontend.${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm is not installed. Please install npm 8+ to run the frontend.${NC}"
    exit 1
fi

# Use python3 command if available, otherwise use python
PYTHON_CMD="python"
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
fi

# Start backend
echo -e "${GREEN}Starting backend server...${NC}"
cd backend || exit

# Start backend in background
echo -e "${GREEN}Starting Python HTTP server...${NC}"
$PYTHON_CMD main.py &
BACKEND_PID=$!

# Check if backend started successfully
sleep 2
if ! ps -p $BACKEND_PID > /dev/null; then
    echo -e "${RED}Failed to start backend server. Please check the error messages above.${NC}"
    echo -e "${YELLOW}You may try running the backend manually with:${NC}"
    echo -e "cd backend"
    echo -e "python main.py"
    exit 1
fi

cd ..

# Start frontend
echo -e "${GREEN}Starting frontend server...${NC}"
cd frontend || exit
echo -e "${YELLOW}Installing frontend dependencies...${NC}"
npm install

# Start frontend
echo -e "${GREEN}Starting React development server...${NC}"
npm run dev

# Kill backend process when script is terminated
kill $BACKEND_PID 