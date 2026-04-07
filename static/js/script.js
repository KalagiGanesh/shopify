// Solvra - Complete Cart & Store Functionality

// Cart Management with localStorage
let cart = JSON.parse(localStorage.getItem('solvraCart') || '[]');

// Update cart count on all pages
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count, .cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountElements.forEach(el => {
        if (el) el.textContent = totalItems;
    });
}

// Add to Cart with product details
function addToCart(productId, productName, price, image, qty = 1) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.qty += qty;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            image: image,
            qty: qty
        });
    }
    
    localStorage.setItem('solvraCart', JSON.stringify(cart));
    updateCartCount();
    
    // Show cart drawer
    openCartDrawer();
    
    // Optional: Show success message
    showNotification('Product added to cart!');
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('solvraCart', JSON.stringify(cart));
    updateCartCount();
    loadCartPage();
    loadCartDrawer();
}

// Update quantity
function updateQuantity(index, newQty) {
    if (newQty < 1) {
        removeFromCart(index);
        return;
    }
    cart[index].qty = newQty;
    localStorage.setItem('solvraCart', JSON.stringify(cart));
    updateCartCount();
    loadCartPage();
    loadCartDrawer();
}

// Clear cart
function clearCart() {
    cart = [];
    localStorage.setItem('solvraCart', JSON.stringify(cart));
    updateCartCount();
    loadCartPage();
    loadCartDrawer();
}

// Cart Drawer Functions
function openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) {
        drawer.classList.add('open');
        document.body.style.overflow = 'hidden';
        loadCartDrawer();
    }
}

function closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) {
        drawer.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// Load cart drawer content
function loadCartDrawer() {
    const drawerItems = document.getElementById('drawer-items');
    const drawerSubtotal = document.getElementById('drawer-subtotal');
    const freeShippingBar = document.getElementById('free-shipping-progress');
    
    if (!drawerItems) return;
    
    if (cart.length === 0) {
        drawerItems.innerHTML = `
            <div class="drawer-empty">
                <p>Your cart is empty</p>
                <a href="/products" class="btn btn-primary" onclick="closeCartDrawer()">Continue Shopping</a>
            </div>
        `;
        if (drawerSubtotal) drawerSubtotal.textContent = '$0.00';
        if (freeShippingBar) freeShippingBar.style.display = 'none';
        return;
    }
    
    let html = '';
    let subtotal = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;
        html += `
            <div class="drawer-item">
                <img src="${item.image}" alt="${item.name}" class="drawer-item-image">
                <div class="drawer-item-details">
                    <h4>${item.name}</h4>
                    <p class="drawer-item-price">$${item.price.toFixed(2)}</p>
                    <div class="qty-controls">
                        <button onclick="updateQuantity(${index}, ${item.qty - 1})">−</button>
                        <span>${item.qty}</span>
                        <button onclick="updateQuantity(${index}, ${item.qty + 1})">+</button>
                    </div>
                </div>
                <button class="drawer-remove" onclick="removeFromCart(${index})">×</button>
            </div>
        `;
    });
    
    drawerItems.innerHTML = html;
    if (drawerSubtotal) drawerSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    
    // Free shipping bar ($50 threshold)
    if (freeShippingBar) {
        const freeShippingThreshold = 50;
        const remaining = freeShippingThreshold - subtotal;
        if (remaining > 0) {
            const progress = (subtotal / freeShippingThreshold) * 100;
            freeShippingBar.innerHTML = `
                <p>🚚 You're <strong>$${remaining.toFixed(2)}</strong> away from FREE shipping!</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
            `;
            freeShippingBar.style.display = 'block';
        } else {
            freeShippingBar.innerHTML = `<p>✅ Congratulations! You've unlocked FREE shipping!</p>`;
            freeShippingBar.style.display = 'block';
        }
    }
}

// Load cart page content
function loadCartPage() {
    const cartItems = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <p>Your cart is empty</p>
                <a href="/products" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        if (cartSummary) cartSummary.style.display = 'none';
        return;
    }
    
    let html = '';
    let subtotal = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;
        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                    <div class="qty-controls">
                        <button onclick="updateQuantity(${index}, ${item.qty - 1})">−</button>
                        <span>${item.qty}</span>
                        <button onclick="updateQuantity(${index}, ${item.qty + 1})">+</button>
                    </div>
                </div>
                <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
                <button class="btn-remove" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });
    
    cartItems.innerHTML = html;
    
    if (cartSummary) {
        const shipping = subtotal >= 50 ? 0 : 5.99;
        const total = subtotal + shipping;
        
        cartSummary.innerHTML = `
            <div class="cart-summary-row">
                <span>Subtotal</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="cart-summary-row">
                <span>Shipping</span>
                <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
            </div>
            <div class="cart-summary-row total">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <button class="btn btn-primary btn-large" onclick="checkout()">
                Proceed to Checkout
            </button>
            <div class="cart-trust">
                <p>🔒 Secure checkout | Free shipping over $50</p>
            </div>
        `;
        cartSummary.style.display = 'block';
    }
}

// Checkout
function checkout() {
    alert('Checkout would integrate with Shopify Payments or Stripe here.\n\nCart Total: $' + 
          cart.reduce((sum, item) => sum + (item.price * item.qty), 0).toFixed(2));
}

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #2d6a4f;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (navbar) {
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        }
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.querySelector('.nav-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Load cart page if on cart page
    if (window.location.pathname === '/cart') {
        loadCartPage();
    }
    
    // Load cart drawer if exists
    if (document.getElementById('cart-drawer')) {
        loadCartDrawer();
    }
});

// Add CSS animations
const style = document.createElement('style');
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

console.log('Solvra store loaded successfully!');
