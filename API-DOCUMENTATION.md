# API Documentation - Solusi Payment Management v1.1

Base URL: `http://localhost/SolusiPaymentManagementV.1.1/backend`

---

## 🔐 Authentication

### Login
**POST** `/auth/login`

Request:
```json
{
  "username": "admin",
  "password": "admin123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@solusipayment.com",
      "full_name": "Administrator",
      "role": "admin",
      "status": "active"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Register
**POST** `/auth/register`

Request:
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "full_name": "John Doe",
  "phone": "081234567890"
}
```

Response:
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user_id": 2
  }
}
```

### Verify Token
**GET** `/auth/verify`

Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

Response:
```json
{
  "success": true,
  "message": "Token is valid",
  "data": {
    "user_id": 1,
    "username": "admin",
    "role": "admin"
  }
}
```

### Logout
**POST** `/auth/logout`

Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

Response:
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## 📊 Dashboard (Coming Soon)

### Get Dashboard Stats
**GET** `/dashboard`

Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

Response:
```json
{
  "success": true,
  "data": {
    "total_revenue": 45500000,
    "total_transactions": 128,
    "total_customers": 45,
    "pending_transactions": 8,
    "recent_transactions": []
  }
}
```

---

## 👥 Customers (Coming Soon)

### Get All Customers
**GET** `/customers?page=1&limit=20`

### Get Customer by ID
**GET** `/customers/:id`

### Create Customer
**POST** `/customers`

### Update Customer
**PUT** `/customers/:id`

### Delete Customer
**DELETE** `/customers/:id`

---

## 📦 Products (Coming Soon)

### Get All Products
**GET** `/products?page=1&limit=20`

### Get Product by ID
**GET** `/products/:id`

### Create Product
**POST** `/products`

### Update Product
**PUT** `/products/:id`

### Delete Product
**DELETE** `/products/:id`

---

## 💰 Transactions (Coming Soon)

### Get All Transactions
**GET** `/transactions?page=1&limit=20`

### Get Transaction by ID
**GET** `/transactions/:id`

### Create Transaction
**POST** `/transactions`

### Update Transaction
**PUT** `/transactions/:id`

### Delete Transaction
**DELETE** `/transactions/:id`

---

## 🔒 Authorization

All protected endpoints require JWT token in header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid request"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format
- Currency values are in Indonesian Rupiah (IDR)
- Pagination: default limit is 20 items per page
- All endpoints return JSON responses
