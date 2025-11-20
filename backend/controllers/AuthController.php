<?php
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../helpers/JWTHelper.php';
require_once __DIR__ . '/../helpers/ResponseHelper.php';

class AuthController {
    private $db;
    private $userModel;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->userModel = new User($this->db);
    }

    public function handleRequest($method, $path_parts) {
        $action = $path_parts[1] ?? '';

        switch ($action) {
            case 'login':
                if ($method === 'POST') {
                    $this->login();
                } else {
                    ResponseHelper::methodNotAllowed();
                }
                break;

            case 'register':
                if ($method === 'POST') {
                    $this->register();
                } else {
                    ResponseHelper::methodNotAllowed();
                }
                break;

            case 'logout':
                if ($method === 'POST') {
                    $this->logout();
                } else {
                    ResponseHelper::methodNotAllowed();
                }
                break;

            case 'verify':
                if ($method === 'GET') {
                    $this->verifyToken();
                } else {
                    ResponseHelper::methodNotAllowed();
                }
                break;

            default:
                ResponseHelper::notFound('Auth endpoint not found');
                break;
        }
    }

    private function login() {
        $data = json_decode(file_get_contents("php://input"));

        if (empty($data->username) || empty($data->password)) {
            ResponseHelper::error('Username and password are required', 400);
            return;
        }

        $user = $this->userModel->findByUsername($data->username);

        if (!$user) {
            ResponseHelper::error('Invalid credentials', 401);
            return;
        }

        if (!password_verify($data->password, $user['password'])) {
            ResponseHelper::error('Invalid credentials', 401);
            return;
        }

        if ($user['status'] !== 'active') {
            ResponseHelper::error('Account is inactive', 403);
            return;
        }

        // Generate JWT token
        $token = JWTHelper::generateToken([
            'user_id' => $user['id'],
            'username' => $user['username'],
            'role' => $user['role']
        ]);

        // Update last login
        $this->userModel->updateLastLogin($user['id']);

        unset($user['password']);

        ResponseHelper::success([
            'user' => $user,
            'token' => $token
        ], 'Login successful');
    }

    private function register() {
        $data = json_decode(file_get_contents("php://input"));

        if (empty($data->username) || empty($data->email) || empty($data->password)) {
            ResponseHelper::error('Username, email, and password are required', 400);
            return;
        }

        // Validate email
        if (!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
            ResponseHelper::error('Invalid email format', 400);
            return;
        }

        // Check if username exists
        if ($this->userModel->findByUsername($data->username)) {
            ResponseHelper::error('Username already exists', 409);
            return;
        }

        // Check if email exists
        if ($this->userModel->findByEmail($data->email)) {
            ResponseHelper::error('Email already exists', 409);
            return;
        }

        $userData = [
            'username' => $data->username,
            'email' => $data->email,
            'password' => password_hash($data->password, PASSWORD_BCRYPT),
            'full_name' => $data->full_name ?? '',
            'phone' => $data->phone ?? '',
            'role' => 'customer' // Default role
        ];

        $userId = $this->userModel->create($userData);

        if ($userId) {
            ResponseHelper::success([
                'user_id' => $userId
            ], 'Registration successful', 201);
        } else {
            ResponseHelper::error('Failed to create user', 500);
        }
    }

    private function logout() {
        // Token-based logout (client side akan hapus token)
        ResponseHelper::success(null, 'Logout successful');
    }

    private function verifyToken() {
        $headers = getallheaders();
        $token = $headers['Authorization'] ?? '';
        $token = str_replace('Bearer ', '', $token);

        if (empty($token)) {
            ResponseHelper::error('Token is required', 401);
            return;
        }

        $payload = JWTHelper::verifyToken($token);

        if (!$payload) {
            ResponseHelper::error('Invalid or expired token', 401);
            return;
        }

        ResponseHelper::success($payload, 'Token is valid');
    }
}
