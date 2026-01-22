import { useState, useRef, useEffect } from 'react';
import { productos, categorias, distribuidores } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { toggleBodyScroll } from '../../utils/modalUtils';
import './Catalog.css';

export default function Catalog() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [viewMode, setViewMode] = useState('category'); // 'category', 'grid', 'list'
    const [notification, setNotification] = useState(null);
    const { addItem } = useCart();

    useEffect(() => {
        toggleBodyScroll(!!selectedProduct);
        return () => toggleBodyScroll(false);
    }, [selectedProduct]);

    const getDistribuidor = (id) => distribuidores.find(d => d.id === id);

    const filteredProducts = productos.filter(p => {
        const matchSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategory = selectedCategory === 'all' || p.categoria === selectedCategory;
        return matchSearch && matchCategory;
    });

    // Agrupar por categoria
    const productsByCategory = categorias.reduce((acc, cat) => {
        const prods = filteredProducts.filter(p => p.categoria === cat.nombre);
        if (prods.length > 0) {
            acc.push({ ...cat, products: prods });
        }
        return acc;
    }, []);

    const handleAddToCart = (producto, distribuidorId, cantidad, precio) => {
        addItem(producto, distribuidorId, cantidad, precio);
        setNotification(producto.nombre);
        setTimeout(() => setNotification(null), 3000);
    };

    // Carousel scroll
    const scrollCarousel = (ref, direction) => {
        if (ref.current) {
            const scrollAmount = 320;
            ref.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <main className="catalog-page">
            <div className="catalog-container">
                {/* Header */}
                <div className="catalog-header animate-fade-in-up">
                    <div>
                        <h1 className="catalog-title">Catalogo de Productos</h1>
                        <p className="catalog-subtitle">Compara precios de diferentes distribuidores</p>
                    </div>
                </div>

                {/* Search & Filters */}
                <div className="catalog-toolbar animate-fade-in-up delay-100">
                    <div className="catalog-search">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            className="input"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="catalog-filters">
                        <select
                            className="input catalog-select"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="all">Todas las categorias</option>
                            {categorias.map(cat => (
                                <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
                            ))}
                        </select>

                        {/* View Mode Toggle */}
                        <div className="view-toggle">
                            <button
                                className={`view-toggle-btn ${viewMode === 'category' ? 'active' : ''}`}
                                onClick={() => setViewMode('category')}
                                title="Vista Carrusel"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="3" width="20" height="5" rx="1" />
                                    <rect x="2" y="10" width="20" height="5" rx="1" />
                                    <rect x="2" y="17" width="20" height="4" rx="1" />
                                </svg>
                            </button>
                            <button
                                className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                onClick={() => setViewMode('grid')}
                                title="Vista Cuadricula"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="3" width="7" height="7" />
                                    <rect x="14" y="3" width="7" height="7" />
                                    <rect x="14" y="14" width="7" height="7" />
                                    <rect x="3" y="14" width="7" height="7" />
                                </svg>
                            </button>
                            <button
                                className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={() => setViewMode('list')}
                                title="Vista Lista"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="8" y1="6" x2="21" y2="6" />
                                    <line x1="8" y1="12" x2="21" y2="12" />
                                    <line x1="8" y1="18" x2="21" y2="18" />
                                    <line x1="3" y1="6" x2="3.01" y2="6" />
                                    <line x1="3" y1="12" x2="3.01" y2="12" />
                                    <line x1="3" y1="18" x2="3.01" y2="18" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Category Carousel View */}
                {viewMode === 'category' && (
                    <div className="catalog-categories animate-fade-in-up delay-200">
                        {productsByCategory.map(category => (
                            <CategoryCarousel
                                key={category.id}
                                category={category}
                                onProductClick={setSelectedProduct}
                                getDistribuidor={getDistribuidor}
                                scrollCarousel={scrollCarousel}
                            />
                        ))}
                    </div>
                )}

                {/* Grid View */}
                {viewMode === 'grid' && (
                    <div className="catalog-grid animate-fade-in-up delay-200">
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={() => setSelectedProduct(product)}
                                getDistribuidor={getDistribuidor}
                            />
                        ))}
                    </div>
                )}

                {/* List View */}
                {viewMode === 'list' && (
                    <div className="catalog-list animate-fade-in-up delay-200">
                        {filteredProducts.map(product => (
                            <ProductListItem
                                key={product.id}
                                product={product}
                                onClick={() => setSelectedProduct(product)}
                                getDistribuidor={getDistribuidor}
                            />
                        ))}
                    </div>
                )}

                {filteredProducts.length === 0 && (
                    <div className="catalog-empty">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <h3>No se encontraron productos</h3>
                        <p>Intenta con otros terminos de busqueda</p>
                    </div>
                )}
            </div>

            {/* Product Detail Modal */}
            {selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onAddToCart={handleAddToCart}
                    getDistribuidor={getDistribuidor}
                />
            )}

            {/* Notification */}
            {notification && (
                <div className="notification animate-slide-in-right">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{notification} agregado al carrito</span>
                </div>
            )}
        </main>
    );
}

// Category Carousel Component
function CategoryCarousel({ category, onProductClick, getDistribuidor, scrollCarousel }) {
    const carouselRef = useRef(null);

    return (
        <section className="category-section">
            <div className="category-header">
                <div className="category-info">
                    <span className="category-icon">{category.icono}</span>
                    <h2 className="category-title">{category.nombre}</h2>
                    <span className="category-count">{category.products.length} productos</span>
                </div>
                <div className="carousel-controls">
                    <button
                        className="carousel-btn"
                        onClick={() => scrollCarousel(carouselRef, 'left')}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <button
                        className="carousel-btn"
                        onClick={() => scrollCarousel(carouselRef, 'right')}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="carousel-wrapper">
                <div className="carousel-track" ref={carouselRef}>
                    {category.products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onClick={() => onProductClick(product)}
                            getDistribuidor={getDistribuidor}
                            isCarousel
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

// Product Card Component
function ProductCard({ product, onClick, getDistribuidor, isCarousel = false }) {
    const lowestPrice = Math.min(...product.precios.map(p => p.precio));
    const highestPrice = Math.max(...product.precios.map(p => p.precio));
    const hasMultiplePrices = product.precios.length > 1;

    return (
        <div className={`product-card ${isCarousel ? 'product-card-carousel' : ''}`} onClick={onClick}>
            <div className="product-card-image">
                <img src={product.imagen} alt={product.nombre} />
                {hasMultiplePrices && (
                    <span className="product-compare-badge">
                        {product.precios.length} precios
                    </span>
                )}
            </div>
            <div className="product-card-content">
                <span className="product-card-category">{product.categoria}</span>
                <h3 className="product-card-name">{product.nombre}</h3>
                <div className="product-card-pricing">
                    <span className="product-card-price">Bs. {lowestPrice.toFixed(2)}</span>
                    {hasMultiplePrices && (
                        <span className="product-card-price-range">- Bs. {highestPrice.toFixed(2)}</span>
                    )}
                </div>
                <span className="product-card-min">Min. {product.unidadMinima} und.</span>
            </div>
        </div>
    );
}

// Product List Item Component
function ProductListItem({ product, onClick, getDistribuidor }) {
    const lowestPrice = Math.min(...product.precios.map(p => p.precio));
    const bestDistribuidor = product.precios.find(p => p.precio === lowestPrice);
    const dist = getDistribuidor(bestDistribuidor?.distribuidorId);

    return (
        <div className="product-list-item" onClick={onClick}>
            <img src={product.imagen} alt={product.nombre} className="product-list-image" />
            <div className="product-list-info">
                <span className="product-list-category">{product.categoria}</span>
                <h3 className="product-list-name">{product.nombre}</h3>
                <span className="product-list-min">Min. {product.unidadMinima} und.</span>
            </div>
            <div className="product-list-vendor">
                {dist && (
                    <>
                        <img src={dist.logo} alt={dist.nombre} />
                        <span>Mejor precio</span>
                    </>
                )}
            </div>
            <div className="product-list-pricing">
                <span className="product-list-price">Bs. {lowestPrice.toFixed(2)}</span>
                {product.precios.length > 1 && (
                    <span className="product-list-compare">{product.precios.length} distribuidores</span>
                )}
            </div>
            <button className="btn btn-sm btn-secondary">
                Ver Detalles
            </button>
        </div>
    );
}

// Product Detail Modal
function ProductDetailModal({ product, onClose, onAddToCart, getDistribuidor }) {
    const [selectedDistribuidor, setSelectedDistribuidor] = useState(null);
    const [quantity, setQuantity] = useState(product.unidadMinima);

    const sortedPrices = [...product.precios].sort((a, b) => a.precio - b.precio);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="product-modal animate-scale-in" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                <div className="product-modal-grid">
                    <div className="product-modal-image">
                        <img src={product.imagen} alt={product.nombre} />
                    </div>

                    <div className="product-modal-content">
                        <span className="product-modal-category">{product.categoria}</span>
                        <h2 className="product-modal-name">{product.nombre}</h2>
                        <p className="product-modal-desc">{product.descripcion}</p>

                        <div className="product-modal-section">
                            <h3>Comparar Precios</h3>
                            <div className="price-comparison">
                                {sortedPrices.map((precio, index) => {
                                    const dist = getDistribuidor(precio.distribuidorId);
                                    const isBest = index === 0;
                                    const isSelected = selectedDistribuidor?.distribuidorId === precio.distribuidorId;

                                    return (
                                        <div
                                            key={precio.distribuidorId}
                                            className={`price-option ${isBest ? 'best' : ''} ${isSelected ? 'selected' : ''}`}
                                            onClick={() => setSelectedDistribuidor(precio)}
                                        >
                                            {isBest && <span className="best-badge">Mejor Precio</span>}
                                            <div className="price-option-header">
                                                <div className="distributor-avatar-wrapper">
                                                    <img src={dist?.logo} alt={dist?.nombre} />
                                                    <div className="distributor-tooltip">
                                                        <strong>{dist?.nombre}</strong>
                                                        {dist?.direccion && <span>{dist.direccion}</span>}
                                                        {dist?.telefono && <span>Tel: {dist.telefono}</span>}
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="price-option-vendor" title={dist?.nombre}>{dist?.nombre}</span>
                                                    <span className="price-option-stock">{precio.stock} en stock</span>
                                                </div>
                                            </div>
                                            <span className="price-option-price">Bs. {precio.precio.toFixed(2)}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {selectedDistribuidor && (
                            <div className="product-modal-actions">
                                <div className="quantity-selector">
                                    <button
                                        className="quantity-btn"
                                        onClick={() => setQuantity(Math.max(product.unidadMinima, quantity - product.unidadMinima))}
                                    >
                                        -
                                    </button>
                                    <span className="quantity-value">{quantity}</span>
                                    <button
                                        className="quantity-btn"
                                        onClick={() => setQuantity(quantity + product.unidadMinima)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className="btn btn-primary btn-lg"
                                    onClick={() => {
                                        onAddToCart(product, selectedDistribuidor.distribuidorId, quantity, selectedDistribuidor.precio);
                                        onClose();
                                    }}
                                >
                                    Agregar Bs. {(selectedDistribuidor.precio * quantity).toFixed(2)}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
