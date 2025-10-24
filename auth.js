// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Login Form Handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Demo authentication
            const demoAccounts = {
                'farmer@demo.com': 'password',
                'buyer@demo.com': 'password', 
                'processor@demo.com': 'password'
            };
            
            if (demoAccounts[email] && demoAccounts[email] === password) {
                // Store user session
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userType', getDemoUserType(email));
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid email or password. Use demo accounts: farmer@demo.com, buyer@demo.com, processor@demo.com (password: password)');
            }
        });
    }
    
    // Signup Form Handler
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Store user session
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', document.getElementById('email').value);
            localStorage.setItem('userType', document.getElementById('userType').value);
            localStorage.setItem('userName', document.getElementById('fullName').value);
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        });
    }
    
    // Check if user is logged in on protected pages
    if (window.location.pathname.includes('dashboard.html') || 
        window.location.pathname.includes('digital-marketplace.html') ||
        window.location.pathname.includes('direct-trade.html') ||
        window.location.pathname.includes('online-trading.html') ||
        window.location.pathname.includes('quality-certification.html') ||
        window.location.pathname.includes('logistics-payment.html') ||
        window.location.pathname.includes('shree-anna.html')) {
        
        if (!localStorage.getItem('userLoggedIn')) {
            window.location.href = 'index.html';
        }
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userType');
            localStorage.removeItem('userName');
            window.location.href = 'index.html';
        });
    }
    
    // Update user welcome message
    const userWelcome = document.getElementById('userWelcome');
    if (userWelcome) {
        const userName = localStorage.getItem('userName') || localStorage.getItem('userEmail') || 'User';
        userWelcome.textContent = `Welcome, ${userName.split('@')[0]}!`;
    }
});

function getDemoUserType(email) {
    const types = {
        'farmer@demo.com': 'farmer',
        'buyer@demo.com': 'buyer',
        'processor@demo.com': 'processor'
    };
    return types[email] || 'user';
}
// Enhanced Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    if (localStorage.getItem('userLoggedIn') && 
        (window.location.pathname.includes('index.html') || 
         window.location.pathname.includes('signup.html'))) {
        window.location.href = 'dashboard.html';
    }
    
    // Login Form Handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Demo authentication
            const demoAccounts = {
                'farmer@demo.com': {password: 'password', name: 'Ramesh Kumar', type: 'farmer'},
                'buyer@demo.com': {password: 'password', name: 'Priya Sharma', type: 'buyer'},
                'processor@demo.com': {password: 'password', name: 'Arun Industries', type: 'processor'}
            };
            
            if (demoAccounts[email] && demoAccounts[email].password === password) {
                // Store user session
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userType', demoAccounts[email].type);
                localStorage.setItem('userName', demoAccounts[email].name);
                
                // Show success message
                showNotification('Login successful! Redirecting...', 'success');
                
                // Redirect to dashboard after delay
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                showNotification('Invalid email or password. Please use demo accounts.', 'error');
            }
        });
    }
    
    // Signup Form Handler
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const userType = document.getElementById('userType').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validation
            if (!userType) {
                showNotification('Please select your user type', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match!', 'error');
                return;
            }
            
            if (password.length < 6) {
                showNotification('Password must be at least 6 characters long', 'error');
                return;
            }
            
            // Store user session
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userType', userType);
            localStorage.setItem('userName', fullName);
            
            // Show success message
            showNotification('Account created successfully! Welcome to Shree Anna Connect.', 'success');
            
            // Redirect to dashboard after delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }
    
    // Check if user is logged in on protected pages
    const protectedPages = [
        'dashboard.html', 'digital-marketplace.html', 'direct-trade.html', 
        'online-trading.html', 'quality-certification.html', 'logistics-payment.html', 'shree-anna.html'
    ];
    
    const currentPage = window.location.pathname.split('/').pop();
    if (protectedPages.includes(currentPage)) {
        if (!localStorage.getItem('userLoggedIn')) {
            window.location.href = 'index.html';
        }
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            showNotification('Logging out...', 'info');
            setTimeout(() => {
                localStorage.removeItem('userLoggedIn');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userType');
                localStorage.removeItem('userName');
                window.location.href = 'index.html';
            }, 1000);
        });
    }
    
    // Update user welcome message
    updateUserWelcome();
});

function updateUserWelcome() {
    const userWelcome = document.getElementById('userWelcome');
    if (userWelcome) {
        const userName = localStorage.getItem('userName') || localStorage.getItem('userEmail') || 'User';
        const userType = localStorage.getItem('userType') || 'user';
        
        const typeIcons = {
            'farmer': '👨‍🌾',
            'buyer': '🏪',
            'processor': '🏭',
            'shg': '👩‍👩‍👧‍👧',
            'logistics': '🚚'
        };
        
        const icon = typeIcons[userType] || '👤';
        userWelcome.innerHTML = `${icon} Welcome, ${userName.split('@')[0]}!`;
    }
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: 15px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Close on click
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Add keyframes for animation
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}