const products = [
  {
    id: 1,
    name: 'Gorra Urbana Negra',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1521369909029-2afc2965a459?auto=format&fit=crop&w=900&q=80',
    category: 'gorras',
    description: 'Ajuste cómodo y estilo contemporáneo.'
  },
  {
    id: 2,
    name: 'Gorra Sports Beige',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    category: 'gorras',
    description: 'Ideal para salidas casuales o deporte.'
  },
  {
    id: 3,
    name: 'Gorra Signature Navy',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    category: 'gorras',
    description: 'Detalle premium y acabados impecables.'
  },
  {
    id: 4,
    name: 'Pantalón Cargo Olive',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
    category: 'pantalones',
    description: 'Comodidad y funcionalidad para todos los días.'
  },
  {
    id: 5,
    name: 'Pantalón Relax Gris',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
    category: 'pantalones',
    description: 'Tela suave con caída elegante.'
  },
  {
    id: 6,
    name: 'Pantalón Slim Negro',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
    category: 'pantalones',
    description: 'Silueta moderna y limpia.'
  },
  {
    id: 7,
    name: 'Camisa Linen Blanca',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    category: 'camisas',
    description: 'Ligera y sofisticada para cualquier ocasión.'
  },
  {
    id: 8,
    name: 'Camisa Azul Marino',
    price: 74.99,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
    category: 'camisas',
    description: 'Color profundo con corte moderno.'
  },
  {
    id: 9,
    name: 'Camisa de Algodón Rojo',
    price: 64.99,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    category: 'camisas',
    description: 'Acabado premium con detalle urbano.'
  }
];

const cartKey = 'luxury-cart';

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(cartKey) || '[]');
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

function getCurrentCategory() {
  return document.body.dataset.category || null;
}

function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  if (!countEl) return;
  const cart = loadCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  countEl.textContent = totalItems;
}

function addToCart(productId) {
  const cart = loadCart();
  const existing = cart.find((item) => item.id === productId);
  const product = products.find((item) => item.id === productId);

  if (!product) return;

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: product.id, quantity: 1 });
  }

  saveCart(cart);
  updateCartCount();
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const category = getCurrentCategory();
  const filtered = products.filter((product) => product.category === category);

  if (!filtered.length) {
    grid.innerHTML = '<div class="empty-state">No hay productos en esta categoría por el momento.</div>';
    return;
  }

  grid.innerHTML = filtered
    .map(
      (product) => `
        <article class="product-card">
          <img src="${product.image}" alt="${product.name}" />
          <div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-meta">
              <span class="price">$${product.price.toFixed(2)}</span>
              <button class="add-to-cart" data-id="${product.id}">Agregar</button>
            </div>
          </div>
        </article>
      `
    )
    .join('');

  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      addToCart(Number(button.dataset.id));
    });
  });
}

function renderCartPage() {
  const container = document.getElementById('cart-items');
  const summary = document.getElementById('cart-summary');
  if (!container || !summary) return;

  const cart = loadCart();
  if (!cart.length) {
    container.innerHTML = '<div class="empty-state">Tu carrito está vacío. Elige una prenda y empieza tu compra.</div>';
    summary.innerHTML = '<div class="cart-summary"><p>No hay productos aún.</p></div>';
    return;
  }

  const items = cart
    .map((entry) => {
      const product = products.find((item) => item.id === entry.id);
      if (!product) return null;
      const subtotal = product.price * entry.quantity;
      return `
        <article class="cart-item">
          <img src="${product.image}" alt="${product.name}" />
          <div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Cantidad: ${entry.quantity}</p>
          </div>
          <div>
            <p class="price">$${subtotal.toFixed(2)}</p>
          </div>
        </article>
      `;
    })
    .filter(Boolean)
    .join('');

  const total = cart.reduce((sum, entry) => {
    const product = products.find((item) => item.id === entry.id);
    return sum + (product ? product.price * entry.quantity : 0);
  }, 0);

  container.innerHTML = items;
  summary.innerHTML = `
    <div class="cart-summary">
      <h3>Resumen</h3>
      <p>Subtotal: <strong>$${total.toFixed(2)}</strong></p>
      <p>Envío: GRATIS</p>
      <button>Finalizar compra</button>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderProducts();
  renderCartPage();
});
