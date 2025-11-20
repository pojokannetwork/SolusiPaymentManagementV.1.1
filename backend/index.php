<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config/database.php';
require_once 'config/config.php';

// Router sederhana
$request_uri = $_SERVER['REQUEST_URI'];
$request_method = $_SERVER['REQUEST_METHOD'];

// Remove base path
$base_path = '/backend';
$request_uri = str_replace($base_path, '', $request_uri);

// Parse URL
$uri_parts = explode('?', $request_uri);
$path = $uri_parts[0];
$path_parts = array_filter(explode('/', $path));
$path_parts = array_values($path_parts);

// Route handling
if (empty($path_parts)) {
    echo json_encode([
        'success' => true,
        'message' => 'Solusi Payment Management API v1.1',
        'version' => '1.1.0',
        'status' => 'active'
    ]);
    exit();
}

$controller = $path_parts[0] ?? 'home';

// Load controller
switch ($controller) {
    case 'auth':
        require_once 'controllers/AuthController.php';
        $authController = new AuthController();
        $authController->handleRequest($request_method, $path_parts);
        break;
        
    case 'users':
        require_once 'controllers/UserController.php';
        $userController = new UserController();
        $userController->handleRequest($request_method, $path_parts);
        break;
        
    case 'customers':
        require_once 'controllers/CustomerController.php';
        $customerController = new CustomerController();
        $customerController->handleRequest($request_method, $path_parts);
        break;
        
    case 'transactions':
        require_once 'controllers/TransactionController.php';
        $transactionController = new TransactionController();
        $transactionController->handleRequest($request_method, $path_parts);
        break;
        
    case 'dashboard':
        require_once 'controllers/DashboardController.php';
        $dashboardController = new DashboardController();
        $dashboardController->handleRequest($request_method, $path_parts);
        break;
        
    default:
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'Endpoint not found'
        ]);
        break;
}
