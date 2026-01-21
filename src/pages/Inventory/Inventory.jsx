import { useState } from 'react';
import { productos, categorias } from '../../data/mockData';
import './Inventory.css';

export default function Inventory() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [editingItem, setEditingItem] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    // Simulamos inventario de la pulperia basado en productos
    const [inventory, setInventory] = useState([
        { id: 1, productoId: 1, stockActual: 24, stockMinimo: 12, ultimaCompra: '15/01/2026' },
        { id: 2, productoId: 2, stockActual: 8, stockMinimo: 10, ultimaCompra: '12/01/2026' },
        { id: 3, productoId: 3, stockActual: 36, stockMinimo: 20, ultimaCompra: '18/01/2026' },
        { id: 4, productoId: 4, stockActual: 5, stockMinimo: 15, ultimaCompra: '10/01/2026' },
        { id: 5, productoId: 5, stockActual: 48, stockMinimo: 24, ultimaCompra: '20/01/2026' },
        { id: 6, productoId: 6, stockActual: 18, stockMinimo: 12, ultimaCompra: '14/01/2026' },
    ]);

    const getProducto = (id) => productos.find(p => p.id === id);

    const inventoryWithProducts = inventory.map(item => ({
        ...item,
        producto: getProducto(item.productoId)
    })).filter(item => item.producto);

    const filteredInventory = inventoryWithProducts.filter(item => {
        const matchSearch = item.producto.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategory = selectedCategory === 'all' || item.producto.categoria === selectedCategory;
        return matchSearch && matchCategory;
    });

    const lowStockCount = inventory.filter(i => i.stockActual < i.stockMinimo).length;
    const totalItems = inventory.length;
    const totalValue = inventoryWithProducts.reduce((sum, item) => {
        const precio = item.producto.precios[0]?.precio || 0;
        return sum + (precio * item.stockActual);
    }, 0);

    const handleUpdateStock = (itemId, newStock) => {
        setInventory(prev => prev.map(item =>
            item.id === itemId ? { ...item, stockActual: newStock } : item
        ));
        setEditingItem(null);
    };

    const closeModal = () => {
        setEditingItem(null);
        setShowAddModal(false);
    };

    return (
        <main className="inventory-page">
            <div className="inventory-container">
                <div className="inventory-header animate-fade-in-up">
                    <div>
                        <h1 className="inventory-title">Mi Inventario</h1>
                        <p className="inventory-subtitle">Gestiona el stock de tu pulperia</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Agregar Producto
                    </button>
                </div>

                {/* Stats */}
                <div className="inventory-stats animate-fade-in-up delay-100">
                    <div className="inv-stat">
                        <div className="inv-stat-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            </svg>
                        </div>
                        <div className="inv-stat-content">
                            <span className="inv-stat-value">{totalItems}</span>
                            <span className="inv-stat-label">Productos</span>
                        </div>
                    </div>

                    <div className={`inv-stat ${lowStockCount > 0 ? 'inv-stat-warning' : ''}`}>
                        <div className="inv-stat-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                <line x1="12" y1="9" x2="12" y2="13" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                        </div>
                        <div className="inv-stat-content">
                            <span className="inv-stat-value">{lowStockCount}</span>
                            <span className="inv-stat-label">Stock Bajo</span>
                        </div>
                    </div>

                    <div className="inv-stat">
                        <div className="inv-stat-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="1" x2="12" y2="23" />
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </div>
                        <div className="inv-stat-content">
                            <span className="inv-stat-value">Bs. {totalValue.toFixed(0)}</span>
                            <span className="inv-stat-label">Valor Total</span>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="inventory-toolbar animate-fade-in-up delay-200">
                    <div className="toolbar-search">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            className="input"
                            placeholder="Buscar en inventario..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="input toolbar-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">Todas las categorias</option>
                        {categorias.map(cat => (
                            <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
                        ))}
                    </select>
                </div>

                {/* Low Stock Alert */}
                {lowStockCount > 0 && (
                    <div className="low-stock-alert animate-fade-in-up delay-300">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <span>Tienes {lowStockCount} producto{lowStockCount > 1 ? 's' : ''} con stock bajo</span>
                        <a href="/catalogo" className="alert-link">Reabastecer</a>
                    </div>
                )}

                {/* Inventory Grid */}
                <div className="inventory-grid animate-fade-in-up delay-400">
                    {filteredInventory.map(item => {
                        const isLowStock = item.stockActual < item.stockMinimo;
                        const stockPercentage = Math.min((item.stockActual / item.stockMinimo) * 100, 100);

                        return (
                            <div key={item.id} className={`inventory-card ${isLowStock ? 'low-stock' : ''}`}>
                                <div className="inventory-card-header">
                                    <img src={item.producto.imagen} alt={item.producto.nombre} />
                                    <div className="inventory-card-info">
                                        <h3>{item.producto.nombre}</h3>
                                        <span className="inventory-card-category">{item.producto.categoria}</span>
                                    </div>
                                    {isLowStock && (
                                        <span className="inventory-low-badge">Stock Bajo</span>
                                    )}
                                </div>

                                <div className="inventory-card-stock">
                                    <div className="stock-numbers">
                                        <div className="stock-current">
                                            <span className="stock-value">{item.stockActual}</span>
                                            <span className="stock-label">En stock</span>
                                        </div>
                                        <div className="stock-min">
                                            <span className="stock-value">{item.stockMinimo}</span>
                                            <span className="stock-label">Minimo</span>
                                        </div>
                                    </div>
                                    <div className="stock-bar">
                                        <div
                                            className={`stock-bar-fill ${isLowStock ? 'low' : ''}`}
                                            style={{ width: `${stockPercentage}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="inventory-card-footer">
                                    <span className="last-purchase">Ultima compra: {item.ultimaCompra}</span>
                                    <div className="inventory-actions">
                                        <button
                                            className="btn btn-sm btn-secondary"
                                            onClick={() => setEditingItem(item)}
                                        >
                                            Ajustar
                                        </button>
                                        <a href="/catalogo" className="btn btn-sm btn-primary">
                                            Pedir
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredInventory.length === 0 && (
                    <div className="inventory-empty">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        </svg>
                        <h3>Sin productos en inventario</h3>
                        <p>Agrega productos para comenzar a gestionar tu stock</p>
                        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                            Agregar Primer Producto
                        </button>
                    </div>
                )}
            </div>

            {/* Edit Stock Modal */}
            {editingItem && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal animate-scale-in" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        <div className="modal-content">
                            <h2 className="modal-title">Ajustar Stock</h2>

                            <div className="edit-product-preview">
                                <img src={editingItem.producto.imagen} alt={editingItem.producto.nombre} />
                                <div>
                                    <h3>{editingItem.producto.nombre}</h3>
                                    <span>{editingItem.producto.categoria}</span>
                                </div>
                            </div>

                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const newStock = parseInt(e.target.stock.value);
                                handleUpdateStock(editingItem.id, newStock);
                            }}>
                                <div className="form-row">
                                    <div className="input-group">
                                        <label className="input-label">Stock Actual</label>
                                        <input
                                            type="number"
                                            name="stock"
                                            className="input"
                                            defaultValue={editingItem.stockActual}
                                            min="0"
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">Stock Minimo</label>
                                        <input
                                            type="number"
                                            className="input"
                                            defaultValue={editingItem.stockMinimo}
                                            min="1"
                                        />
                                    </div>
                                </div>

                                <div className="quick-adjust">
                                    <span className="quick-label">Ajuste rapido:</span>
                                    <div className="quick-buttons">
                                        <button type="button" className="quick-btn" onClick={() => {
                                            const input = document.querySelector('input[name="stock"]');
                                            input.value = Math.max(0, parseInt(input.value) - 1);
                                        }}>-1</button>
                                        <button type="button" className="quick-btn" onClick={() => {
                                            const input = document.querySelector('input[name="stock"]');
                                            input.value = Math.max(0, parseInt(input.value) - 5);
                                        }}>-5</button>
                                        <button type="button" className="quick-btn" onClick={() => {
                                            const input = document.querySelector('input[name="stock"]');
                                            input.value = parseInt(input.value) + 5;
                                        }}>+5</button>
                                        <button type="button" className="quick-btn" onClick={() => {
                                            const input = document.querySelector('input[name="stock"]');
                                            input.value = parseInt(input.value) + 10;
                                        }}>+10</button>
                                    </div>
                                </div>

                                <div className="modal-actions">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Product Modal */}
            {showAddModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal animate-scale-in" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        <div className="modal-content">
                            <h2 className="modal-title">Agregar al Inventario</h2>

                            <form onSubmit={(e) => { e.preventDefault(); closeModal(); }}>
                                <div className="input-group">
                                    <label className="input-label">Producto</label>
                                    <select className="input">
                                        <option value="">Seleccionar producto</option>
                                        {productos.map(p => (
                                            <option key={p.id} value={p.id}>{p.nombre}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-row">
                                    <div className="input-group">
                                        <label className="input-label">Stock Inicial</label>
                                        <input type="number" className="input" placeholder="0" min="0" />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">Stock Minimo</label>
                                        <input type="number" className="input" placeholder="10" min="1" />
                                    </div>
                                </div>

                                <div className="modal-actions">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Agregar
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
