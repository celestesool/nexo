import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { productos, distribuidores } from '../../data/mockData';
import './Favorites.css';

export default function Favorites() {
    const { favorites, removeFavorite, clearFavorites } = useFavorites();
    const { addItem } = useCart();

    const getProductDetails = (productoId) => {
        return productos.find(p => p.id === productoId);
    };

    const getBestPrice = (producto) => {
        if (!producto?.precios) return null;
        return producto.precios.reduce((min, p) => p.precio < min.precio ? p : min, producto.precios[0]);
    };

    const getDistribuidor = (id) => {
        return distribuidores.find(d => d.id === id);
    };

    const handleAddToCart = (producto) => {
        const bestPrice = getBestPrice(producto);
        if (bestPrice) {
            addItem(producto, bestPrice.distribuidorId, producto.unidadMinima, bestPrice.precio);
        }
    };

    return (
        <div className="favorites-page">
            <div className="container">
                {/* Header */}
                <div className="favorites-header animate-fade-in-up">
                    <div className="favorites-header-left">
                        <h1 className="favorites-title">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            Mis Favoritos
                        </h1>
                        <p className="favorites-subtitle">
                            {favorites.length} {favorites.length === 1 ? 'producto guardado' : 'productos guardados'}
                        </p>
                    </div>
                    {favorites.length > 0 && (
                        <button className="btn btn-ghost" onClick={clearFavorites}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                            Limpiar todo
                        </button>
                    )}
                </div>

                {favorites.length === 0 ? (
                    <div className="favorites-empty animate-fade-in-up">
                        <div className="empty-icon">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </div>
                        <h2>No tienes productos favoritos</h2>
                        <p>Explora nuestro catálogo y guarda los productos que más te gusten</p>
                        <Link to="/catalogo" className="btn btn-primary btn-lg">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                            Explorar Catálogo
                        </Link>
                    </div>
                ) : (
                    <div className="favorites-grid">
                        {favorites.map((fav, index) => {
                            const producto = getProductDetails(fav.id);
                            if (!producto) return null;

                            const bestPrice = getBestPrice(producto);
                            const distribuidor = bestPrice ? getDistribuidor(bestPrice.distribuidorId) : null;

                            return (
                                <div
                                    key={fav.id}
                                    className="favorite-card animate-fade-in-up"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className="favorite-image">
                                        <img src={producto.imagen} alt={producto.nombre} />
                                        <button
                                            className="favorite-remove"
                                            onClick={() => removeFavorite(fav.id)}
                                            title="Quitar de favoritos"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <line x1="18" y1="6" x2="6" y2="18" />
                                                <line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                        </button>
                                        <span className="favorite-category">{producto.categoria}</span>
                                    </div>
                                    <div className="favorite-content">
                                        <h3 className="favorite-name">{producto.nombre}</h3>
                                        {bestPrice && (
                                            <div className="favorite-price-info">
                                                <span className="favorite-price">Bs. {bestPrice.precio.toFixed(2)}</span>
                                                {bestPrice.precioAnterior && (
                                                    <span className="favorite-old-price">
                                                        Bs. {bestPrice.precioAnterior.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        {distribuidor && (
                                            <p className="favorite-distributor">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="1" y="3" width="15" height="13" />
                                                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                                                    <circle cx="5.5" cy="18.5" r="2.5" />
                                                    <circle cx="18.5" cy="18.5" r="2.5" />
                                                </svg>
                                                {distribuidor.nombre}
                                            </p>
                                        )}
                                        <div className="favorite-actions">
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => handleAddToCart(producto)}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="9" cy="21" r="1" />
                                                    <circle cx="20" cy="21" r="1" />
                                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                                </svg>
                                                Agregar
                                            </button>
                                            <Link to="/catalogo" className="btn btn-ghost btn-sm">
                                                Ver detalles
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Recommendations */}
                {favorites.length > 0 && (
                    <div className="favorites-recommendations animate-fade-in-up delay-300">
                        <h2>También te puede interesar</h2>
                        <div className="recommendations-grid">
                            {productos
                                .filter(p => !favorites.some(f => f.id === p.id))
                                .slice(0, 4)
                                .map(producto => {
                                    const bestPrice = getBestPrice(producto);
                                    return (
                                        <div key={producto.id} className="recommendation-card">
                                            <img src={producto.imagen} alt={producto.nombre} />
                                            <div className="recommendation-info">
                                                <h4>{producto.nombre}</h4>
                                                {bestPrice && (
                                                    <span className="recommendation-price">
                                                        Bs. {bestPrice.precio.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
