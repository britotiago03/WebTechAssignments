Project Instructions

Introduction
This project is a simple web application that provides dynamic content loading and real-time weather information. The project consists of three pages, each accessible via the header links.

- Header Link One: Basic introduction page.
- Header Link Two: Dynamic content loading from a public API.
- Header Link Three: Real-time weather information for multiple locations.

Please follow the instructions below to set up and run the project.

Running the Project
You can run the project in two ways:
1. By simply opening "index.html" directly in your browser (limited functionality).
2. By running the provided script to serve the project via an HTTP server (full functionality).

Option 1: Open Directly in Browser
If you prefer to quickly preview the project, you can:
1. Extract the ".zip" file to a directory of your choice.
2. Open "index.html" in your web browser.

Note: If you use this method, only "Header Link One" and "Header Link Two" will work properly. "Header Link Three" requires an HTTP server to work correctly due to restrictions with API calls.

Option 2: Run Using the Provided Script (Recommended)
To ensure that all pages work as intended, including real-time weather information on "Header Link Three", follow these steps:

Windows Users
1. Make sure Python is installed. You can download it from https://www.python.org/downloads/.
2. Extract the ".zip" file to a directory of your choice.
3. Double-click on the "run_server.bat" file. This script will:
   - Start a local HTTP server using Python.
   - Open the project automatically in your default browser.

Mac/Linux Users
1. Make sure Python 3 is installed. You can check by running "python3 --version" in the terminal.
2. Extract the ".zip" file to a directory of your choice.
3. Open a terminal in the project directory and run the following command:
   sh run_server.sh
   This script will:
   - Start a local HTTP server using Python.
   - Open the project automatically in your default browser.

Why You Need to Run a Server
"Header Link Three" (the weather information page) requires an HTTP server because it needs to make real-time requests to the Open Meteo API. Modern browsers enforce security policies (CORS) that block these types of requests if the project is not served via an HTTP server. The provided scripts take care of this by using Python's built-in server functionality, ensuring all API requests work properly.

Summary
- Open Directly: Works for "Header Link One" and "Header Link Two" only.
- Run Script: Full functionality, including "Header Link Three" (weather data).

Feel free to explore and enjoy the project!

