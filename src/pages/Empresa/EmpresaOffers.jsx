import { useState, useEffect } from 'react';
import { productos, ofertas as ofertasData } from '../../data/mockData';
import { toggleBodyScroll } from '../../utils/modalUtils';
import './EmpresaOffers.css';

export default function EmpresaOffers() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingOffer, setEditingOffer] = useState(null);

    useEffect(() => {
        toggleBodyScroll(showAddModal);
        return () => toggleBodyScroll(false);
    }, [showAddModal]);

    const getProducto = (id) => productos.find(p => p.id === id);

    // Ofertas activas e inactivas
    const activeOffers = ofertasData.filter(o => o.activa);

    const handleSaveOffer = (offer) => {
        console.log('Guardando oferta:', offer);
        setShowAddModal(false);
        setEditingOffer(null);
    };

    return (
        <main className="empresa-offers-page">
            <div className="empresa-offers-container">
                <div className="empresa-offers-header animate-fade-in-up">
                    <div>
                        <h1 className="empresa-offers-title">Ofertas y Promociones</h1>
                        <p className="empresa-offers-subtitle">Crea ofertas especiales para tus clientes</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Nueva Oferta
                    </button>
                </div>

                {/* Stats */}
                <div className="offers-stats animate-fade-in-up delay-100">
                    <div className="offer-stat">
                        <div className="offer-stat-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                <line x1="7" y1="7" x2="7.01" y2="7" />
                            </svg>
                        </div>
                        <div>
                            <span className="offer-stat-value">{activeOffers.length}</span>
                            <span className="offer-stat-label">Ofertas Activas</span>
                        </div>
                    </div>
                    <div className="offer-stat">
                        <div className="offer-stat-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                <polyline points="17 6 23 6 23 12" />
                            </svg>
                        </div>
                        <div>
                            <span className="offer-stat-value">+25%</span>
                            <span className="offer-stat-label">Ventas en Ofertas</span>
                        </div>
                    </div>
                    <div className="offer-stat">
                        <div className="offer-stat-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <div>
                            <span className="offer-stat-value">45</span>
                            <span className="offer-stat-label">Clientes Alcanzados</span>
                        </div>
                    </div>
                </div>

                {/* Active Offers */}
                <section className="offers-section animate-fade-in-up delay-200">
                    <h2 className="section-title">Ofertas Activas</h2>

                    {activeOffers.length > 0 ? (
                        <div className="offers-grid">
                            {activeOffers.map(offer => {
                                const producto = getProducto(offer.productoId);
                                if (!producto) return null;
                                const precioOriginal = producto.precios[0]?.precio || 0;
                                const precioOferta = precioOriginal * (1 - offer.descuento / 100);

                                return (
                                    <div key={offer.id} className="offer-card">
                                        <div className="offer-card-badge">-{offer.descuento}%</div>

                                        <div className="offer-card-header">
                                            <img src={producto.imagen} alt={producto.nombre} className="offer-card-image" />
                                            <div className="offer-card-info">
                                                <h3 className="offer-card-name">{producto.nombre}</h3>
                                                <span className="offer-card-category">{producto.categoria}</span>
                                            </div>
                                        </div>

                                        <div className="offer-card-reason">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" />
                                                <line x1="12" y1="16" x2="12" y2="12" />
                                                <line x1="12" y1="8" x2="12.01" y2="8" />
                                            </svg>
                                            <span>{offer.motivo}</span>
                                        </div>

                                        <div className="offer-card-pricing">
                                            <div className="offer-prices">
                                                <span className="offer-price-old">Bs. {precioOriginal.toFixed(2)}</span>
                                                <span className="offer-price-new">Bs. {precioOferta.toFixed(2)}</span>
                                            </div>
                                            <div className="offer-dates">
                                                {offer.fechaInicio} - {offer.fechaFin}
                                            </div>
                                        </div>

                                        <div className="offer-card-actions">
                                            <button
                                                className="btn btn-sm btn-secondary"
                                                onClick={() => setEditingOffer(offer)}
                                            >
                                                Editar
                                            </button>
                                            <button className="btn btn-sm btn-ghost">Pausar</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="offers-empty">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                <line x1="7" y1="7" x2="7.01" y2="7" />
                            </svg>
                            <p>No tienes ofertas activas</p>
                            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                                Crear Primera Oferta
                            </button>
                        </div>
                    )}
                </section>

                {/* Offer Types Info */}
                <section className="offer-types animate-fade-in-up delay-300">
                    <h2 className="section-title">Tipos de Ofertas</h2>
                    <div className="offer-types-grid">
                        <div className="offer-type-card">
                            <div className="offer-type-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            </div>
                            <h4>Proximo a Vencer</h4>
                            <p>Descuentos en productos cerca de vencimiento</p>
                        </div>
                        <div className="offer-type-card">
                            <div className="offer-type-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                </svg>
                            </div>
                            <h4>Liquidacion</h4>
                            <p>Libera espacio con precios especiales</p>
                        </div>
                        <div className="offer-type-card">
                            <div className="offer-type-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                            </div>
                            <h4>Promocion</h4>
                            <p>Campanas para fechas especiales</p>
                        </div>
                        <div className="offer-type-card">
                            <div className="offer-type-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                            </div>
                            <h4>Por Volumen</h4>
                            <p>Descuentos por compras grandes</p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Add/Edit Offer Modal */}
            {(showAddModal || editingOffer) && (
                <div className="modal-overlay" onClick={() => { setShowAddModal(false); setEditingOffer(null); }}>
                    <div className="modal animate-scale-in" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => { setShowAddModal(false); setEditingOffer(null); }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        <div className="modal-content">
                            <h2 className="modal-title">
                                {editingOffer ? 'Editar Oferta' : 'Nueva Oferta'}
                            </h2>

                            <form onSubmit={(e) => { e.preventDefault(); handleSaveOffer({}); }}>
                                <div className="input-group">
                                    <label className="input-label">Producto</label>
                                    <select className="input" defaultValue={editingOffer?.productoId || ''}>
                                        <option value="">Seleccionar producto</option>
                                        {productos.slice(0, 8).map(p => (
                                            <option key={p.id} value={p.id}>{p.nombre}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Tipo de oferta</label>
                                    <select className="input">
                                        <option value="promocion">Promocion especial</option>
                                        <option value="vencimiento">Producto proximo a vencer</option>
                                        <option value="liquidacion">Liquidacion de stock</option>
                                        <option value="volumen">Compra por volumen</option>
                                    </select>
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Descuento (%)</label>
                                    <input
                                        type="number"
                                        className="input"
                                        defaultValue={editingOffer?.descuento || ''}
                                        placeholder="Ej: 15"
                                        min="1"
                                        max="50"
                                    />
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Motivo (visible para clientes)</label>
                                    <textarea
                                        className="input textarea"
                                        defaultValue={editingOffer?.motivo || ''}
                                        placeholder="Ej: Promocion de temporada"
                                        rows={2}
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="input-group">
                                        <label className="input-label">Fecha inicio</label>
                                        <input type="date" className="input" />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">Fecha fin</label>
                                        <input type="date" className="input" />
                                    </div>
                                </div>

                                <div className="modal-actions">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => { setShowAddModal(false); setEditingOffer(null); }}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        {editingOffer ? 'Guardar' : 'Publicar'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
