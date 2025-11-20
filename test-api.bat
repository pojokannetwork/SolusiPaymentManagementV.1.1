@echo off
echo ====================================
echo  Test Backend API
echo ====================================
echo.

set API_URL=http://localhost/SolusiPaymentManagementV.1.1/backend

echo Testing API connection...
echo.

echo 1. Testing Health Check...
curl -s "%API_URL%/"
echo.
echo.

echo 2. Testing Login API...
curl -s -X POST "%API_URL%/auth/login" ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin\",\"password\":\"admin123\"}"
echo.
echo.

echo ====================================
echo  Test Complete
echo ====================================
echo.
echo If you see JSON responses above, the API is working!
echo.
pause
