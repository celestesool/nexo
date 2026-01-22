import { useState, useEffect } from 'react';
import { pedidosEjemplo, productos } from '../../data/mockData';
import { toggleBodyScroll } from '../../utils/modalUtils';
import './EmpresaOrders.css';

export default function EmpresaOrders() {
    const [filter, setFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        toggleBodyScroll(!!selectedOrder);
        return () => toggleBodyScroll(false);
    }, [selectedOrder]);

    const getProducto = (id) => productos.find(p => p.id === id);

    // Simulamos pedidos recibidos
    const receivedOrders = pedidosEjemplo.map(order => ({
        ...order,
        cliente: `Pulperia #${Math.floor(Math.random() * 100) + 1}`,
        clienteDir: 'Calle Los Pinos 123, Zona Este',
        ventanaEntrega: 'Lunes PM (14:00 - 18:00)'
    }));

    const filteredOrders = filter === 'all'
        ? receivedOrders
        : receivedOrders.filter(p => p.estado === filter);

    const getStatusLabel = (status) => {
        const labels = {
            'entregado': 'Entregado',
            'en_camino': 'En Camino',
            'procesando': 'Pendiente',
            'cancelado': 'Cancelado'
        };
        return labels[status] || status;
    };

    const handleUpdateStatus = (orderId, newStatus) => {
        console.log('Actualizando pedido', orderId, 'a estado', newStatus);
        setSelectedOrder(null);
    };

    return (
        <main className="empresa-orders-page">
            <div className="empresa-orders-container">
                <div className="empresa-orders-header animate-fade-in-up">
                    <div>
                        <h1 className="empresa-orders-title">Pedidos Recibidos</h1>
                        <p className="empresa-orders-subtitle">Gestiona los pedidos de tus clientes</p>
                    </div>
                    <div className="header-stats">
                        <div className="header-stat">
                            <span className="header-stat-value">{receivedOrders.filter(o => o.estado === 'procesando').length}</span>
                            <span className="header-stat-label">Pendientes</span>
                        </div>
                        <div className="header-stat">
                            <span className="header-stat-value">{receivedOrders.filter(o => o.estado === 'en_camino').length}</span>
                            <span className="header-stat-label">En Camino</span>
                        </div>
                    </div>
                </div>

                <div className="empresa-orders-filters animate-fade-in-up delay-100">
                    {['all', 'procesando', 'en_camino', 'entregado'].map(status => (
                        <button
                            key={status}
                            className={`filter-btn ${filter === status ? 'active' : ''}`}
                            onClick={() => setFilter(status)}
                        >
                            {status === 'all' ? 'Todos' : getStatusLabel(status)}
                            <span className="filter-count">
                                {status === 'all'
                                    ? receivedOrders.length
                                    : receivedOrders.filter(o => o.estado === status).length}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="empresa-orders-list">
                    {filteredOrders.map((order, index) => (
                        <div
                            key={order.id}
                            className={`empresa-order-card animate-fade-in-up ${order.estado === 'procesando' ? 'order-pending' : ''}`}
                            style={{ animationDelay: `${(index + 2) * 100}ms` }}
                        >
                            <div className="empresa-order-header">
                                <div className="empresa-order-info">
                                    <div className="empresa-order-avatar">
                                        {order.cliente.slice(-2)}
                                    </div>
                                    <div>
                                        <h3 className="empresa-order-id">{order.id}</h3>
                                        <span className="empresa-order-client">{order.cliente}</span>
                                    </div>
                                </div>
                                <div className={`order-status-badge status-${order.estado}`}>
                                    {getStatusLabel(order.estado)}
                                </div>
                            </div>

                            <div className="empresa-order-details">
                                <div className="order-detail">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                    <span>{order.fecha}</span>
                                </div>
                                <div className="order-detail">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                    <span>{order.ventanaEntrega}</span>
                                </div>
                                <div className="order-detail">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <span>{order.clienteDir}</span>
                                </div>
                            </div>

                            <div className="empresa-order-products">
                                {order.items.slice(0, 4).map(item => {
                                    const producto = getProducto(item.productoId);
                                    if (!producto) return null;
                                    return (
                                        <div key={item.productoId} className="mini-product">
                                            <img src={producto.imagen} alt={producto.nombre} />
                                            <span>{item.cantidad}x</span>
                                        </div>
                                    );
                                })}
                                {order.items.length > 4 && (
                                    <div className="mini-product-more">+{order.items.length - 4}</div>
                                )}
                            </div>

                            <div className="empresa-order-footer">
                                <div className="order-totals">
                                    <span className="order-items-count">{order.items.length} productos</span>
                                    <span className="order-total">Bs. {order.total.toFixed(2)}</span>
                                </div>
                                <div className="order-actions">
                                    {order.estado === 'procesando' && (
                                        <>
                                            <button
                                                className="btn btn-sm btn-secondary"
                                                onClick={() => setSelectedOrder(order)}
                                            >
                                                Ver Detalles
                                            </button>
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => handleUpdateStatus(order.id, 'en_camino')}
                                            >
                                                Procesar
                                            </button>
                                        </>
                                    )}
                                    {order.estado === 'en_camino' && (
                                        <>
                                            <button
                                                className="btn btn-sm btn-secondary"
                                                onClick={() => setSelectedOrder(order)}
                                            >
                                                Ver Detalles
                                            </button>
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => handleUpdateStatus(order.id, 'entregado')}
                                            >
                                                Marcar Entregado
                                            </button>
                                        </>
                                    )}
                                    {order.estado === 'entregado' && (
                                        <button
                                            className="btn btn-sm btn-secondary"
                                            onClick={() => setSelectedOrder(order)}
                                        >
                                            Ver Detalles
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredOrders.length === 0 && (
                    <div className="orders-empty animate-fade-in">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                        </svg>
                        <p>No hay pedidos con este filtro</p>
                    </div>
                )}
            </div>

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
                    <div className="modal empresa-order-modal animate-scale-in" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedOrder(null)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        <div className="modal-header-section">
                            <h2>{selectedOrder.id}</h2>
                            <div className={`order-status-badge status-${selectedOrder.estado}`}>
                                {getStatusLabel(selectedOrder.estado)}
                            </div>
                        </div>

                        <div className="modal-client-info">
                            <div className="client-avatar">{selectedOrder.cliente.slice(-2)}</div>
                            <div>
                                <span className="client-name">{selectedOrder.cliente}</span>
                                <span className="client-address">{selectedOrder.clienteDir}</span>
                            </div>
                        </div>

                        <div className="modal-delivery-info">
                            <div className="delivery-item">
                                <span className="delivery-label">Fecha del pedido</span>
                                <span className="delivery-value">{selectedOrder.fecha}</span>
                            </div>
                            <div className="delivery-item">
                                <span className="delivery-label">Ventana de entrega</span>
                                <span className="delivery-value">{selectedOrder.ventanaEntrega}</span>
                            </div>
                        </div>

                        <div className="modal-products-list">
                            <h3>Productos ({selectedOrder.items.length})</h3>
                            {selectedOrder.items.map(item => {
                                const producto = getProducto(item.productoId);
                                if (!producto) return null;
                                return (
                                    <div key={item.productoId} className="modal-product-item">
                                        <img src={producto.imagen} alt={producto.nombre} />
                                        <div className="modal-product-info">
                                            <span className="modal-product-name">{producto.nombre}</span>
                                            <span className="modal-product-qty">{item.cantidad} unidades x Bs. {item.precioUnitario.toFixed(2)}</span>
                                        </div>
                                        <span className="modal-product-total">Bs. {(item.cantidad * item.precioUnitario).toFixed(2)}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="modal-total-section">
                            <span>Total del pedido</span>
                            <span>Bs. {selectedOrder.total.toFixed(2)}</span>
                        </div>

                        {selectedOrder.estado === 'procesando' && (
                            <div className="modal-actions-section">
                                <button className="btn btn-secondary btn-lg" onClick={() => setSelectedOrder(null)}>
                                    Cancelar Pedido
                                </button>
                                <button className="btn btn-primary btn-lg" onClick={() => handleUpdateStatus(selectedOrder.id, 'en_camino')}>
                                    Iniciar Envio
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}
