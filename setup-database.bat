@echo off
echo ====================================
echo  Setup Database - Solusi Payment
echo ====================================
echo.

REM Check if MySQL is running
tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I /N "mysqld.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo [OK] MySQL is running
) else (
    echo [ERROR] MySQL is not running!
    echo Please start MySQL from XAMPP Control Panel first.
    pause
    exit /b
)

echo.
echo Creating database and importing schema...
echo.

REM Import database schema
mysql -u root -e "CREATE DATABASE IF NOT EXISTS solusi_payment CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root solusi_payment < database\schema.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ====================================
    echo  Database setup completed!
    echo ====================================
    echo.
    echo Database: solusi_payment
    echo Default Admin:
    echo   Username: admin
    echo   Password: admin123
    echo.
    echo You can now access:
    echo   - phpMyAdmin: http://localhost/phpmyadmin
    echo   - Backend API: http://localhost/SolusiPaymentManagementV.1.1/backend/
    echo   - Frontend: http://localhost/SolusiPaymentManagementV.1.1/frontend/
    echo.
) else (
    echo.
    echo [ERROR] Failed to import database!
    echo Please check:
    echo 1. MySQL is running
    echo 2. File database\schema.sql exists
    echo 3. MySQL bin path is in system PATH
    echo.
)

pause
