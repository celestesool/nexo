import { useState } from 'react';
import { Link } from 'react-router-dom';
import { productos, ofertas as ofertasData, distribuidores } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import './Offers.css';

export default function Offers() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const { addItem } = useCart();
    const [notification, setNotification] = useState(null);

    const getProducto = (id) => productos.find(p => p.id === id);
    const getDistribuidor = (id) => distribuidores.find(d => d.id === id);

    const activeOffers = ofertasData.filter(o => o.activa);

    const categories = [...new Set(activeOffers.map(o => {
        const producto = getProducto(o.productoId);
        return producto?.categoria;
    }).filter(Boolean))];

    const filteredOffers = selectedCategory === 'all'
        ? activeOffers
        : activeOffers.filter(o => {
            const producto = getProducto(o.productoId);
            return producto?.categoria === selectedCategory;
        });

    const handleAddToCart = (offer) => {
        const producto = getProducto(offer.productoId);
        const precioOriginal = producto.precios[0]?.precio || 0;
        const precioOferta = precioOriginal * (1 - offer.descuento / 100);

        addItem(producto, offer.distribuidorId, producto.unidadMinima, precioOferta);
        setNotification(producto.nombre);
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <main className="offers-page">
            <div className="offers-container">
                {/* Header */}
                <div className="offers-header animate-fade-in-up">
                    <div className="offers-header-content">
                        <span className="offers-badge">Ofertas Especiales</span>
                        <h1 className="offers-title">Aprovecha los Mejores Precios</h1>
                        <p className="offers-subtitle">
                            Descuentos exclusivos de nuestros distribuidores. Ofertas por tiempo limitado.
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="offers-stats animate-fade-in-up delay-100">
                    <div className="offer-stat-card">
                        <span className="offer-stat-number">{activeOffers.length}</span>
                        <span className="offer-stat-text">Ofertas Activas</span>
                    </div>
                    <div className="offer-stat-card">
                        <span className="offer-stat-number">Hasta 20%</span>
                        <span className="offer-stat-text">De Descuento</span>
                    </div>
                    <div className="offer-stat-card">
                        <span className="offer-stat-number">{distribuidores.length}</span>
                        <span className="offer-stat-text">Distribuidores</span>
                    </div>
                </div>

                {/* Filters */}
                <div className="offers-filters animate-fade-in-up delay-200">
                    <button
                        className={`offers-filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('all')}
                    >
                        Todas
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`offers-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Offers Grid */}
                <div className="offers-grid">
                    {filteredOffers.map((offer, index) => {
                        const producto = getProducto(offer.productoId);
                        const distribuidor = getDistribuidor(offer.distribuidorId);
                        if (!producto || !distribuidor) return null;

                        const precioOriginal = producto.precios[0]?.precio || 0;
                        const precioOferta = precioOriginal * (1 - offer.descuento / 100);
                        const ahorro = precioOriginal - precioOferta;

                        return (
                            <div
                                key={offer.id}
                                className="offer-product-card animate-fade-in-up"
                                style={{ animationDelay: `${(index + 3) * 50}ms` }}
                            >
                                <div className="offer-discount-badge">-{offer.descuento}%</div>

                                <div className="offer-product-image">
                                    <img src={producto.imagen} alt={producto.nombre} />
                                </div>

                                <div className="offer-product-content">
                                    <span className="offer-product-category">{producto.categoria}</span>
                                    <h3 className="offer-product-name">{producto.nombre}</h3>

                                    <div className="offer-vendor">
                                        <img src={distribuidor.logo} alt={distribuidor.nombre} />
                                        <span>{distribuidor.nombre}</span>
                                    </div>

                                    <div className="offer-reason">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="12" y1="16" x2="12" y2="12" />
                                            <line x1="12" y1="8" x2="12.01" y2="8" />
                                        </svg>
                                        {offer.motivo}
                                    </div>

                                    <div className="offer-pricing">
                                        <div className="offer-prices">
                                            <span className="offer-old-price">Bs. {precioOriginal.toFixed(2)}</span>
                                            <span className="offer-new-price">Bs. {precioOferta.toFixed(2)}</span>
                                        </div>
                                        <span className="offer-savings">Ahorras Bs. {ahorro.toFixed(2)}</span>
                                    </div>

                                    <div className="offer-validity">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        Valido hasta {offer.fechaFin}
                                    </div>

                                    <button
                                        className="btn btn-primary offer-add-btn"
                                        onClick={() => handleAddToCart(offer)}
                                    >
                                        Agregar al Carrito
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredOffers.length === 0 && (
                    <div className="offers-empty animate-fade-in">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                            <line x1="7" y1="7" x2="7.01" y2="7" />
                        </svg>
                        <h3>No hay ofertas disponibles</h3>
                        <p>Vuelve pronto para ver nuevas promociones</p>
                        <Link to="/catalogo" className="btn btn-primary">
                            Ver Catalogo
                        </Link>
                    </div>
                )}

                {/* CTA Section */}
                <div className="offers-cta animate-fade-in-up">
                    <div className="offers-cta-content">
                        <h2>No te pierdas ninguna oferta</h2>
                        <p>Recibe notificaciones cuando haya nuevas promociones</p>
                    </div>
                    <Link to="/registro" className="btn btn-primary btn-lg">
                        Crear Cuenta Gratis
                    </Link>
                </div>
            </div>

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
