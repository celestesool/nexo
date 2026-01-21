import { useState, useMemo } from 'react';
import { productos, categorias, distribuidores } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Catalog.css';

export default function Catalog() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { addItem } = useCart();
    const { isAuthenticated } = useAuth();
    const [quantities, setQuantities] = useState({});
    const [notification, setNotification] = useState(null);

    const filteredProducts = useMemo(() => {
        let filtered = productos;

        if (searchTerm) {
            filtered = filtered.filter(p =>
                p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(p => p.categoria === selectedCategory);
        }

        if (sortBy === 'name') {
            filtered = [...filtered].sort((a, b) => a.nombre.localeCompare(b.nombre));
        } else if (sortBy === 'price-low') {
            filtered = [...filtered].sort((a, b) => {
                const minA = Math.min(...a.precios.map(p => p.precio));
                const minB = Math.min(...b.precios.map(p => p.precio));
                return minA - minB;
            });
        } else if (sortBy === 'price-high') {
            filtered = [...filtered].sort((a, b) => {
                const minA = Math.min(...a.precios.map(p => p.precio));
                const minB = Math.min(...b.precios.map(p => p.precio));
                return minB - minA;
            });
        }

        return filtered;
    }, [searchTerm, selectedCategory, sortBy]);

    const getBestPrice = (product) => {
        return Math.min(...product.precios.map(p => p.precio));
    };

    const getDistributor = (id) => {
        return distribuidores.find(d => d.id === id);
    };

    const handleAddToCart = (product, distribuidorId, precio) => {
        const qty = quantities[`${product.id}-${distribuidorId}`] || product.unidadMinima;
        addItem(product, distribuidorId, qty, precio);
        setNotification({ product: product.nombre, qty });
        setTimeout(() => setNotification(null), 3000);
    };

    const updateQuantity = (productId, distribuidorId, delta, minUnit) => {
        const key = `${productId}-${distribuidorId}`;
        const current = quantities[key] || minUnit;
        const newQty = Math.max(minUnit, current + delta);
        setQuantities({ ...quantities, [key]: newQty });
    };

    return (
        <main className="catalog-page">
            <div className="catalog-container">
                {/* Header */}
                <div className="catalog-header animate-fade-in-up">
                    <div className="catalog-header-content">
                        <h1 className="catalog-title">Catalogo de Productos</h1>
                        <p className="catalog-subtitle">
                            Explora y compara precios entre diferentes distribuidores
                        </p>
                    </div>

                    <div className="catalog-search">
                        <svg className="catalog-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            className="input catalog-search-input"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="catalog-content">
                    {/* Sidebar Filters */}
                    <aside className="catalog-sidebar animate-fade-in">
                        <div className="catalog-filter-section">
                            <h3 className="catalog-filter-title">Categorias</h3>
                            <div className="catalog-categories">
                                <button
                                    className={`catalog-category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory('all')}
                                >
                                    Todas
                                </button>
                                {categorias.map(cat => (
                                    <button
                                        key={cat.id}
                                        className={`catalog-category-btn ${selectedCategory === cat.nombre ? 'active' : ''}`}
                                        onClick={() => setSelectedCategory(cat.nombre)}
                                    >
                                        {cat.nombre}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="catalog-filter-section">
                            <h3 className="catalog-filter-title">Ordenar por</h3>
                            <select
                                className="input catalog-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="name">Nombre A-Z</option>
                                <option value="price-low">Menor precio</option>
                                <option value="price-high">Mayor precio</option>
                            </select>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="catalog-products">
                        <div className="catalog-products-header">
                            <span className="catalog-products-count">
                                {filteredProducts.length} productos encontrados
                            </span>
                        </div>

                        <div className="catalog-grid">
                            {filteredProducts.map((product, index) => (
                                <div
                                    key={product.id}
                                    className="product-card animate-fade-in-up"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className="product-image">
                                        <img src={product.imagen} alt={product.nombre} />
                                        {product.precios.some(p => p.precioAnterior) && (
                                            <span className="product-badge">Oferta</span>
                                        )}
                                    </div>

                                    <div className="product-info">
                                        <span className="product-category">{product.categoria}</span>
                                        <h3 className="product-name">{product.nombre}</h3>

                                        <div className="product-price-range">
                                            <span className="product-price">Bs. {getBestPrice(product).toFixed(2)}</span>
                                            <span className="product-price-label">desde</span>
                                        </div>

                                        <div className="product-vendors">
                                            {product.precios.length} distribuidor{product.precios.length > 1 ? 'es' : ''}
                                        </div>

                                        <button
                                            className="btn btn-secondary product-btn"
                                            onClick={() => setSelectedProduct(product)}
                                        >
                                            Comparar Precios
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Modal */}
            {selectedProduct && (
                <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
                    <div className="modal animate-scale-in" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedProduct(null)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        <div className="modal-content">
                            <div className="modal-product-header">
                                <img src={selectedProduct.imagen} alt={selectedProduct.nombre} className="modal-product-image" />
                                <div className="modal-product-info">
                                    <span className="product-category">{selectedProduct.categoria}</span>
                                    <h2 className="modal-product-name">{selectedProduct.nombre}</h2>
                                    <p className="modal-product-description">{selectedProduct.descripcion}</p>
                                    <span className="modal-product-min">Unidad minima: {selectedProduct.unidadMinima} unidades</span>
                                </div>
                            </div>

                            <h3 className="modal-section-title">Comparacion de Precios</h3>

                            <div className="modal-vendors">
                                {selectedProduct.precios
                                    .sort((a, b) => a.precio - b.precio)
                                    .map((precio, index) => {
                                        const dist = getDistributor(precio.distribuidorId);
                                        const key = `${selectedProduct.id}-${precio.distribuidorId}`;
                                        const qty = quantities[key] || selectedProduct.unidadMinima;

                                        return (
                                            <div key={precio.distribuidorId} className={`modal-vendor ${index === 0 ? 'best-price' : ''}`}>
                                                {index === 0 && <span className="best-price-badge">Mejor Precio</span>}

                                                <div className="modal-vendor-header">
                                                    <img src={dist.logo} alt={dist.nombre} className="modal-vendor-logo" />
                                                    <div className="modal-vendor-info">
                                                        <span className="modal-vendor-name">{dist.nombre}</span>
                                                        <span className="modal-vendor-delivery">{dist.tiempoEntrega}</span>
                                                    </div>
                                                </div>

                                                <div className="modal-vendor-pricing">
                                                    <div className="modal-vendor-price">
                                                        <span className="modal-price-current">Bs. {precio.precio.toFixed(2)}</span>
                                                        {precio.precioAnterior && (
                                                            <span className="modal-price-old">Bs. {precio.precioAnterior.toFixed(2)}</span>
                                                        )}
                                                    </div>
                                                    <span className="modal-vendor-stock">{precio.stock} en stock</span>
                                                </div>

                                                <div className="modal-vendor-actions">
                                                    <div className="quantity-selector">
                                                        <button
                                                            className="quantity-btn"
                                                            onClick={() => updateQuantity(selectedProduct.id, precio.distribuidorId, -selectedProduct.unidadMinima, selectedProduct.unidadMinima)}
                                                        >
                                                            -
                                                        </button>
                                                        <span className="quantity-value">{qty}</span>
                                                        <button
                                                            className="quantity-btn"
                                                            onClick={() => updateQuantity(selectedProduct.id, precio.distribuidorId, selectedProduct.unidadMinima, selectedProduct.unidadMinima)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        className="btn btn-primary modal-add-btn"
                                                        onClick={() => handleAddToCart(selectedProduct, precio.distribuidorId, precio.precio)}
                                                    >
                                                        Agregar Bs. {(precio.precio * qty).toFixed(2)}
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Notification */}
            {notification && (
                <div className="notification animate-slide-in-right">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{notification.qty}x {notification.product} agregado al carrito</span>
                </div>
            )}
        </main>
    );
}
