#!/bin/bash

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null
then
    echo "Python 3 is not installed. Please install Python 3 to run this project."
    exit
fi

# Start a local server on port 8000 in the background
python3 -m http.server 8000 &

# Wait a moment to ensure the server starts
sleep 3

# Open the default browser to the local server URL
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:8000/index.html
elif command -v open &> /dev/null; then
    open http://localhost:8000/index.html
else
    echo "Cannot detect the default browser to open. Please navigate to http://localhost:8000/index.html manually."
fi
