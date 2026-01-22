import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
    return (
        <div className="not-found-page">
            <div className="not-found-container">
                {/* Animated Background Elements */}
                <div className="not-found-bg-elements">
                    <div className="floating-shape shape-1"></div>
                    <div className="floating-shape shape-2"></div>
                    <div className="floating-shape shape-3"></div>
                    <div className="floating-shape shape-4"></div>
                </div>

                {/* Main Content */}
                <div className="not-found-content animate-fade-in-up">
                    {/* 404 Number with Glitch Effect */}
                    <div className="not-found-number">
                        <span className="number-digit" data-text="4">4</span>
                        <span className="number-zero">
                            <svg viewBox="0 0 100 100" className="zero-svg">
                                <circle cx="50" cy="50" r="45" className="zero-circle" />
                                <circle cx="50" cy="50" r="25" className="zero-inner" />
                            </svg>
                        </span>
                        <span className="number-digit" data-text="4">4</span>
                    </div>

                    {/* Message */}
                    <h1 className="not-found-title">Página no encontrada</h1>
                    <p className="not-found-description">
                        Lo sentimos, la página que buscas no existe o ha sido movida.
                        Puede que el enlace esté incorrecto o la página haya sido eliminada.
                    </p>

                    {/* Search Box */}
                    <div className="not-found-search">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Buscar productos, distribuidores..."
                            className="not-found-search-input"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="not-found-actions">
                        <Link to="/" className="btn btn-primary btn-lg">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                            Volver al Inicio
                        </Link>
                        <Link to="/catalogo" className="btn btn-secondary btn-lg">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                            Ver Catálogo
                        </Link>
                    </div>

                    {/* Quick Links */}
                    <div className="not-found-quick-links">
                        <p className="quick-links-title">Enlaces rápidos:</p>
                        <div className="quick-links-list">
                            <Link to="/ofertas" className="quick-link">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                    <line x1="7" y1="7" x2="7.01" y2="7" />
                                </svg>
                                Ofertas
                            </Link>
                            <Link to="/login" className="quick-link">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                    <polyline points="10 17 15 12 10 7" />
                                    <line x1="15" y1="12" x2="3" y2="12" />
                                </svg>
                                Iniciar Sesión
                            </Link>
                            <Link to="/registro" className="quick-link">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <line x1="20" y1="8" x2="20" y2="14" />
                                    <line x1="23" y1="11" x2="17" y2="11" />
                                </svg>
                                Registrarse
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decorative Illustration */}
                <div className="not-found-illustration">
                    <svg viewBox="0 0 400 300" className="illustration-svg">
                        {/* Box/Package */}
                        <g className="box-group">
                            <path d="M200 80 L280 120 L280 200 L200 240 L120 200 L120 120 Z" fill="var(--color-gray-100)" stroke="var(--color-black)" strokeWidth="2" />
                            <path d="M200 80 L200 160 L280 120" fill="var(--color-gray-200)" stroke="var(--color-black)" strokeWidth="2" />
                            <path d="M200 160 L200 240" stroke="var(--color-black)" strokeWidth="2" />
                            <path d="M200 160 L120 120" stroke="var(--color-black)" strokeWidth="2" />
                            {/* Question Mark */}
                            <text x="200" y="180" textAnchor="middle" fontSize="60" fontWeight="bold" fill="var(--color-gray-400)">?</text>
                        </g>
                        {/* Search circles */}
                        <circle cx="320" cy="100" r="30" fill="none" stroke="var(--color-gray-300)" strokeWidth="3" strokeDasharray="5,5" className="search-circle" />
                        <circle cx="80" cy="220" r="20" fill="none" stroke="var(--color-gray-300)" strokeWidth="3" strokeDasharray="5,5" className="search-circle delay" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
