import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Header.css';

export default function Header() {
    const { user, isAuthenticated, logout, isPulperia, isDistribuidor } = useAuth();
    const { getItemCount } = useCart();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setMobileMenuOpen(false);
    };

    const closeMenu = () => setMobileMenuOpen(false);

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="header-logo" onClick={closeMenu}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <rect width="32" height="32" rx="8" fill="currentColor" />
                        <path d="M8 12L16 20L24 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 20L16 12L24 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="header-logo-text">Nexo</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="header-nav header-nav-desktop">
                    {!isAuthenticated() ? (
                        <>
                            <Link to="/catalogo" className="header-nav-link">Catalogo</Link>
                            <Link to="/ofertas" className="header-nav-link">Ofertas</Link>
                            <Link to="/login" className="header-nav-link">Iniciar Sesion</Link>
                            <Link to="/registro" className="btn btn-primary btn-sm">Registrarse</Link>
                        </>
                    ) : isPulperia() ? (
                        <>
                            <Link to="/dashboard" className="header-nav-link">Dashboard</Link>
                            <Link to="/catalogo" className="header-nav-link">Catalogo</Link>
                            <Link to="/pedidos" className="header-nav-link">Pedidos</Link>
                            <Link to="/inventario" className="header-nav-link">Inventario</Link>
                            <Link to="/analytics" className="header-nav-link">Predicciones</Link>
                            <Link to="/carrito" className="header-cart-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="9" cy="21" r="1" />
                                    <circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                </svg>
                                {getItemCount() > 0 && (
                                    <span className="header-cart-badge">{getItemCount()}</span>
                                )}
                            </Link>
                            <div className="header-user">
                                <div className="header-user-avatar">
                                    {user.propietario?.charAt(0) || user.nombre?.charAt(0)}
                                </div>
                                <button onClick={handleLogout} className="header-nav-link">Salir</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/empresa/dashboard" className="header-nav-link">Dashboard</Link>
                            <Link to="/empresa/productos" className="header-nav-link">Productos</Link>
                            <Link to="/empresa/pedidos" className="header-nav-link">Pedidos</Link>
                            <Link to="/empresa/ofertas" className="header-nav-link">Ofertas</Link>
                            <div className="header-user">
                                <div className="header-user-avatar">
                                    {user.representante?.charAt(0) || user.nombre?.charAt(0)}
                                </div>
                                <button onClick={handleLogout} className="header-nav-link">Salir</button>
                            </div>
                        </>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="header-menu-btn"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Menu"
                >
                    {mobileMenuOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={closeMenu} />

            {/* Mobile Menu */}
            <nav className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-header">
                    <span className="mobile-menu-title">Menu</span>
                </div>

                <div className="mobile-menu-content">
                    {!isAuthenticated() ? (
                        <>
                            <Link to="/catalogo" className="mobile-menu-link" onClick={closeMenu}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="3" width="7" height="7" />
                                    <rect x="14" y="3" width="7" height="7" />
                                    <rect x="14" y="14" width="7" height="7" />
                                    <rect x="3" y="14" width="7" height="7" />
                                </svg>
                                Catalogo
                            </Link>
                            <Link to="/ofertas" className="mobile-menu-link" onClick={closeMenu}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                    <line x1="7" y1="7" x2="7.01" y2="7" />
                                </svg>
                                Ofertas
                            </Link>
                            <div className="mobile-menu-divider" />
                            <Link to="/login" className="mobile-menu-link" onClick={closeMenu}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                    <polyline points="10 17 15 12 10 7" />
                                    <line x1="15" y1="12" x2="3" y2="12" />
                                </svg>
                                Iniciar Sesion
                            </Link>
                            <Link to="/registro" className="btn btn-primary mobile-menu-btn" onClick={closeMenu}>
                                Registrarse
                            </Link>
                        </>
                    ) : isPulperia() ? (
                        <>
                            <Link to="/dashboard" className="mobile-menu-link" onClick={closeMenu}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="3" width="7" height="9" />
                                    <rect x="14" y="3" width="7" height="5" />
                                    <rect x="14" y="12" width="7" height="9" />
                                    <rect x="3" y="16" width="7" height="5" />
                                </svg>
                                Dashboard
                            </Link>
                            <Link to="/catalogo" className="mobile-menu-link" onClick={closeMenu}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="3" width="7" height="7" />
                                    <rect x="14" y="3" width="7" height="7" />
                                    <rect x="14" y="14" width="7" height="7" />
                                    <rect x="3" y="14" width="7" height="7" />
                                </svg>
                                Catalogo
                            </Link>
                            <Link to="/pedidos" className="mobile-menu-link" onClick={closeMenu}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                Pedidos
                            </Link>
                            <Link to="/inventario" className="mobile-menu-link" onClick={closeMenu}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                </svg>
                                Inventario
                            </Link>
                            <Link to="/analytics" className="mobile-menu-link" onClick={closeMenu}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                    <polyline points="17 6 23 6 23 12" />
                                </svg>
                                Predicciones
                            </Link>
                            <div className="mobile-menu-divider" />
                            <Link to="/carrito" className="mobile-menu-link" onClick={closeMenu}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="9" cy="21" r="1" />
                                    <circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                </svg>
                                Carrito
                                {getItemCount() > 0 && (
                                    <span className="mobile-menu-badge">{getItemCount()}</span>
                                )}
                            </Link>
                            <button onClick={handleLogout} className="mobile-menu-link mobile-menu-logout">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                Cerrar Sesion
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/empresa/dashboard" className="mobile-menu-link" onClick={closeMenu}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="3" width="7" height="9" />
                                    <rect x="14" y="3" width="7" height="5" />
                                    <rect x="14" y="12" width="7" height="9" />
                                    <rect x="3" y="16" width="7" height="5" />
                                </svg>
                                Dashboard
                            </Link>
                            <Link to="/empresa/productos" className="mobile-menu-link" onClick={closeMenu}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                </svg>
                                Productos
                            </Link>
                            <Link to="/empresa/pedidos" className="mobile-menu-link" onClick={closeMenu}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                Pedidos
                            </Link>
                            <Link to="/empresa/ofertas" className="mobile-menu-link" onClick={closeMenu}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                    <line x1="7" y1="7" x2="7.01" y2="7" />
                                </svg>
                                Ofertas
                            </Link>
                            <div className="mobile-menu-divider" />
                            <button onClick={handleLogout} className="mobile-menu-link mobile-menu-logout">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                Cerrar Sesion
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
