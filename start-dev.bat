@echo off
echo Starting FinSight Full-Stack Application...

REM Start the backend server
echo Starting backend server...
start "FinSight Backend" cmd /k "cd /d %~dp0server && npm run dev"

REM Wait a moment for the backend to start
timeout /t 3 /nobreak >nul

REM Start the frontend development server
echo Starting frontend development server...
start "FinSight Frontend" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo FinSight application is starting up!
echo Backend will be available at: http://localhost:5000
echo Frontend will be available at: http://localhost:5173
echo.
echo Press any key to continue...
pause >nul
