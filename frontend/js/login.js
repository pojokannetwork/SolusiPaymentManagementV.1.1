// API Configuration
const API_URL = 'http://localhost/SolusiPaymentManagementV.1.1/backend';

// Toggle between WhatsApp and Email login
let isWhatsAppLogin = true;

function toggleLoginMethod() {
    const whatsappSection = document.getElementById('whatsappSection');
    const emailSection = document.getElementById('emailSection');
    const toggleText = document.getElementById('toggleText');
    
    isWhatsAppLogin = !isWhatsAppLogin;
    
    if (isWhatsAppLogin) {
        whatsappSection.style.display = 'block';
        emailSection.style.display = 'none';
        toggleText.textContent = 'Masuk dengan Email';
    } else {
        whatsappSection.style.display = 'none';
        emailSection.style.display = 'block';
        toggleText.textContent = 'Masuk dengan WhatsApp';
    }
}

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
}

// WhatsApp Login Handler
document.getElementById('whatsappForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const phoneNumber = document.getElementById('phoneNumber').value;
    
    // Validate phone number
    if (!phoneNumber.startsWith('62')) {
        showNotification('Nomor harus diawali dengan 62', 'error');
        return;
    }
    
    if (phoneNumber.length < 10) {
        showNotification('Nomor WhatsApp tidak valid', 'error');
        return;
    }
    
    showLoading(true);
    
    try {
        const response = await fetch(`${API_URL}/auth/whatsapp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone: phoneNumber })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showNotification('Kode OTP telah dikirim ke WhatsApp Anda', 'success');
            // Redirect to OTP verification page
            setTimeout(() => {
                window.location.href = `verify-otp.html?phone=${phoneNumber}`;
            }, 1500);
        } else {
            showNotification(data.message || 'Login gagal', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showNotification('Terjadi kesalahan koneksi', 'error');
    } finally {
        showLoading(false);
    }
});

// Email/Password Login Handler
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Validation
    if (!validateEmail(email)) {
        showNotification('Email tidak valid', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password minimal 6 karakter', 'error');
        return;
    }
    
    showLoading(true);
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                username: email.split('@')[0], // Use email part as username
                password: password 
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Save token
            if (remember) {
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('user', JSON.stringify(data.data.user));
            } else {
                sessionStorage.setItem('token', data.data.token);
                sessionStorage.setItem('user', JSON.stringify(data.data.user));
            }
            
            showNotification('Login berhasil!', 'success');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            showNotification(data.message || 'Login gagal', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showNotification('Terjadi kesalahan koneksi', 'error');
    } finally {
        showLoading(false);
    }
});

// Google Login (placeholder)
document.querySelector('.btn-google')?.addEventListener('click', () => {
    showNotification('Fitur Google Login segera hadir', 'info');
});

// Utility Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style
    Object.assign(notification.style, {
        position: 'fixed',
        inset-block-start: '20px',
        inset-inline-end: '20px',
        padding: '16px 24px',
        borderRadius: '12px',
        color: 'white',
        fontWeight: '500',
        fontSize: '14px',
        zIndex: '9999',
        animation: 'slideIn 0.3s ease-out',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        maxinline-size: '400px'
    });
    
    // Color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#0ea5e9',
        warning: '#f59e0b'
    };
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showLoading(show) {
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(btn => {
        if (show) {
            btn.disabled = true;
            btn.style.opacity = '0.6';
            btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> Memproses...';
        } else {
            btn.disabled = false;
            btn.style.opacity = '1';
            const originalText = btn.getAttribute('data-original-text') || 'LANJUTKAN';
            btn.innerHTML = originalText;
        }
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Check if already logged in
window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
        // Verify token and redirect if valid
        verifyToken(token);
    }
});

async function verifyToken(token) {
    try {
        const response = await fetch(`${API_URL}/auth/verify`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            window.location.href = 'dashboard.html';
        }
    } catch (error) {
        console.error('Token verification failed:', error);
    }
}
