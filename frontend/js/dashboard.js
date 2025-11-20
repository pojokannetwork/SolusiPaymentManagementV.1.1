// API Configuration
const API_URL = 'http://localhost/SolusiPaymentManagementV.1.1/backend';

// Check authentication
function checkAuth() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    if (!token || !user) {
        window.location.href = 'login.html';
        return null;
    }
    
    return { token, user: JSON.parse(user) };
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', async () => {
    const auth = checkAuth();
    if (!auth) return;
    
    // Update user info
    document.getElementById('userName').textContent = auth.user.full_name || auth.user.username;
    document.getElementById('userRole').textContent = auth.user.role.toUpperCase();
    
    // Load dashboard data
    await loadDashboardData(auth.token);
});

// Load dashboard statistics
async function loadDashboardData(token) {
    try {
        const response = await fetch(`${API_URL}/dashboard`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            updateStats(data.data);
            loadRecentTransactions(token);
        }
    } catch (error) {
        console.error('Error loading dashboard:', error);
        // Show sample data for demo
        showSampleData();
    }
}

// Update statistics
function updateStats(stats) {
    document.getElementById('totalRevenue').textContent = formatCurrency(stats.total_revenue || 0);
    document.getElementById('totalTransactions').textContent = stats.total_transactions || 0;
    document.getElementById('totalCustomers').textContent = stats.total_customers || 0;
    document.getElementById('pendingTransactions').textContent = stats.pending_transactions || 0;
}

// Load recent transactions
async function loadRecentTransactions(token) {
    try {
        const response = await fetch(`${API_URL}/transactions?limit=5`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success && data.data.length > 0) {
            displayTransactions(data.data);
        } else {
            showNoTransactions();
        }
    } catch (error) {
        console.error('Error loading transactions:', error);
        showNoTransactions();
    }
}

// Display transactions
function displayTransactions(transactions) {
    const tbody = document.getElementById('recentTransactions');
    tbody.innerHTML = transactions.map(t => `
        <tr>
            <td><strong>${t.transaction_code}</strong></td>
            <td>${t.customer_name || '-'}</td>
            <td><strong>${formatCurrency(t.total_amount)}</strong></td>
            <td><span class="badge-status badge-${getStatusClass(t.payment_status)}">${t.payment_status}</span></td>
            <td>${formatDate(t.transaction_date)}</td>
        </tr>
    `).join('');
}

// Show no transactions message
function showNoTransactions() {
    const tbody = document.getElementById('recentTransactions');
    tbody.innerHTML = `
        <tr>
            <td colspan="5" class="text-center" style="padding: 40px; color: var(--gray);">
                <i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 12px; display: block; opacity: 0.3;"></i>
                Belum ada transaksi
            </td>
        </tr>
    `;
}

// Show sample data for demo
function showSampleData() {
    updateStats({
        total_revenue: 45500000,
        total_transactions: 128,
        total_customers: 45,
        pending_transactions: 8
    });
    
    const sampleTransactions = [
        {
            transaction_code: 'TRX001',
            customer_name: 'John Doe',
            total_amount: 1500000,
            payment_status: 'paid',
            transaction_date: new Date().toISOString()
        },
        {
            transaction_code: 'TRX002',
            customer_name: 'Jane Smith',
            total_amount: 2300000,
            payment_status: 'pending',
            transaction_date: new Date().toISOString()
        },
        {
            transaction_code: 'TRX003',
            customer_name: 'Bob Johnson',
            total_amount: 850000,
            payment_status: 'paid',
            transaction_date: new Date().toISOString()
        }
    ];
    
    displayTransactions(sampleTransactions);
}

// Toggle sidebar
function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
}

// Logout
function logout() {
    if (confirm('Yakin ingin keluar?')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.href = 'login.html';
    }
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

function formatDate(dateString) {
    return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(dateString));
}

function getStatusClass(status) {
    const statusMap = {
        'paid': 'success',
        'success': 'success',
        'pending': 'pending',
        'failed': 'failed',
        'cancelled': 'failed'
    };
    return statusMap[status] || 'pending';
}
