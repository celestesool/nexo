import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useNotifications } from '../../context/NotificationsContext';
import './Header.css';

export default function Header() {
    const { user, isAuthenticated, logout, isPulperia } = useAuth();
    const { getItemCount } = useCart();
    const { getFavoritesCount } = useFavorites();
    const {
        notifications,
        showNotifications,
        toggleNotifications,
        closeNotifications,
        markAsRead,
        markAllAsRead,
        getUnreadCount,
        formatTimeAgo
    } = useNotifications();

    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const notificationRef = useRef(null);
    const userMenuRef = useRef(null);

    // Cerrar menu cuando cambia la ruta
    useEffect(() => {
        setMenuOpen(false);
        closeNotifications();
        setUserMenuOpen(false);
    }, [location.pathname]);

    // Click outside para cerrar dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                closeNotifications();
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
    ] : isPulperia() ? [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/catalogo', label: 'Catalogo' },
        { to: '/pedidos', label: 'Pedidos' },
        { to: '/inventario', label: 'Inventario' },
        { to: '/analytics', label: 'Predicciones' },
    ] : [
        { to: '/empresa/dashboard', label: 'Dashboard' },
        { to: '/empresa/productos', label: 'Productos' },
        { to: '/empresa/pedidos', label: 'Pedidos' },
        { to: '/empresa/ofertas', label: 'Ofertas' },
    ];

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'order':
                return (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    </svg>
                );
            case 'offer':
                return (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                        <line x1="7" y1="7" x2="7.01" y2="7" />
                    </svg>
                );
            case 'payment':
                return (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                        <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                );
            case 'stock':
                return (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                );
            default:
                return (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                );
        }
    };

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
                            </Link>
                        ))}
                    </nav>

                    {/* Action Buttons */}
                    <div className="header-actions">
                        {isAuthenticated() && (
                            <>
                                {/* Favoritos */}
                                <Link to="/favoritos" className="header-action-btn" title="Favoritos">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                    </svg>
                                    {getFavoritesCount() > 0 && (
                                        <span className="action-badge">{getFavoritesCount()}</span>
                                    )}
                                </Link>

                                {/* Carrito (solo para pulperías) */}
                                {isPulperia() && (
                                    <Link to="/carrito" className="header-action-btn" title="Carrito">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="9" cy="21" r="1" />
                                            <circle cx="20" cy="21" r="1" />
                                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                        </svg>
                                        {getItemCount() > 0 && (
                                            <span className="action-badge">{getItemCount()}</span>
                                        )}
                                    </Link>
                                )}

                                {/* Notificaciones */}
                                <div className="notification-wrapper" ref={notificationRef}>
                                    <button
                                        className="header-action-btn"
                                        onClick={toggleNotifications}
                                        title="Notificaciones"
                                    >
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                        </svg>
                                        {getUnreadCount() > 0 && (
                                            <span className="action-badge pulse">{getUnreadCount()}</span>
                                        )}
                                    </button>

                                    {/* Panel de Notificaciones */}
                                    {showNotifications && (
                                        <div className="notification-panel animate-fade-in-down">
                                            <div className="notification-header">
                                                <h3>Notificaciones</h3>
                                                {getUnreadCount() > 0 && (
                                                    <button className="mark-all-read" onClick={markAllAsRead}>
                                                        Marcar todo como leído
                                                    </button>
                                                )}
                                            </div>
                                            <div className="notification-list">
                                                {notifications.length === 0 ? (
                                                    <div className="notification-empty">
                                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                                        </svg>
                                                        <p>No tienes notificaciones</p>
                                                    </div>
                                                ) : (
                                                    notifications.slice(0, 5).map(notification => (
                                                        <div
                                                            key={notification.id}
                                                            className={`notification-item ${!notification.read ? 'unread' : ''}`}
                                                            onClick={() => markAsRead(notification.id)}
                                                        >
                                                            <div className={`notification-icon ${notification.type}`}>
                                                                {getNotificationIcon(notification.type)}
                                                            </div>
                                                            <div className="notification-content">
                                                                <h4>{notification.title}</h4>
                                                                <p>{notification.message}</p>
                                                                <span className="notification-time">
                                                                    {formatTimeAgo(notification.createdAt)}
                                                                </span>
                                                            </div>
                                                            {!notification.read && (
                                                                <span className="unread-dot"></span>
                                                            )}
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                            {notifications.length > 5 && (
                                                <Link to="/notificaciones" className="notification-footer" onClick={closeNotifications}>
                                                    Ver todas las notificaciones
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* User Menu */}
                                <div className="user-menu-wrapper" ref={userMenuRef}>
                                    <button
                                        className="user-avatar-btn"
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    >
                                        {user?.avatar ? (
                                            <img src={user.avatar} alt={user.nombre} />
                                        ) : (
                                            <span>{user?.nombre?.charAt(0) || 'U'}</span>
                                        )}
                                    </button>

                                    {userMenuOpen && (
                                        <div className="user-menu animate-fade-in-down">
                                            <div className="user-menu-header">
                                                <div className="user-menu-avatar">
                                                    {user?.avatar ? (
                                                        <img src={user.avatar} alt={user.nombre} />
                                                    ) : (
                                                        <span>{user?.nombre?.charAt(0) || 'U'}</span>
                                                    )}
                                                </div>
                                                <div className="user-menu-info">
                                                    <span className="user-name">{user?.nombre}</span>
                                                    <span className="user-email">{user?.email}</span>
                                                </div>
                                            </div>
                                            <div className="user-menu-divider"></div>
                                            <Link to="/perfil" className="user-menu-item" onClick={() => setUserMenuOpen(false)}>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                    <circle cx="12" cy="7" r="4" />
                                                </svg>
                                                Mi Perfil
                                            </Link>
                                            <Link to="/favoritos" className="user-menu-item" onClick={() => setUserMenuOpen(false)}>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                                </svg>
                                                Mis Favoritos
                                            </Link>
                                            {isPulperia() && (
                                                <Link to="/historial-pagos" className="user-menu-item" onClick={() => setUserMenuOpen(false)}>
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                                                        <line x1="1" y1="10" x2="23" y2="10" />
                                                    </svg>
                                                    Historial de Pagos
                                                </Link>
                                            )}
                                            <div className="user-menu-divider"></div>
                                            <button className="user-menu-item logout" onClick={handleLogout}>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                                    <polyline points="16 17 21 12 16 7" />
                                                    <line x1="21" y1="12" x2="9" y2="12" />
                                                </svg>
                                                Cerrar Sesión
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {!isAuthenticated() && (
                            <div className="auth-buttons">
                                <Link to="/login" className="btn btn-ghost btn-sm">Iniciar Sesión</Link>
                                <Link to="/registro" className="btn btn-primary btn-sm">Registrarse</Link>
                            </div>
                        )}
                    </div>

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

                {isAuthenticated() && (
                    <div className="mobile-user-section">
                        <div className="mobile-user-avatar">
                            {user?.avatar ? (
                                <img src={user.avatar} alt={user.nombre} />
                            ) : (
                                <span>{user?.nombre?.charAt(0) || 'U'}</span>
                            )}
                        </div>
                        <div className="mobile-user-info">
                            <span className="mobile-user-name">{user?.nombre}</span>
                            <span className="mobile-user-type">
                                {user?.tipo === 'pulperia' ? 'Pulpería' : 'Distribuidor'}
                            </span>
                        </div>
                    </div>
                )}

                <div className="mobile-nav-links">
                    {navLinks.map(link => (
                        <Link key={link.to} to={link.to} className="mobile-link" onClick={closeMenu}>
                            {link.label}
                        </Link>
                    ))}

                    {isAuthenticated() && (
                        <>
                            <div className="mobile-divider"></div>
                            <Link to="/favoritos" className="mobile-link" onClick={closeMenu}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                                Favoritos
                                {getFavoritesCount() > 0 && <span className="mobile-badge">{getFavoritesCount()}</span>}
                            </Link>
                            {isPulperia() && (
                                <Link to="/carrito" className="mobile-link" onClick={closeMenu}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="9" cy="21" r="1" />
                                        <circle cx="20" cy="21" r="1" />
                                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                    </svg>
                                    Carrito
                                    {getItemCount() > 0 && <span className="mobile-badge">{getItemCount()}</span>}
                                </Link>
                            )}
                            <Link to="/perfil" className="mobile-link" onClick={closeMenu}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                Mi Perfil
                            </Link>
                            <div className="mobile-divider"></div>
                            <button onClick={handleLogout} className="mobile-link mobile-link-logout">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                Cerrar Sesión
                            </button>
                        </>
                    )}

                    {!isAuthenticated() && (
                        <>
                            <Link to="/login" className="mobile-link" onClick={closeMenu}>
                                Iniciar Sesión
                            </Link>
                            <Link to="/registro" className="mobile-link mobile-link-primary" onClick={closeMenu}>
                                Registrarse
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
}
