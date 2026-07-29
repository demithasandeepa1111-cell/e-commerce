// ===== PRODUCT DATA =====
const products = [
  { id: 1, name: "Shadow Panther Tee", category: "tshirt", price: 39.99, badge: "NEW",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500" },
  { id: 2, name: "Midnight Hoodie", category: "hoodie", price: 79.99, badge: "HOT",
    img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500" },
  { id: 3, name: "Stealth Bomber Jacket", category: "jacket", price: 149.99, badge: "",
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500" },
  { id: 4, name: "Obsidian Cargo Pants", category: "pants", price: 89.99, badge: "NEW",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500" },
  { id: 5, name: "Panther Logo Tee", category: "tshirt", price: 34.99, badge: "",
    img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500" },
  { id: 6, name: "Noir Zip Hoodie", category: "hoodie", price: 84.99, badge: "",
    img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500" },
  { id: 7, name: "Urban Leather Jacket", category: "jacket", price: 199.99, badge: "HOT",
    img: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=500" },
  { id: 8, name: "Tactical Joggers", category: "pants", price: 69.99, badge: "",
    img: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500" },
];

// ===== CART STATE =====
let cart = JSON.parse(localStorage.getItem('pantherCart')) || [];

// ===== RENDER PRODUCTS =====
const productsGrid = document.getElementById('products');

function renderProducts(filter = 'all') {
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
  productsGrid.innerHTML = filtered.map(p => `
    <div class="product-card" data-category="${p.category}">
      <div class="product-img" style="background-image:url('${p.img}')">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <div class="product-cat">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-bottom">
          <div class="product-price">$${p.price.toFixed(2)}</div>
          <button class="add-cart-btn" onclick="addToCart(${p.id})">+ Add</button>
        </div>
      </div>
    </div>
  `).join('');
}
renderProducts();

// ===== FILTERS =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });
});

// ===== CART FUNCTIONS =====
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartCountEl = document.getElementById('cart-count');

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  renderCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem('pantherCart', JSON.stringify(cart));
}

function renderCart() {
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  cartCountEl.textContent = totalItems;
  cartTotalEl.textContent = `$${totalPrice.toFixed(2)}`;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<div class="cart-empty">🐾<br><br>Your cart is empty</div>`;
    return;
  }

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img" style="background-image:url('${item.img}')"></div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
}

function openCart() {
  cartSidebar.classList.add('active');
  cartOverlay.classList.add('active');
}
function closeCart() {
  cartSidebar.classList.remove('active');
  cartOverlay.classList.remove('active');
}

document.querySelector('.cart-btn').addEventListener('click', openCart);
document.getElementById('close-cart').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Initial render
renderCart();

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(10,10,10,0.98)';
  } else {
    nav.style.background = 'rgba(10,10,10,0.85)';
  }
});
