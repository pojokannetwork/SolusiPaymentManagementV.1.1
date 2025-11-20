<?php
// Configuration file
define('APP_NAME', 'Solusi Payment Management');
define('APP_VERSION', '1.1.0');
define('APP_ENV', 'development'); // development, production

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'solusi_payment');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

// JWT Configuration
define('JWT_SECRET', 'your-secret-key-change-this-in-production');
define('JWT_EXPIRY', 86400); // 24 hours

// Session Configuration
define('SESSION_LIFETIME', 3600); // 1 hour

// API Configuration
define('API_VERSION', 'v1');
define('API_PREFIX', '/api/' . API_VERSION);

// Upload Configuration
define('UPLOAD_DIR', __DIR__ . '/../uploads/');
define('MAX_UPLOAD_SIZE', 5242880); // 5MB

// Pagination
define('ITEMS_PER_PAGE', 20);

// Timezone
date_default_timezone_set('Asia/Jakarta');

// Error Reporting
if (APP_ENV === 'development') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}
