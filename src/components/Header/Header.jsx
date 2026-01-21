import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Header.css';

export default function Header() {
    const { user, isAuthenticated, logout, isPulperia } = useAuth();
    const { getItemCount } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    // Cerrar menu cuando cambia la ruta
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    // Bloquear scroll cuando menu esta abierto
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    const handleLogout = () => {
        logout();
        navigate('/');
        setMenuOpen(false);
    };

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    const navLinks = !isAuthenticated() ? [
        { to: '/catalogo', label: 'Catalogo' },
        { to: '/ofertas', label: 'Ofertas' },
        { to: '/login', label: 'Iniciar Sesion' },
    ] : isPulperia() ? [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/catalogo', label: 'Catalogo' },
        { to: '/pedidos', label: 'Pedidos' },
        { to: '/inventario', label: 'Inventario' },
        { to: '/analytics', label: 'Predicciones' },
        { to: '/carrito', label: 'Carrito', badge: getItemCount() },
    ] : [
        { to: '/empresa/dashboard', label: 'Dashboard' },
        { to: '/empresa/productos', label: 'Productos' },
        { to: '/empresa/pedidos', label: 'Pedidos' },
        { to: '/empresa/ofertas', label: 'Ofertas' },
    ];

    return (
        <>
            <header className="header">
                <div className="header-container">
                    <Link to="/" className="header-logo">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <rect width="32" height="32" rx="8" fill="currentColor" />
                            <path d="M8 12L16 20L24 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 20L16 12L24 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="header-logo-text">Nexo</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="desktop-nav">
                        {navLinks.map(link => (
                            <Link key={link.to} to={link.to} className="nav-link">
                                {link.label}
                                {link.badge > 0 && <span className="nav-badge">{link.badge}</span>}
                            </Link>
                        ))}
                        {!isAuthenticated() && (
                            <Link to="/registro" className="btn btn-primary btn-sm">Registrarse</Link>
                        )}
                        {isAuthenticated() && (
                            <button onClick={handleLogout} className="nav-link">Salir</button>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button className="menu-toggle" onClick={toggleMenu} aria-label="Menu">
                        <span className={`hamburger ${menuOpen ? 'open' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </button>
                </div>
            </header>

            {/* Mobile Menu - Fuera del header */}
            <div className={`mobile-overlay ${menuOpen ? 'active' : ''}`} onClick={closeMenu}></div>

            <nav className={`mobile-nav ${menuOpen ? 'active' : ''}`}>
                <div className="mobile-nav-header">
                    <span>Menu</span>
                    <button className="mobile-close" onClick={closeMenu}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className="mobile-nav-links">
                    {navLinks.map(link => (
                        <Link key={link.to} to={link.to} className="mobile-link" onClick={closeMenu}>
                            {link.label}
                            {link.badge > 0 && <span className="mobile-badge">{link.badge}</span>}
                        </Link>
                    ))}

                    {!isAuthenticated() && (
                        <Link to="/registro" className="mobile-link mobile-link-primary" onClick={closeMenu}>
                            Registrarse
                        </Link>
                    )}

                    {isAuthenticated() && (
                        <button onClick={handleLogout} className="mobile-link mobile-link-logout">
                            Cerrar Sesion
                        </button>
                    )}
                </div>
            </nav>
        </>
    );
}
