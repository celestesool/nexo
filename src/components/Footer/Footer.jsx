import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <rect width="32" height="32" rx="8" fill="currentColor" />
                                <path d="M8 12L16 20L24 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 20L16 12L24 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Nexo</span>
                        </Link>
                        <p className="footer-description">
                            Conectando distribuidores y pulperias.
                            Simplificamos tu cadena de suministro.
                        </p>
                    </div>

                    <div className="footer-links">
                        <h4 className="footer-title">Plataforma</h4>
                        <ul>
                            <li><Link to="/catalogo">Catalogo</Link></li>
                            <li><Link to="/distribuidores">Distribuidores</Link></li>
                            <li><Link to="/ofertas">Ofertas</Link></li>
                            <li><Link to="/como-funciona">Como Funciona</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4 className="footer-title">Empresa</h4>
                        <ul>
                            <li><Link to="/nosotros">Sobre Nosotros</Link></li>
                            <li><Link to="/contacto">Contacto</Link></li>
                            <li><Link to="/soporte">Soporte</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4 className="footer-title">Legal</h4>
                        <ul>
                            <li><Link to="/terminos">Terminos de Uso</Link></li>
                            <li><Link to="/privacidad">Politica de Privacidad</Link></li>
                            <li><Link to="/garantias">Garantias</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>2026 Nexo. Todos los derechos reservados.</p>
                    <div className="footer-social">
                        <a href="#" className="footer-social-link" aria-label="Facebook">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                        </a>
                        <a href="#" className="footer-social-link" aria-label="Twitter">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                            </svg>
                        </a>
                        <a href="#" className="footer-social-link" aria-label="Instagram">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
