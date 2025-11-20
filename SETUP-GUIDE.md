# Setup Guide - Solusi Payment Management v1.1

## 📋 Prasyarat

### 1. Install XAMPP
Download dan install XAMPP dari: https://www.apachefriends.org/

**Komponen yang dibutuhkan:**
- ✅ Apache Web Server
- ✅ MySQL Database
- ✅ PHP 8.0 atau lebih baru
- ✅ phpMyAdmin

### 2. Lokasi Project
Pastikan project berada di folder XAMPP:
```
C:\xampp\htdocs\SolusiPaymentManagementV.1.1\
```

Atau buat Virtual Host untuk development yang lebih profesional.

---

## 🚀 Langkah Instalasi

### Step 1: Setup XAMPP

1. **Start XAMPP Control Panel**
   - Jalankan `xampp-control.exe`
   - Start **Apache**
   - Start **MySQL**

2. **Verifikasi Apache & MySQL berjalan**
   - Buka browser: `http://localhost`
   - Seharusnya muncul XAMPP Dashboard

### Step 2: Setup Database

1. **Buka phpMyAdmin**
   ```
   http://localhost/phpmyadmin
   ```

2. **Import Database**
   - Klik tab "SQL"
   - Copy isi file `database/schema.sql`
   - Paste dan klik "Go"
   
   ATAU
   
   - Klik "Import"
   - Pilih file `database/schema.sql`
   - Klik "Go"

3. **Verifikasi Database**
   - Database `solusi_payment` harus sudah ada
   - Cek tabel: users, customers, products, transactions, dll
   - Default admin sudah ter-create

### Step 3: Konfigurasi Backend

1. **Copy project ke htdocs**
   ```cmd
   xcopy /E /I "e:\AI\SolusiPaymentManagementV.1.1" "C:\xampp\htdocs\SolusiPaymentManagementV.1.1"
   ```

2. **Edit konfigurasi database** (jika perlu)
   
   File: `backend/config/config.php`
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'solusi_payment');
   define('DB_USER', 'root');
   define('DB_PASS', ''); // Kosongkan untuk XAMPP default
   ```

### Step 4: Testing Backend API

1. **Test API Health**
   ```
   http://localhost/SolusiPaymentManagementV.1.1/backend/
   ```
   
   Response:
   ```json
   {
     "success": true,
     "message": "Solusi Payment Management API v1.1",
     "version": "1.1.0",
     "status": "active"
   }
   ```

2. **Test Login API**
   
   URL: `http://localhost/SolusiPaymentManagementV.1.1/backend/auth/login`
   
   Method: POST
   
   Body:
   ```json
   {
     "username": "admin",
     "password": "admin123"
   }
   ```

### Step 5: Jalankan Frontend

1. **Buka Login Page**
   ```
   http://localhost/SolusiPaymentManagementV.1.1/frontend/login.html
   ```

2. **Login dengan akun default**
   - Username: `admin`
   - Password: `admin123`

3. **Dashboard akan terbuka**
   ```
   http://localhost/SolusiPaymentManagementV.1.1/frontend/dashboard.html
   ```

---

## 🔧 Troubleshooting

### Apache tidak bisa start
- **Port 80 sudah dipakai**
  - Solusi: Ubah port Apache di `httpd.conf` ke 8080
  - Akses: `http://localhost:8080`

### MySQL tidak bisa start
- **Port 3306 sudah dipakai**
  - Solusi: Stop service MySQL lain atau ubah port

### Database connection error
- Cek username/password di `config/config.php`
- Pastikan MySQL service running
- Cek database `solusi_payment` sudah di-import

### CORS Error
- Sudah di-handle di `backend/index.php`
- Pastikan header CORS aktif

### 404 Not Found
- Pastikan `.htaccess` ada di folder `backend/`
- Enable `mod_rewrite` di Apache:
  ```
  File: C:\xampp\apache\conf\httpd.conf
  Uncomment: LoadModule rewrite_module modules/mod_rewrite.so
  ```

---

## 🔑 Default Login Credentials

### Admin Account
- **Username:** `admin`
- **Email:** `admin@solusipayment.com`
- **Password:** `admin123`
- **Role:** Administrator

---

## 📱 Testing dengan Postman

### 1. Login
```
POST http://localhost/SolusiPaymentManagementV.1.1/backend/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

### 2. Verify Token
```
GET http://localhost/SolusiPaymentManagementV.1.1/backend/auth/verify
Authorization: Bearer YOUR_TOKEN_HERE
```

### 3. Get Dashboard Stats
```
GET http://localhost/SolusiPaymentManagementV.1.1/backend/dashboard
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 📂 Struktur Folder

```
SolusiPaymentManagementV.1.1/
├── backend/
│   ├── config/
│   │   ├── config.php
│   │   └── database.php
│   ├── controllers/
│   │   └── AuthController.php
│   ├── models/
│   │   └── User.php
│   ├── helpers/
│   │   ├── JWTHelper.php
│   │   └── ResponseHelper.php
│   ├── .htaccess
│   └── index.php
├── frontend/
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── login.html
│   └── dashboard.html
└── database/
    └── schema.sql
```

---

## 🎯 Next Steps

1. ✅ Setup XAMPP & Database
2. ✅ Test Login
3. ⏳ Buat CRUD Customers
4. ⏳ Buat CRUD Products
5. ⏳ Buat CRUD Transactions
6. ⏳ Integrasi Payment Gateway

---

## 📞 Support

Jika ada masalah, cek:
1. Apache & MySQL logs di XAMPP Control Panel
2. Browser Console (F12) untuk frontend errors
3. PHP error logs di `C:\xampp\php\logs\`

**Happy Coding! 🚀**
