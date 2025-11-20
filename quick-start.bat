@echo off
echo ====================================
echo  Quick Start - Solusi Payment
echo ====================================
echo.

set PROJECT_NAME=SolusiPaymentManagementV.1.1
set SOURCE_DIR=%~dp0
set DEST_DIR=C:\xampp\htdocs\%PROJECT_NAME%

echo Checking XAMPP installation...
if not exist "C:\xampp\" (
    echo [ERROR] XAMPP not found at C:\xampp\
    echo Please install XAMPP first!
    echo Download: https://www.apachefriends.org/
    pause
    exit /b
)

echo [OK] XAMPP found
echo.

REM Check if Apache is running
tasklist /FI "IMAGENAME eq httpd.exe" 2>NUL | find /I /N "httpd.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo [OK] Apache is running
) else (
    echo [WARNING] Apache is not running!
    echo Starting Apache...
    "C:\xampp\apache_start.bat"
)

REM Check if MySQL is running
tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I /N "mysqld.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo [OK] MySQL is running
) else (
    echo [WARNING] MySQL is not running!
    echo Starting MySQL...
    "C:\xampp\mysql_start.bat"
)

echo.
echo Copying project to htdocs...

REM Create destination directory if not exists
if not exist "%DEST_DIR%" mkdir "%DEST_DIR%"

REM Copy files
xcopy /E /I /Y "%SOURCE_DIR%*" "%DEST_DIR%"

if %ERRORLEVEL% EQU 0 (
    echo [OK] Files copied successfully
) else (
    echo [ERROR] Failed to copy files
    pause
    exit /b
)

echo.
echo Setting up database...
cd /d "%DEST_DIR%"
call setup-database.bat

echo.
echo ====================================
echo  Setup Complete!
echo ====================================
echo.
echo Opening applications...
timeout /t 2 /nobreak >nul

REM Open XAMPP Control Panel
start "" "C:\xampp\xampp-control.exe"

REM Wait a bit
timeout /t 2 /nobreak >nul

REM Open phpMyAdmin
start "" "http://localhost/phpmyadmin"

REM Wait a bit
timeout /t 2 /nobreak >nul

REM Open Backend API
start "" "http://localhost/%PROJECT_NAME%/backend/"

REM Wait a bit
timeout /t 2 /nobreak >nul

REM Open Frontend
start "" "http://localhost/%PROJECT_NAME%/frontend/login.html"

echo.
echo All done! Happy coding!
echo.
pause
