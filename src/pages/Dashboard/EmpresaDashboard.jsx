import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { pedidosEjemplo, productos, estadisticasEmpresa } from '../../data/mockData';
import './Dashboard.css';

export default function EmpresaDashboard() {
    const { user } = useAuth();

    const getProducto = (id) => productos.find(p => p.id === id);

    const pendingOrders = pedidosEjemplo.filter(p => p.estado === 'procesando');

    // Calcular el max para el grafico
    const maxVenta = Math.max(...estadisticasEmpresa.ventasMensuales.map(v => v.ventas));

    return (
        <main className="dashboard-page">
            <div className="dashboard-container">
                {/* Header */}
                <div className="dashboard-header animate-fade-in-up">
                    <div className="dashboard-welcome">
                        <h1 className="dashboard-title">Panel de Control</h1>
                        <p className="dashboard-subtitle">{user?.nombre || 'Distribuidora'}</p>
                    </div>
                    <div className="dashboard-actions">
                        <Link to="/empresa/productos" className="btn btn-secondary">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            </svg>
                            Productos
                        </Link>
                        <Link to="/empresa/ofertas" className="btn btn-primary">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Nueva Oferta
                        </Link>
                    </div>
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
                            <span className="stat-value">Bs. {estadisticasEmpresa.ventasHoy.toFixed(2)}</span>
                            <span className="stat-label">Ventas hoy</span>
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
                            <span className="stat-value">{estadisticasEmpresa.pedidosHoy}</span>
                            <span className="stat-label">Pedidos hoy</span>
                        </div>
                    </div>

                    <div className="stat-card stat-card-warning">
                        <div className="stat-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{estadisticasEmpresa.pedidosPendientes}</span>
                            <span className="stat-label">Pendientes</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{estadisticasEmpresa.clientesActivos}</span>
                            <span className="stat-label">Clientes activos</span>
                        </div>
                    </div>
                </div>

                <div className="dashboard-grid">
                    {/* Pending Orders */}
                    <div className="dashboard-section animate-fade-in-up delay-200">
                        <div className="section-header">
                            <h2 className="section-title">Pedidos Pendientes</h2>
                            <Link to="/empresa/pedidos" className="section-link">Ver todos</Link>
                        </div>
                        {pendingOrders.length > 0 ? (
                            <div className="orders-list">
                                {pendingOrders.map(pedido => (
                                    <div key={pedido.id} className="order-item order-item-empresa">
                                        <div className="order-info">
                                            <div className="order-avatar">CL</div>
                                            <div>
                                                <span className="order-id">{pedido.id}</span>
                                                <span className="order-vendor">Cliente #{pedido.id.slice(-3)}</span>
                                            </div>
                                        </div>
                                        <div className="order-items-count">
                                            {pedido.items.length} productos
                                        </div>
                                        <span className="order-total">Bs. {pedido.total.toFixed(2)}</span>
                                        <div className="order-actions">
                                            <button className="btn btn-sm btn-primary">Procesar</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <p>No hay pedidos pendientes</p>
                            </div>
                        )}
                    </div>

                    {/* Top Products */}
                    <div className="dashboard-section animate-fade-in-up delay-300">
                        <div className="section-header">
                            <h2 className="section-title">Productos Mas Vendidos</h2>
                            <Link to="/empresa/productos" className="section-link">Ver todos</Link>
                        </div>
                        <div className="top-products">
                            {estadisticasEmpresa.productosMasVendidos.slice(0, 5).map((item, index) => {
                                const producto = getProducto(item.productoId);
                                if (!producto) return null;
                                return (
                                    <div key={item.productoId} className="top-product">
                                        <span className="top-product-rank">{index + 1}</span>
                                        <img src={producto.imagen} alt={producto.nombre} className="top-product-image" />
                                        <div className="top-product-info">
                                            <span className="top-product-name">{producto.nombre}</span>
                                            <span className="top-product-category">{producto.categoria}</span>
                                        </div>
                                        <span className="top-product-sales">{item.cantidad} und.</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Sales Chart - IMPROVED */}
                <div className="dashboard-section full-width animate-fade-in-up delay-400">
                    <div className="section-header">
                        <h2 className="section-title">Ventas Mensuales</h2>
                        <div className="chart-legend">
                            <span className="chart-legend-item">
                                <span className="chart-legend-dot"></span>
                                Ventas (Bs.)
                            </span>
                        </div>
                    </div>

                    <div className="chart-wrapper">
                        {/* Y-axis labels */}
                        <div className="chart-y-axis">
                            <span>Bs. {(maxVenta / 1000).toFixed(0)}k</span>
                            <span>Bs. {(maxVenta / 2000).toFixed(0)}k</span>
                            <span>Bs. 0</span>
                        </div>

                        {/* Chart area */}
                        <div className="chart-area">
                            {/* Grid lines */}
                            <div className="chart-grid">
                                <div className="chart-grid-line"></div>
                                <div className="chart-grid-line"></div>
                                <div className="chart-grid-line"></div>
                            </div>

                            {/* Bars */}
                            <div className="chart-bars-modern">
                                {estadisticasEmpresa.ventasMensuales.map((item, index) => {
                                    const height = (item.ventas / maxVenta) * 100;
                                    return (
                                        <div key={index} className="chart-bar-item">
                                            <div className="chart-bar-container">
                                                <div
                                                    className="chart-bar-fill"
                                                    style={{ height: `${height}%` }}
                                                >
                                                    <span className="chart-bar-tooltip">
                                                        Bs. {item.ventas.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="chart-bar-month">{item.mes}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="quick-actions-grid animate-fade-in-up delay-500">
                    <Link to="/empresa/productos" className="quick-link-card">
                        <div className="quick-link-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            </svg>
                        </div>
                        <h4>Gestionar Productos</h4>
                        <p>Actualiza precios y stock</p>
                    </Link>

                    <Link to="/empresa/ofertas" className="quick-link-card">
                        <div className="quick-link-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                <line x1="7" y1="7" x2="7.01" y2="7" />
                            </svg>
                        </div>
                        <h4>Crear Ofertas</h4>
                        <p>Promociones y descuentos</p>
                    </Link>

                    <Link to="/empresa/clientes" className="quick-link-card">
                        <div className="quick-link-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h4>Clientes</h4>
                        <p>Gestiona tus clientes</p>
                    </Link>

                    <Link to="/empresa/reportes" className="quick-link-card">
                        <div className="quick-link-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                <polyline points="17 6 23 6 23 12" />
                            </svg>
                        </div>
                        <h4>Reportes</h4>
                        <p>Estadisticas y analisis</p>
                    </Link>
                </div>
            </div>
        </main>
    );
}
