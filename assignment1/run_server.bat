@echo off
REM Check if Python is installed
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo Python is not installed. Please install Python to run this project.
    pause
    exit /b
)

REM Start a local server on port 8000
start cmd /c "python -m http.server 8000"

REM Wait a moment to ensure the server starts
timeout /t 3 >nul

REM Open the default browser to the local server URL
start http://localhost:8000/index.html

pause
