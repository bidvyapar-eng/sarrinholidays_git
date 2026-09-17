@echo off
title Next.js Server Launcher

echo Checking if port 999 is already in use...
netstat -aon | findstr ":999" | findstr "LISTENING" >nul
if %errorlevel% equ 0 (
    echo Port 999 is already in use. Opening browser...
    start http://localhost:999
    goto end
)

echo Starting Next.js Development Server...
set PORT=999
start "Next.js Server" cmd /k "npm run dev"

echo Waiting for the server to start (5 seconds)...
timeout /t 5 /nobreak > NUL

echo Opening browser at http://localhost:999...
start http://localhost:999

:end
echo Done.
pause
