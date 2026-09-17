@echo off
title Next.js Server Stopper

echo Stopping Next.js server on port 999...
set "found=0"

for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":999" ^| findstr "LISTENING"') do (
    echo Found process listening on port 999: PID %%a
    echo Killing process %%a...
    taskkill /F /PID %%a /T
    set "found=1"
)

if "%found%"=="0" (
    echo No process found listening on port 999.
) else (
    echo Successfully stopped the server.
)

pause
