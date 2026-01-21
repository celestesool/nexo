import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Header.css';

export default function Header() {
    const { user, isAuthenticated, logout, isPulperia, isDistribuidor } = useAuth();
    const { getItemCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
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

                <nav className="header-nav">
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

                <button className="header-menu-btn hide-desktop">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
