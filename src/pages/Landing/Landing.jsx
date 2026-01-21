import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
    return (
        <main className="landing">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-container">
                    <div className="hero-content animate-fade-in-up">
                        <span className="hero-badge">Plataforma B2B</span>
                        <h1 className="hero-title">
                            Conecta tu negocio con los mejores
                            <span className="hero-title-accent"> distribuidores</span>
                        </h1>
                        <p className="hero-description">
                            Gestiona tu inventario, compara precios en tiempo real y realiza
                            pedidos 24/7. Simplifica tu cadena de suministro con Nexo.
                        </p>
                        <div className="hero-actions">
                            <Link to="/registro" className="btn btn-primary btn-lg">
                                Comenzar Ahora
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </Link>
                            <Link to="/catalogo" className="btn btn-secondary btn-lg">
                                Ver Catalogo
                            </Link>
                        </div>
                        <div className="hero-stats">
                            <div className="hero-stat">
                                <span className="hero-stat-value">150+</span>
                                <span className="hero-stat-label">Distribuidores</span>
                            </div>
                            <div className="hero-stat">
                                <span className="hero-stat-value">2,500+</span>
                                <span className="hero-stat-label">Productos</span>
                            </div>
                            <div className="hero-stat">
                                <span className="hero-stat-value">500+</span>
                                <span className="hero-stat-label">Pulperias Activas</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-visual animate-fade-in delay-300">
                        <div className="hero-card hero-card-1">
                            <div className="hero-card-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                            </div>
                            <span>Pedido confirmado</span>
                            <span className="hero-card-detail">12 productos</span>
                        </div>
                        <div className="hero-card hero-card-2">
                            <div className="hero-card-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="12" y1="1" x2="12" y2="23" />
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                            </div>
                            <span>Ahorro del mes</span>
                            <span className="hero-card-detail">Bs. 320.50</span>
                        </div>
                        <div className="hero-card hero-card-3">
                            <div className="hero-card-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                    <polyline points="17 6 23 6 23 12" />
                                </svg>
                            </div>
                            <span>Ventas +15%</span>
                            <span className="hero-card-detail">vs mes anterior</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="features-container">
                    <div className="features-header animate-fade-in-up">
                        <span className="features-badge">Caracteristicas</span>
                        <h2 className="features-title">Todo lo que necesitas en un solo lugar</h2>
                        <p className="features-description">
                            Herramientas poderosas para optimizar tu negocio
                        </p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card animate-fade-in-up delay-100">
                            <div className="feature-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Comparacion de Precios</h3>
                            <p className="feature-description">
                                Encuentra el mejor precio entre todos los distribuidores
                                disponibles en tiempo real.
                            </p>
                        </div>

                        <div className="feature-card animate-fade-in-up delay-200">
                            <div className="feature-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="1" y="3" width="15" height="13" />
                                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                                    <circle cx="5.5" cy="18.5" r="2.5" />
                                    <circle cx="18.5" cy="18.5" r="2.5" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Pedidos 24/7</h3>
                            <p className="feature-description">
                                Realiza pedidos en cualquier momento y programa
                                la entrega segun tu conveniencia.
                            </p>
                        </div>

                        <div className="feature-card animate-fade-in-up delay-300">
                            <div className="feature-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                    <line x1="12" y1="22.08" x2="12" y2="12" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Gestion de Inventario</h3>
                            <p className="feature-description">
                                Visualiza tu stock en tiempo real y recibe alertas
                                cuando necesites reabastecer.
                            </p>
                        </div>

                        <div className="feature-card animate-fade-in-up delay-400">
                            <div className="feature-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                    <polyline points="17 6 23 6 23 12" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Estadisticas Predictivas</h3>
                            <p className="feature-description">
                                Anticipa la demanda con predicciones basadas
                                en tu historial de ventas.
                            </p>
                        </div>

                        <div className="feature-card animate-fade-in-up delay-500">
                            <div className="feature-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                    <line x1="7" y1="7" x2="7.01" y2="7" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Ofertas Exclusivas</h3>
                            <p className="feature-description">
                                Accede a promociones directas de distribuidores
                                y aprovecha los mejores precios.
                            </p>
                        </div>

                        <div className="feature-card animate-fade-in-up delay-500">
                            <div className="feature-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Historial de Pedidos</h3>
                            <p className="feature-description">
                                Repite pedidos anteriores con un solo clic
                                y ahorra tiempo valioso.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="cta-container">
                    <div className="cta-content animate-fade-in-up">
                        <h2 className="cta-title">Comienza hoy mismo</h2>
                        <p className="cta-description">
                            Unete a cientos de negocios que ya optimizan su cadena de suministro con Nexo
                        </p>
                        <div className="cta-buttons">
                            <Link to="/registro?tipo=pulperia" className="btn btn-primary btn-lg">
                                Soy Pulpero
                            </Link>
                            <Link to="/registro?tipo=distribuidor" className="btn btn-secondary btn-lg">
                                Soy Distribuidor
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="how-it-works">
                <div className="how-container">
                    <div className="how-header animate-fade-in-up">
                        <span className="how-badge">Proceso Simple</span>
                        <h2 className="how-title">Como funciona Nexo</h2>
                    </div>

                    <div className="how-steps">
                        <div className="how-step animate-fade-in-up delay-100">
                            <div className="how-step-number">01</div>
                            <h3 className="how-step-title">Registrate</h3>
                            <p className="how-step-description">
                                Crea tu cuenta como pulperia o distribuidor en menos de 5 minutos
                            </p>
                        </div>
                        <div className="how-step-line"></div>
                        <div className="how-step animate-fade-in-up delay-200">
                            <div className="how-step-number">02</div>
                            <h3 className="how-step-title">Explora</h3>
                            <p className="how-step-description">
                                Navega el catalogo, compara precios y encuentra las mejores ofertas
                            </p>
                        </div>
                        <div className="how-step-line"></div>
                        <div className="how-step animate-fade-in-up delay-300">
                            <div className="how-step-number">03</div>
                            <h3 className="how-step-title">Ordena</h3>
                            <p className="how-step-description">
                                Agrega productos al carrito y programa tu entrega cuando lo necesites
                            </p>
                        </div>
                        <div className="how-step-line"></div>
                        <div className="how-step animate-fade-in-up delay-400">
                            <div className="how-step-number">04</div>
                            <h3 className="how-step-title">Recibe</h3>
                            <p className="how-step-description">
                                El distribuidor te entregara tu pedido en la ventana de tiempo elegida
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
