import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { distribuidores, ventanasTiempo } from '../../data/mockData';
import './Cart.css';

export default function Cart() {
    const { items, updateQuantity, removeItem, getTotal, clearCart, getItemsByDistributor } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [selectedSlots, setSelectedSlots] = useState({});
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [orderConfirmed, setOrderConfirmed] = useState(false);

    const getDistributor = (id) => {
        return distribuidores.find(d => d.id === id);
    };

    const itemsByDistributor = getItemsByDistributor();

    const handleSlotSelect = (distribuidorId, slotId) => {
        setSelectedSlots({ ...selectedSlots, [distribuidorId]: slotId });
    };

    const handleCheckout = async () => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }

        const unselectedDistributors = Object.keys(itemsByDistributor).filter(
            distId => !selectedSlots[distId]
        );

        if (unselectedDistributors.length > 0) {
            alert('Por favor selecciona una ventana de entrega para cada distribuidor');
            return;
        }

        setIsCheckingOut(true);

        // Simular proceso de checkout
        await new Promise(resolve => setTimeout(resolve, 2000));

        setOrderConfirmed(true);
        setIsCheckingOut(false);
    };

    const handleNewOrder = () => {
        clearCart();
        setOrderConfirmed(false);
        setSelectedSlots({});
        navigate('/catalogo');
    };

    if (items.length === 0 && !orderConfirmed) {
        return (
            <main className="cart-page">
                <div className="cart-container">
                    <div className="cart-empty animate-fade-in-up">
                        <div className="cart-empty-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                        </div>
                        <h2 className="cart-empty-title">Tu carrito esta vacio</h2>
                        <p className="cart-empty-text">
                            Explora nuestro catalogo y encuentra los mejores productos y precios
                        </p>
                        <Link to="/catalogo" className="btn btn-primary btn-lg">
                            Ir al Catalogo
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    if (orderConfirmed) {
        return (
            <main className="cart-page">
                <div className="cart-container">
                    <div className="order-confirmed animate-scale-in">
                        <div className="order-confirmed-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <h2 className="order-confirmed-title">Pedido Confirmado</h2>
                        <p className="order-confirmed-text">
                            Tu pedido ha sido registrado exitosamente. Recibiras una notificacion
                            cuando el distribuidor confirme la entrega.
                        </p>
                        <div className="order-confirmed-details">
                            <div className="order-detail">
                                <span className="order-detail-label">Numero de Pedido</span>
                                <span className="order-detail-value">PED-{Date.now().toString().slice(-6)}</span>
                            </div>
                            <div className="order-detail">
                                <span className="order-detail-label">Total</span>
                                <span className="order-detail-value">Bs. {getTotal().toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="order-confirmed-actions">
                            <Link to="/pedidos" className="btn btn-secondary btn-lg">
                                Ver Mis Pedidos
                            </Link>
                            <button onClick={handleNewOrder} className="btn btn-primary btn-lg">
                                Nuevo Pedido
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="cart-page">
            <div className="cart-container">
                <div className="cart-header animate-fade-in-up">
                    <h1 className="cart-title">Tu Carrito</h1>
                    <p className="cart-subtitle">{items.length} producto{items.length > 1 ? 's' : ''} en tu carrito</p>
                </div>

                <div className="cart-content">
                    <div className="cart-items">
                        {Object.entries(itemsByDistributor).map(([distribuidorId, distItems], groupIndex) => {
                            const dist = getDistributor(parseInt(distribuidorId));
                            const groupTotal = distItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

                            return (
                                <div key={distribuidorId} className="cart-group animate-fade-in-up" style={{ animationDelay: `${groupIndex * 100}ms` }}>
                                    <div className="cart-group-header">
                                        <div className="cart-group-vendor">
                                            <img src={dist.logo} alt={dist.nombre} className="cart-vendor-logo" />
                                            <div>
                                                <span className="cart-vendor-name">{dist.nombre}</span>
                                                <span className="cart-vendor-delivery">{dist.tiempoEntrega}</span>
                                            </div>
                                        </div>
                                        <span className="cart-group-total">Subtotal: Bs. {groupTotal.toFixed(2)}</span>
                                    </div>

                                    <div className="cart-group-items">
                                        {distItems.map(item => (
                                            <div key={`${item.productoId}-${item.distribuidorId}`} className="cart-item">
                                                <img src={item.imagen} alt={item.nombre} className="cart-item-image" />
                                                <div className="cart-item-info">
                                                    <h4 className="cart-item-name">{item.nombre}</h4>
                                                    <span className="cart-item-price">Bs. {item.precio.toFixed(2)} c/u</span>
                                                </div>
                                                <div className="cart-item-quantity">
                                                    <button
                                                        className="quantity-btn"
                                                        onClick={() => updateQuantity(item.productoId, item.distribuidorId, item.cantidad - item.unidadMinima)}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="quantity-value">{item.cantidad}</span>
                                                    <button
                                                        className="quantity-btn"
                                                        onClick={() => updateQuantity(item.productoId, item.distribuidorId, item.cantidad + item.unidadMinima)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <span className="cart-item-total">Bs. {(item.precio * item.cantidad).toFixed(2)}</span>
                                                <button
                                                    className="cart-item-remove"
                                                    onClick={() => removeItem(item.productoId, item.distribuidorId)}
                                                >
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <polyline points="3 6 5 6 21 6" />
                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="cart-group-delivery">
                                        <h4 className="delivery-title">Selecciona ventana de entrega</h4>
                                        <div className="delivery-slots">
                                            {ventanasTiempo.slice(0, 6).map(slot => (
                                                <button
                                                    key={slot.id}
                                                    className={`delivery-slot ${selectedSlots[distribuidorId] === slot.id ? 'selected' : ''}`}
                                                    onClick={() => handleSlotSelect(distribuidorId, slot.id)}
                                                >
                                                    <span className="slot-day">{slot.dia}</span>
                                                    <span className="slot-time">{slot.horaInicio} - {slot.horaFin}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <aside className="cart-summary animate-fade-in">
                        <div className="cart-summary-card">
                            <h3 className="cart-summary-title">Resumen del Pedido</h3>

                            <div className="cart-summary-lines">
                                <div className="cart-summary-line">
                                    <span>Subtotal</span>
                                    <span>Bs. {getTotal().toFixed(2)}</span>
                                </div>
                                <div className="cart-summary-line">
                                    <span>Envio</span>
                                    <span className="cart-free">Gratis</span>
                                </div>
                            </div>

                            <div className="cart-summary-total">
                                <span>Total</span>
                                <span>Bs. {getTotal().toFixed(2)}</span>
                            </div>

                            <button
                                className="btn btn-primary btn-lg cart-checkout-btn"
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                            >
                                {isCheckingOut ? (
                                    <span className="cart-loading"></span>
                                ) : (
                                    <>
                                        Confirmar Pedido
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                            <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </>
                                )}
                            </button>

                            <p className="cart-summary-note">
                                Al confirmar aceptas los terminos y condiciones de compra
                            </p>
                        </div>

                        <div className="cart-summary-features">
                            <div className="cart-feature">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="1" y="3" width="15" height="13" />
                                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                                    <circle cx="5.5" cy="18.5" r="2.5" />
                                    <circle cx="18.5" cy="18.5" r="2.5" />
                                </svg>
                                <span>Entrega programada</span>
                            </div>
                            <div className="cart-feature">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                                <span>Pago seguro</span>
                            </div>
                            <div className="cart-feature">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                                <span>Soporte 24/7</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
