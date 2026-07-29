/* =========================================================
   PANTHER CLOTHINGS — Main JavaScript
   ========================================================= */

// ============== PRODUCT DATA ==============
const products = [
  {
    id: 1,
    name: "Panther Oversized Hoodie",
    price: 89.00,
    oldPrice: 120.00,
    rating: 4.8,
    reviews: 124,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
    image2: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80"
  },
  {
    id: 2,
    name: "Urban Tech Joggers",
    price: 65.00,
    oldPrice: null,
    rating: 4.6,
    reviews: 89,
    badge: null,
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80",
    image2: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80"
  },
  {
    id: 3,
    name: "Midnight Bomber Jacket",
    price: 145.00,
    oldPrice: 180.00,
    rating: 4.9,
    reviews: 203,
    badge: "HOT",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    image2: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80"
  },
  {
    id: 4,
    name: "Athletic Performance Tee",
    price: 39.00,
    oldPrice: null,
    rating: 4.5,
    reviews: 67,
    badge: null,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80",
    image2: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80"
  },
  {
    id: 5,
    name: "Stealth Cargo Pants",
    price: 95.00,
    oldPrice: 130.00,
    rating: 4.7,
    reviews: 156,
    badge: "SALE",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    image2: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80"
  },
  {
    id: 6,
    name: "Signature Panther Cap",
    price: 32.00,
    oldPrice: null,
    rating: 4.4,
    reviews: 42,
    badge: null,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
    image2: "https://images.unsplash.com/photo-1521369909029-2afed8827ee6?w=600&q=80"
  },
  {
    id: 7,
    name: "Premium Leather Sneakers",
    price: 179.00,
    oldPrice: 220.00,
    rating: 4.9,
    reviews: 312,
    badge: "BEST",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    image2: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80"
  },
  {
    id: 8,
    name: "Crossbody Utility Bag",
    price: 58.00,
    oldPrice: null,
    rating: 4.6,
    reviews: 98,
    badge: null,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    image2: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80"
  }
];

// ============== STATE ==============
let cart = [];

// ============== DOM ELEMENTS ==============
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
const cartBtn = document.getElementById('cartBtn');
const cartBadge = document.getElementById('cartBadge');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartCount = document.getElementById('cartCount');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartFooter = document.getElementById('cartFooter');
const productGrid = document.getElementById('productGrid');
const newsletterForm = document.getElementById('newsletterForm');
const newsletterEmail = document.getElementById('newsletterEmail');
const formMessage = document.getElementById('formMessage');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const checkoutBtn = document.getElementById('checkoutBtn');

// ============== RENDER PRODUCTS ==============
function renderProducts() {
  productGrid.innerHTML = products.map(product => `
    <article class="product-card" data-id="${product.id}">
      <div class="product-image">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <img src="${product.image}" alt="${product.name}" class="img-primary" loading="lazy" />
        <img src="${product.image2}" alt="${product.name}" class="img-secondary" loading="lazy" />
        <div class="product-actions">
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
          <button class="quick-view" aria-label="Quick view"><i class="fa-regular fa-eye"></i></button>
        </div>
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <div class="product-rating">
          <div class="stars">${renderStars(product.rating)}</div>
          <span class="count">(${product.reviews})</span>
        </div>
        <div class="product-price">
          <span class="price-current">$${product.price.toFixed(2)}</span>
          ${product.oldPrice ? `<span class="price-old">$${product.oldPrice.toFixed(2)}</span>` : ''}
        </div>
      </div>
    </article>
  `).join('');

  // Attach add-to-cart listeners
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      addToCart(id);
    });
  });
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  let html = '';
  for (let i = 0; i < full; i++) html += '<i class="fa-solid fa-star"></i>';
  if (half) html += '<i class="fa-solid fa-star-half-stroke"></i>';
  for (let i = 0; i < empty; i++) html += '<i class="fa-regular fa-star"></i>';
  return html;
}

// ============== CART FUNCTIONS ==============
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCart();
  showToast(`${product.name} added to cart`);
  pulseBadge();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    updateCart();
  }
}

function updateCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  cartBadge.textContent = totalItems;
  cartCount.textContent = `(${totalItems})`;
  cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;

  if (cart.length === 0) {
    cartEmpty.style.display = 'block';
    cartItems.style.display = 'none';
    cartFooter.style.display = 'none';
  } else {
    cartEmpty.style.display = 'none';
    cartItems.style.display = 'flex';
    cartFooter.style.display = 'block';

    cartItems.innerHTML = cart.map(item => `
      <li class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <div class="price">$${(item.price * item.qty).toFixed(2)}</div>
          <div class="qty-controls">
            <button onclick="changeQty(${item.id}, -1)" aria-label="Decrease"><i class="fa-solid fa-minus"></i></button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${item.id}, 1)" aria-label="Increase"><i class="fa-solid fa-plus"></i></button>
          </div>
        </div>
        <button class="remove-item" onclick="removeFromCart(${item.id})" aria-label="Remove">
          <i class="fa-solid fa-trash"></i>
        </button>
      </li>
    `).join('');
  }
}

function pulseBadge() {
  cartBadge.classList.remove('pulse');
  void cartBadge.offsetWidth; // trigger reflow
  cartBadge.classList.add('pulse');
}

// ============== CART DRAWER ==============
function openCart() {
  cartDrawer.classList.add('active');
  cartOverlay.classList.add('active');
  cartDrawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  cartDrawer.classList.remove('active');
  cartOverlay.classList.remove('active');
  cartDrawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

cartBtn.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartDrawer);
cartOverlay.addEventListener('click', closeCartDrawer);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCartDrawer();
});

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) return;
  showToast('Redirecting to checkout...');
  // In a real app: window.location.href = '/checkout';
});

// ============== TOAST ==============
let toastTimeout;
function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// ============== STICKY NAV ==============
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ============== MOBILE MENU ==============
mobileToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const icon = mobileToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-xmark');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = mobileToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-xmark');
  });
});

// ============== NEWSLETTER ==============
newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = newsletterEmail.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  formMessage.classList.remove('success', 'error');

  if (!email) {
    formMessage.textContent = 'Please enter your email address.';
    formMessage.classList.add('error');
    return;
  }

  if (!emailRegex.test(email)) {
    formMessage.textContent = 'Please enter a valid email address.';
    formMessage.classList.add('error');
    return;
  }

  formMessage.textContent = '✓ Welcome to the pack! Check your inbox for 15% off.';
  formMessage.classList.add('success');
  newsletterEmail.value = '';

  setTimeout(() => {
    formMessage.textContent = '';
    formMessage.classList.remove('success');
  }, 5000);
});

// ============== SMOOTH SCROLL FOR ANCHOR LINKS ==============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ============== INIT ==============
renderProducts();
updateCart();