import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { products } from './data/products';
import portadaGorras from './assets/products/gorras/Portadagorras.png';
import portadaPantalones from './assets/products/pantalones/Portadapantalones.png';
import portadaCamisas from './assets/products/camisas/Portadacamisas.png';
import premiumImage from './assets/products/Premium.png';

const currency = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'USD'
});

function ProductCard({ product, addToCart }) {
  return (
    <article className="product-card fade-up">
      <Link className="product-link" to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
        <div className="product-copy">
          {!['gorras', 'pantalones', 'camisas'].includes(product.category) && (
            <div className="tag-row">
              {product.tags?.map((tag) => (
                <span key={tag} className="product-tag">{tag}</span>
              ))}
            </div>
          )}
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
      </Link>
      <div className="product-meta">
        <span className="price">{currency.format(product.price)}</span>
        {product.inStock ? (
          <button onClick={() => addToCart(product.id)}>Agregar</button>
        ) : (
          <button className="btn-disabled" disabled>Agotado</button>
        )}
      </div>
    </article>
  );
}

function MobileCartSummary({ totalItems, totalPrice }) {
  if (!totalItems) return null;
  return (
    <div className="mobile-cart-bar fade-up">
      <div>
        <strong>{totalItems} artículos</strong>
        <span>{currency.format(totalPrice)}</span>
      </div>
      <Link className="btn btn-primary" to="/cart">Ver carrito</Link>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('luxury-cart') || '[]');
    } catch {
      return [];
    }
  });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  const openMemberModal = () => setShowMemberModal(true);
  const closeMemberModal = () => setShowMemberModal(false);

  useEffect(() => {
    localStorage.setItem('luxury-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId) => {
    const product = products.find((item) => item.id === productId);
    if (!product || !product.inStock) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, change) => {
    setCart((prev) =>
      prev.flatMap((item) => {
        if (item.id !== productId) return [item];
        const nextQuantity = item.quantity + change;
        return nextQuantity > 0 ? [{ ...item, quantity: nextQuantity }] : [];
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => {
      const product = products.find((entry) => entry.id === item.id);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  }, [cart]);

  const location = useLocation();
  const showHeader = location.pathname !== '/' && location.pathname !== '/launch';

  return (
    <>
      {showHeader && (
          <>
            <header className="topbar hero-topbar">
            <button className="mobile-menu-toggle" onClick={() => setMobileNavOpen(true)} aria-label="Abrir menú">
              ☰
            </button>
            <Link className="brand logo-center" to="/home" onClick={() => setMobileNavOpen(false)}>
              LUXURY WORLD
            </Link>
            <div className="nav-group right-links">
              <button className="search-toggle" onClick={() => setShowSearch((show) => !show)} aria-label="Buscar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <Link className={`nav-item cart-link ${totalItems > 0 ? 'filled' : ''}`} to="/cart" onClick={() => setMobileNavOpen(false)} aria-label="Ver carrito">
                {totalItems === 0 ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
                    <path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="10" cy="20" r="1" fill="currentColor" />
                    <circle cx="18" cy="20" r="1" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
                    <path d="M6 6h15l-1.2 7.2A2 2 0 0 1 16.9 15H9.1a2 2 0 0 1-1.9-1.8L6 6z" />
                    <circle cx="10" cy="20" r="1" fill="rgba(255,255,255,0.9)" />
                    <circle cx="18" cy="20" r="1" fill="rgba(255,255,255,0.9)" />
                  </svg>
                )}
                <span className="cart-label">Carrito</span>
                <div className="cart-bill" aria-hidden={totalItems === 0}>
                  <svg className="bill" width="18" height="12" viewBox="0 0 24 16" fill="none" aria-hidden>
                    <rect x="1" y="2" width="22" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
                    <path d="M8 8h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  <span className="bill-count">{totalItems}</span>
                </div>
                <span className="sr-only">{totalItems} artículos en el carrito</span>
              </Link>
            </div>
            <div className={`search-bar ${showSearch ? 'visible' : ''}`}>
              <input
                type="search"
                placeholder="Buscar colecciones, gorras, camisas..."
                value={globalSearch}
                onChange={(event) => setGlobalSearch(event.target.value)}
              />
            </div>
          </header>

          <div className={`mobile-nav-backdrop ${mobileNavOpen ? 'visible' : ''}`} onClick={() => setMobileNavOpen(false)} />
            <div className={`mobile-nav-drawer ${mobileNavOpen ? 'open' : ''}`}>
            <div className="mobile-nav-header">
              <Link className="mobile-nav-logo" to="/home" onClick={() => setMobileNavOpen(false)}>
                LUXURY WORLD
              </Link>
              <button className="mobile-nav-close" onClick={() => setMobileNavOpen(false)} aria-label="Cerrar menú">
                ✕
              </button>
            </div>
            <nav className="mobile-nav-links">
              <Link to="/camisas" onClick={() => setMobileNavOpen(false)}>Camisas</Link>
              <Link to="/pantalones" onClick={() => setMobileNavOpen(false)}>Pantalones</Link>
              <Link to="/gorras" onClick={() => setMobileNavOpen(false)}>Gorras</Link>
            </nav>
          </div>
        </>
      )}

      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home addToCart={addToCart} openMemberModal={openMemberModal} />} />
          <Route path="/launch" element={<LandingPage />} />
          <Route path="/gorras" element={<CategoryPage category="gorras" addToCart={addToCart} globalSearch={globalSearch} />} />
          <Route path="/pantalones" element={<CategoryPage category="pantalones" addToCart={addToCart} globalSearch={globalSearch} />} />
          <Route path="/camisas" element={<CategoryPage category="camisas" addToCart={addToCart} globalSearch={globalSearch} />} />
          <Route path="/product/:productId" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} products={products} totalPrice={totalPrice} updateQuantity={updateQuantity} clearCart={clearCart} />} />
        </Routes>
        <MobileCartSummary totalItems={totalItems} totalPrice={totalPrice} />
      </main>
      <div className={`modal-backdrop ${showMemberModal ? 'visible' : ''}`} onClick={closeMemberModal} />
      <div className={`member-modal ${showMemberModal ? 'open' : ''}`} onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={closeMemberModal} aria-label="Cerrar modal">✕</button>
        <p className="eyebrow">SK MIEMBROS</p>
        <h2>Acceso elite a drops exclusivos</h2>
        <p>Conviértete en miembro premium y recibe acceso anticipado, promociones privadas y envíos exprés.</p>
        <div className="modal-features">
          <span>Acceso anticipado</span>
          <span>Descuentos VIP</span>
          <span>Soporte privado</span>
        </div>
        <button className="btn btn-primary" onClick={closeMemberModal}>Unirme ahora</button>
      </div>
    </>
  );
}

function getCountdownTime(targetTimestamp) {
  const total = targetTimestamp - Date.now();
  const hours = total > 0 ? Math.floor((total / (1000 * 60 * 60)) % 24) : 0;
  const minutes = total > 0 ? Math.floor((total / (1000 * 60)) % 60) : 0;
  const seconds = total > 0 ? Math.floor((total / 1000) % 60) : 0;

  const pad = (value) => String(value).padStart(2, '0');

  return {
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  };
}

function LandingPage() {
  const navigate = useNavigate();
  const targetTimestamp = useMemo(() => Date.now() + 24 * 60 * 60 * 1000, []);
  const [timeLeft, setTimeLeft] = useState(getCountdownTime(targetTimestamp));
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getCountdownTime(targetTimestamp));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTimestamp]);

  const handleEnter = (event) => {
    event.preventDefault();
    if (isEntering) return;
    setIsEntering(true);
    setTimeout(() => navigate('/home'), 320);
  };

  return (
    <section className="launch-hero">
      <div className={`launch-screen fade-up ${isEntering ? 'exiting' : ''}`}>
        <Link className="launch-title" to="/home" onClick={handleEnter}>LUXURY WORLD PREMIUM</Link>
        <p className="launch-subtitle">Drop Urban Premium en 24 horas</p>
        <div className="launch-countdown simple-countdown">
          <div>
            <strong>{timeLeft.hours}</strong>
            <span>Horas</span>
          </div>
          <div>
            <strong>{timeLeft.minutes}</strong>
            <span>Minutos</span>
          </div>
          <div>
            <strong>{timeLeft.seconds}</strong>
            <span>Segundos</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home({ addToCart }) {
  const [selectedLookImage, setSelectedLookImage] = useState(null);

  const lookbookItems = [
    {
      id: 1,
      title: 'Look 01',
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 2,
      title: 'Look 02',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 3,
      title: 'Look 03',
      image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80',
    },
  ];

  const openLookbookImage = (item) => setSelectedLookImage(item);
  const closeLookbookImage = () => setSelectedLookImage(null);

  const featuredProducts = [
    products.find((product) => product.category === 'gorras'),
    products.find((product) => product.category === 'camisas'),
    products.find((product) => product.category === 'pantalones'),
  ].filter(Boolean);

  return (
    <>
      <section className="hero hero-splash">
        <div className="hero-copy fade-up">
          <p className="eyebrow">Proxima colección</p>
          <h1>LUXURY WORLD PREMIUM</h1>
          <p>Estilo exclusivo, actitud urbana y una presencia que marca el ritmo de la ciudad.</p>
          <div className="hero-actions">
            <button
              className="btn btn-primary"
              onClick={() => {
                const el = document.getElementById('categories');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else window.location.href = '/home#categories';
              }}
            >Comprar ahora</button>
          </div>
        </div>
      </section>

      <section className="trust-row fade-up">
        <div className="trust-card">
          <strong>⚡ Envío exprés</strong>
          <span>Disponible para pedidos selectos</span>
        </div>
        <div className="trust-card">
          <strong>💎 Calidad premium</strong>
          <span>Materiales exclusivos y cortes de autor</span>
        </div>
        <div className="trust-card">
          <strong>🔥 Drops exclusivos</strong>
          <span>Entradas anticipadas solo para miembros</span>
        </div>
      </section>

      <section className="featured-banner fade-up">
        <div>
          <p className="eyebrow">Insider drop</p>
          <h2>Suscríbete para acceso exclusivo a la siguiente colección</h2>
        </div>
        <Link className="btn btn-secondary" to="/gorras">Únete ahora</Link>
      </section>

      <section id="categories" className="categories">
        <div className="section-title fade-up">
          <p className="eyebrow">Categorías</p>
          <h2>Elige tu lenguaje de estilo</h2>
        </div>
        <div className="category-grid">
          <Link className="category-card fade-up delay-1" to="/gorras">
            <img src={portadaGorras} alt="Gorras modernas" />
            <div>
              <h3>Gorras</h3>
              <p>Caps premium con actitud de calle.</p>
            </div>
          </Link>
          <Link className="category-card fade-up delay-2" to="/pantalones">
            <img src={portadaPantalones} alt="Pantalones modernos" />
            <div>
              <h3>Pantalones</h3>
              <p>Cortes refinados y confort de lujo.</p>
            </div>
          </Link>
          <Link className="category-card fade-up delay-3" to="/camisas">
            <img src={portadaCamisas} alt="Camisas modernas" />
            <div>
              <h3>Camisas</h3>
              <p>Silk, linen y estructura de editorial.</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="section-page">
        <div className="section-title fade-up">
          <p className="eyebrow">Novedades</p>
          <h2>Lo más codiciado esta semana</h2>
        </div>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </section>

      <section className="exclusive-section fade-up">
        <div className="exclusive-card">
          <div>
            <p className="eyebrow">Colección exclusiva</p>
            <h2>Drop urbano premium</h2>
            <p>Edición limitada con estilo oscuro, logos metálicos y cortes pensados para la calle.</p>
            <Link className="btn btn-primary" to="/">Ver colección completa</Link>
          </div>
          <div
            className="exclusive-image"
            style={{ backgroundImage: `url(${premiumImage})` }}
          />
        </div>
      </section>

      <section className="vip-section fade-up">
        <div className="section-title">
          <p className="eyebrow">Miembros VIP</p>
          <h2>Beneficios de la membresía elite</h2>
        </div>
        <div className="vip-grid">
          <article className="vip-card">
            <strong>Acceso anticipado</strong>
            <p>Compra antes que el público general en cada drop.</p>
          </article>
          <article className="vip-card">
            <strong>Descuentos VIP</strong>
            <p>Obtén precio exclusivo en colecciones seleccionadas.</p>
          </article>
          <article className="vip-card">
            <strong>Soporte premium</strong>
            <p>Atención personalizada y seguimiento directo.</p>
          </article>
        </div>
      </section>

      <section className="reviews-section fade-up">
        <div className="section-title">
          <p className="eyebrow">Reseñas</p>
          <h2>Lo que dicen nuestros miembros</h2>
        </div>
        <div className="reviews-grid">
          <article className="review-card">
            <p>“El drop llegó antes y la calidad excedió mis expectativas. El servicio VIP es otro nivel.”</p>
            <strong>— Alejandro, Milano</strong>
          </article>
          <article className="review-card">
            <p>“Miembro desde el primer día. Me encanta tener acceso anticipado y la atención personalizada.”</p>
            <strong>— Camila, Madrid</strong>
          </article>
          <article className="review-card">
            <p>“Cada lanzamiento se siente exclusivo. Los descuentos VIP realmente marcan la diferencia.”</p>
            <strong>— Mateo, Barcelona</strong>
          </article>
        </div>
      </section>
    </>
  );
}

function CategoryPage({ category, addToCart, globalSearch }) {
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [maxPrice, setMaxPrice] = useState(200);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('relevant');
  const [activeTag, setActiveTag] = useState('all');

  useEffect(() => {
    setSelectedCategory(category);
    setSearchTerm('');
    setSortOption('relevant');
    setActiveTag('all');
  }, [category]);

  const availableTags = useMemo(() => {
    return Array.from(
      new Set(
        products
          .filter((product) =>
            selectedCategory === 'all' ? product.category === category : product.category === selectedCategory
          )
          .flatMap((product) => product.tags || [])
      )
    );
  }, [category, selectedCategory]);

  const filtered = products
    .filter((product) => {
      const matchesCategory = selectedCategory === 'all' ? product.category === category : product.category === selectedCategory;
      const matchesPrice = product.price <= maxPrice;
      const searchValue = (searchTerm || globalSearch).trim().toLowerCase();
      const matchesSearch = !searchValue || [product.name, product.description, product.category].some((text) =>
        text.toLowerCase().includes(searchValue)
      );
      const matchesTag = activeTag === 'all' || product.tags?.includes(activeTag);
      return matchesCategory && matchesPrice && matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      return b.inStock - a.inStock;
    });

  return (
    <section className="section-page">
      <div className="page-hero">
        <div>
          <p className="eyebrow">Sección destacada</p>
          <h1>{category === 'gorras' ? 'Gorras con presencia' : category === 'pantalones' ? 'Pantalones de alto standing' : 'Camisas de impacto editorial'}</h1>
          <p>{category === 'gorras' ? 'Piezas que elevan el look y aportan el aura que define el street luxury.' : category === 'pantalones' ? 'Cortes limpios y telas que transmiten sofisticación desde la calle.' : 'Diseños que combinan exclusividad, fluidez y un toque más fashion.'}</p>
        </div>
        <Link className="btn btn-secondary" to="/">Volver al inicio</Link>
      </div>

      <div className="filters-card fade-up">
        <div className="filter-group">
          <button className={`filter-chip ${selectedCategory === 'all' ? 'active' : ''}`} onClick={() => setSelectedCategory('all')}>
            Todas
          </button>
          <button className={`filter-chip ${selectedCategory === 'gorras' ? 'active' : ''}`} onClick={() => setSelectedCategory('gorras')}>
            Gorras
          </button>
          <button className={`filter-chip ${selectedCategory === 'pantalones' ? 'active' : ''}`} onClick={() => setSelectedCategory('pantalones')}>
            Pantalones
          </button>
          <button className={`filter-chip ${selectedCategory === 'camisas' ? 'active' : ''}`} onClick={() => setSelectedCategory('camisas')}>
            Camisas
          </button>
        </div>

        <div className="filter-tools">
          <label className="search-filter">
            <input
              type="text"
              placeholder="Buscar producto"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
          <label className="price-filter">
            <span>Precio hasta ${maxPrice}</span>
            <input type="range" min="40" max="120" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} />
          </label>
          <select value={sortOption} onChange={(event) => setSortOption(event.target.value)}>
            <option value="relevant">Más relevantes</option>
            <option value="price-asc">Precio: bajo a alto</option>
            <option value="price-desc">Precio: alto a bajo</option>
          </select>
        </div>
      </div>

      {!['gorras', 'pantalones', 'camisas'].includes(category) && (
        <div className="tag-filter-row fade-up">
          <span>Etiquetas:</span>
          <button className={`filter-chip ${activeTag === 'all' ? 'active' : ''}`} onClick={() => setActiveTag('all')}>
            Todas
          </button>
          {availableTags.map((tag) => (
            <button key={tag} className={`filter-chip ${activeTag === tag ? 'active' : ''}`} onClick={() => setActiveTag(tag)}>
              {tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="empty-state">
          No encontramos resultados para tu búsqueda. Prueba con otra palabra o ajusta el filtro.
        </div>
      ) : (
        <div className="products-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      )}
    </section>
  );
}

function ProductDetail({ addToCart }) {
  const { productId } = useParams();
  const product = products.find((item) => item.id === Number(productId));

  if (!product) {
    return (
      <section className="section-page">
        <div className="empty-state">Producto no encontrado. Vuelve al catálogo y elige otra prenda.</div>
      </section>
    );
  }

  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);

  return (
    <section className="section-page detail-page">
      <div className="page-hero detail-hero">
        <div>
          <p className="eyebrow">Detalle del producto</p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div className="product-detail-meta">
            <span className="price">{currency.format(product.price)}</span>
            <span className={`stock-badge ${product.inStock ? 'available' : 'sold-out'}`}>
              {product.inStock ? 'Disponible' : 'Agotado'}
            </span>
          </div>
          <div className="detail-actions">
            <button
              disabled={!product.inStock}
              onClick={() => addToCart(product.id)}
              className="btn btn-primary"
            >
              {product.inStock ? 'Agregar al carrito' : 'Producto agotado'}
            </button>
            <Link className="btn btn-secondary" to={`/${product.category}`}>Ver colección</Link>
          </div>
        </div>
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>
      </div>

      {related.length > 0 && (
        <div className="section-page">
          <div className="section-title">
            <p className="eyebrow">Sugerencias</p>
            <h2>También podría gustarte</h2>
          </div>
          <div className="products-grid">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} addToCart={addToCart} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function CartPage({ cart, products, totalPrice, updateQuantity, clearCart }) {
  const [formData, setFormData] = useState({ name: '', email: '', address: '' });
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!cart.length) return;
    const number = `LU-${Date.now().toString().slice(-6)}`;
    const message = `Hola, quiero confirmar mi compra.%0A%0APedido: ${number}%0ANombre: ${encodeURIComponent(formData.name)}%0ACorreo: ${encodeURIComponent(formData.email)}%0ADirección: ${encodeURIComponent(formData.address)}%0AProductos:%0A${cart
      .map((entry) => {
        const product = products.find((item) => item.id === entry.id);
        return `- ${product?.name || 'Producto'} x${entry.quantity}`;
      })
      .join('%0A')}`;
    setOrderNumber(number);
    setOrderComplete(true);
    clearCart();
    setFormData({ name: '', email: '', address: '' });
    window.open(`https://wa.me/573196359601?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="section-page">
      <div className="page-hero">
        <div>
          <p className="eyebrow">Tu compra</p>
          <h1>Preparando tu edición</h1>
        </div>
        <Link className="btn btn-secondary" to="/">Seguir comprando</Link>
      </div>

      <div className="cart-layout">
        <div>
          {cart.length === 0 ? (
            <div className="empty-state">{orderComplete ? `Pedido confirmado: ${orderNumber}` : 'Tu carrito está vacío. Elige una prenda y empieza tu compra.'}</div>
          ) : (
            cart.map((entry) => {
              const product = products.find((item) => item.id === entry.id);
              if (!product) return null;
              return (
                <article className="cart-item fade-up" key={entry.id}>
                  <img src={product.image} alt={product.name} />
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="quantity-controls">
                      <button type="button" onClick={() => updateQuantity(product.id, -1)}>-</button>
                      <span>{entry.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(product.id, 1)}>+</button>
                    </div>
                  </div>
                  <div>
                    <p className="price">{currency.format(product.price * entry.quantity)}</p>
                  </div>
                </article>
              );
            })
          )}
        </div>

        <div className="checkout-card">
          <div className="cart-summary">
            <h3>Resumen</h3>
            <p>Subtotal: <strong>{currency.format(totalPrice)}</strong></p>
            <p>Envío: GRATIS</p>
            <p>Entrega en 24-48 h</p>
          </div>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
              required
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
              required
            />
            <textarea
              placeholder="Dirección de entrega"
              value={formData.address}
              onChange={(event) => setFormData((prev) => ({ ...prev, address: event.target.value }))}
              required
            />
            <button type="submit">Finalizar compra</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default App;
