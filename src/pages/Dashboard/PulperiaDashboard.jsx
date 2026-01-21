import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { pedidosEjemplo, productos, distribuidores, estadisticasPulperia } from '../../data/mockData';
import './Dashboard.css';

export default function PulperiaDashboard() {
    const { user } = useAuth();

    const getProducto = (id) => productos.find(p => p.id === id);
    const getDistribuidor = (id) => distribuidores.find(d => d.id === id);

    const getStatusLabel = (status) => {
        const labels = {
            'entregado': 'Entregado',
            'en_camino': 'En Camino',
            'procesando': 'Procesando',
            'cancelado': 'Cancelado'
        };
        return labels[status] || status;
    };

    return (
        <main className="dashboard-page">
            <div className="dashboard-container">
                {/* Header */}
                <div className="dashboard-header animate-fade-in-up">
                    <div className="dashboard-welcome">
                        <h1 className="dashboard-title">Bienvenido, {user?.propietario || user?.nombre}</h1>
                        <p className="dashboard-subtitle">Aqui tienes un resumen de tu actividad</p>
                    </div>
                    <Link to="/catalogo" className="btn btn-primary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Nuevo Pedido
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="dashboard-stats animate-fade-in-up delay-100">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="1" x2="12" y2="23" />
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">Bs. {estadisticasPulperia.gastosMes.toFixed(2)}</span>
                            <span className="stat-label">Gastos este mes</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{estadisticasPulperia.pedidosMes}</span>
                            <span className="stat-label">Pedidos este mes</span>
                        </div>
                    </div>

                    <div className="stat-card stat-card-highlight">
                        <div className="stat-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                <polyline points="17 6 23 6 23 12" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">Bs. {estadisticasPulperia.ahorroMes.toFixed(2)}</span>
                            <span className="stat-label">Ahorro este mes</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{estadisticasPulperia.ultimoPedido}</span>
                            <span className="stat-label">Ultimo pedido</span>
                        </div>
                    </div>
                </div>

                <div className="dashboard-grid">
                    {/* Recent Orders */}
                    <div className="dashboard-section animate-fade-in-up delay-200">
                        <div className="section-header">
                            <h2 className="section-title">Pedidos Recientes</h2>
                            <Link to="/pedidos" className="section-link">Ver todos</Link>
                        </div>
                        <div className="orders-list">
                            {pedidosEjemplo.map(pedido => {
                                const dist = getDistribuidor(pedido.distribuidorId);
                                return (
                                    <div key={pedido.id} className="order-item">
                                        <div className="order-info">
                                            <img src={dist.logo} alt={dist.nombre} className="order-vendor-logo" />
                                            <div>
                                                <span className="order-id">{pedido.id}</span>
                                                <span className="order-vendor">{dist.nombre}</span>
                                            </div>
                                        </div>
                                        <div className="order-meta">
                                            <span className="order-date">{pedido.fecha}</span>
                                            <span className={`order-status status-${pedido.estado}`}>
                                                {getStatusLabel(pedido.estado)}
                                            </span>
                                        </div>
                                        <span className="order-total">Bs. {pedido.total.toFixed(2)}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Reorder */}
                    <div className="dashboard-section animate-fade-in-up delay-300">
                        <div className="section-header">
                            <h2 className="section-title">Productos Frecuentes</h2>
                            <Link to="/catalogo" className="section-link">Ver catalogo</Link>
                        </div>
                        <div className="quick-products">
                            {estadisticasPulperia.productosFrecuentes.slice(0, 4).map(item => {
                                const producto = getProducto(item.productoId);
                                if (!producto) return null;
                                return (
                                    <div key={item.productoId} className="quick-product">
                                        <img src={producto.imagen} alt={producto.nombre} className="quick-product-image" />
                                        <div className="quick-product-info">
                                            <span className="quick-product-name">{producto.nombre}</span>
                                            <span className="quick-product-count">{item.cantidad} pedidos</span>
                                        </div>
                                        <Link to="/catalogo" className="btn btn-sm btn-secondary">
                                            Pedir
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="quick-action-card">
                            <div className="quick-action-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="1 4 1 10 7 10" />
                                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                                </svg>
                            </div>
                            <div className="quick-action-content">
                                <h4>Repetir ultimo pedido</h4>
                                <p>Repone tu inventario en segundos</p>
                            </div>
                            <button className="btn btn-primary">Repetir</button>
                        </div>
                    </div>
                </div>

                {/* Offers Section */}
                <div className="dashboard-section full-width animate-fade-in-up delay-400">
                    <div className="section-header">
                        <h2 className="section-title">Ofertas Disponibles</h2>
                        <Link to="/ofertas" className="section-link">Ver todas</Link>
                    </div>
                    <div className="offers-grid">
                        <div className="offer-card">
                            <div className="offer-badge">-15%</div>
                            <div className="offer-content">
                                <h4 className="offer-title">Coca-Cola 2L</h4>
                                <p className="offer-description">Promocion de temporada</p>
                                <span className="offer-vendor">Bebidas Express</span>
                            </div>
                            <div className="offer-price">
                                <span className="offer-price-old">Bs. 12.50</span>
                                <span className="offer-price-new">Bs. 10.63</span>
                            </div>
                        </div>

                        <div className="offer-card">
                            <div className="offer-badge">-10%</div>
                            <div className="offer-content">
                                <h4 className="offer-title">Leche Entera 1L</h4>
                                <p className="offer-description">Lote proximo a vencer</p>
                                <span className="offer-vendor">Alimentos del Sur</span>
                            </div>
                            <div className="offer-price">
                                <span className="offer-price-old">Bs. 8.20</span>
                                <span className="offer-price-new">Bs. 7.38</span>
                            </div>
                        </div>

                        <div className="offer-card">
                            <div className="offer-badge">-20%</div>
                            <div className="offer-content">
                                <h4 className="offer-title">Arroz Premium 1kg</h4>
                                <p className="offer-description">Liquidacion de inventario</p>
                                <span className="offer-vendor">Productos Basicos</span>
                            </div>
                            <div className="offer-price">
                                <span className="offer-price-old">Bs. 9.00</span>
                                <span className="offer-price-new">Bs. 7.20</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
