import { useState } from 'react';
import { Link } from 'react-router-dom';
import { pedidosEjemplo, productos, distribuidores } from '../../data/mockData';
import './Orders.css';

export default function Orders() {
    const [filter, setFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const getProducto = (id) => productos.find(p => p.id === id);
    const getDistribuidor = (id) => distribuidores.find(d => d.id === id);

    const filteredOrders = filter === 'all'
        ? pedidosEjemplo
        : pedidosEjemplo.filter(p => p.estado === filter);

    const getStatusLabel = (status) => {
        const labels = {
            'entregado': 'Entregado',
            'en_camino': 'En Camino',
            'procesando': 'Procesando',
            'cancelado': 'Cancelado'
        };
        return labels[status] || status;
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'entregado':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                );
            case 'en_camino':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="1" y="3" width="15" height="13" />
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                );
            case 'procesando':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <main className="orders-page">
            <div className="orders-container">
                <div className="orders-header animate-fade-in-up">
                    <div>
                        <h1 className="orders-title">Mis Pedidos</h1>
                        <p className="orders-subtitle">Historial y seguimiento de tus ordenes</p>
                    </div>
                    <Link to="/catalogo" className="btn btn-primary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Nuevo Pedido
                    </Link>
                </div>

                <div className="orders-filters animate-fade-in-up delay-100">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        Todos
                    </button>
                    <button
                        className={`filter-btn ${filter === 'procesando' ? 'active' : ''}`}
                        onClick={() => setFilter('procesando')}
                    >
                        Procesando
                    </button>
                    <button
                        className={`filter-btn ${filter === 'en_camino' ? 'active' : ''}`}
                        onClick={() => setFilter('en_camino')}
                    >
                        En Camino
                    </button>
                    <button
                        className={`filter-btn ${filter === 'entregado' ? 'active' : ''}`}
                        onClick={() => setFilter('entregado')}
                    >
                        Entregados
                    </button>
                </div>

                <div className="orders-list">
                    {filteredOrders.map((order, index) => {
                        const dist = getDistribuidor(order.distribuidorId);
                        return (
                            <div
                                key={order.id}
                                className="order-card animate-fade-in-up"
                                style={{ animationDelay: `${(index + 2) * 100}ms` }}
                            >
                                <div className="order-card-header">
                                    <div className="order-card-info">
                                        <img src={dist.logo} alt={dist.nombre} className="order-card-logo" />
                                        <div>
                                            <h3 className="order-card-id">{order.id}</h3>
                                            <span className="order-card-vendor">{dist.nombre}</span>
                                        </div>
                                    </div>
                                    <div className={`order-card-status status-${order.estado}`}>
                                        {getStatusIcon(order.estado)}
                                        <span>{getStatusLabel(order.estado)}</span>
                                    </div>
                                </div>

                                <div className="order-card-items">
                                    {order.items.slice(0, 3).map(item => {
                                        const producto = getProducto(item.productoId);
                                        if (!producto) return null;
                                        return (
                                            <div key={item.productoId} className="order-card-item">
                                                <img src={producto.imagen} alt={producto.nombre} />
                                                <span className="order-item-qty">{item.cantidad}x</span>
                                            </div>
                                        );
                                    })}
                                    {order.items.length > 3 && (
                                        <div className="order-card-more">
                                            +{order.items.length - 3}
                                        </div>
                                    )}
                                </div>

                                <div className="order-card-footer">
                                    <div className="order-card-date">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                        {order.fecha}
                                    </div>
                                    <span className="order-card-total">Bs. {order.total.toFixed(2)}</span>
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={() => setSelectedOrder(order)}
                                    >
                                        Ver Detalles
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredOrders.length === 0 && (
                    <div className="orders-empty animate-fade-in">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                        <h3>No hay pedidos</h3>
                        <p>No tienes pedidos con este filtro</p>
                    </div>
                )}
            </div>

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
                    <div className="modal order-modal animate-scale-in" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedOrder(null)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        <div className="order-modal-header">
                            <div className="order-modal-title">
                                <h2>{selectedOrder.id}</h2>
                                <div className={`order-card-status status-${selectedOrder.estado}`}>
                                    {getStatusIcon(selectedOrder.estado)}
                                    <span>{getStatusLabel(selectedOrder.estado)}</span>
                                </div>
                            </div>
                            <div className="order-modal-meta">
                                <span>Fecha: {selectedOrder.fecha}</span>
                                <span>Distribuidor: {getDistribuidor(selectedOrder.distribuidorId)?.nombre}</span>
                            </div>
                        </div>

                        <div className="order-modal-items">
                            <h3>Productos</h3>
                            {selectedOrder.items.map(item => {
                                const producto = getProducto(item.productoId);
                                if (!producto) return null;
                                return (
                                    <div key={item.productoId} className="order-modal-item">
                                        <img src={producto.imagen} alt={producto.nombre} />
                                        <div className="order-modal-item-info">
                                            <span className="order-modal-item-name">{producto.nombre}</span>
                                            <span className="order-modal-item-qty">{item.cantidad} unidades</span>
                                        </div>
                                        <span className="order-modal-item-price">
                                            Bs. {(item.precioUnitario * item.cantidad).toFixed(2)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="order-modal-summary">
                            <div className="order-modal-line">
                                <span>Subtotal</span>
                                <span>Bs. {selectedOrder.total.toFixed(2)}</span>
                            </div>
                            <div className="order-modal-line">
                                <span>Envio</span>
                                <span className="order-free">Gratis</span>
                            </div>
                            <div className="order-modal-total">
                                <span>Total</span>
                                <span>Bs. {selectedOrder.total.toFixed(2)}</span>
                            </div>
                        </div>

                        {selectedOrder.estado === 'procesando' && (
                            <button className="btn btn-secondary btn-lg order-modal-cancel">
                                Cancelar Pedido
                            </button>
                        )}

                        {selectedOrder.estado === 'entregado' && (
                            <button className="btn btn-primary btn-lg order-modal-repeat">
                                Repetir Pedido
                            </button>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}
