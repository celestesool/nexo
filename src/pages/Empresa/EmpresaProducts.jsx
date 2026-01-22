import { useState, useEffect } from 'react';
import { productos, categorias } from '../../data/mockData';
import { toggleBodyScroll } from '../../utils/modalUtils';
import './EmpresaProducts.css';

export default function EmpresaProducts() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [editingProduct, setEditingProduct] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        toggleBodyScroll(showAddModal);
        return () => toggleBodyScroll(false);
    }, [showAddModal]);

    // Simulamos que estos productos pertenecen a la empresa actual
    const empresaProducts = productos.slice(0, 8);

    const filteredProducts = empresaProducts.filter(p => {
        const matchSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategory = selectedCategory === 'all' || p.categoria === selectedCategory;
        return matchSearch && matchCategory;
    });

    const handleSaveProduct = (product) => {
        console.log('Guardando producto:', product);
        setEditingProduct(null);
        setShowAddModal(false);
    };

    const closeModal = () => {
        setEditingProduct(null);
        setShowAddModal(false);
    };

    return (
        <main className="empresa-products-page">
            <div className="empresa-products-container">
                <div className="empresa-products-header animate-fade-in-up">
                    <div>
                        <h1 className="empresa-products-title">Mis Productos</h1>
                        <p className="empresa-products-subtitle">Gestiona tu catalogo de productos</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Agregar Producto
                    </button>
                </div>

                <div className="empresa-products-toolbar animate-fade-in-up delay-100">
                    <div className="toolbar-search">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            className="input"
                            placeholder="Buscar productos..."
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

                <div className="empresa-products-stats animate-fade-in-up delay-200">
                    <div className="stat-mini">
                        <span className="stat-mini-value">{empresaProducts.length}</span>
                        <span className="stat-mini-label">Productos Activos</span>
                    </div>
                    <div className="stat-mini">
                        <span className="stat-mini-value">3</span>
                        <span className="stat-mini-label">Stock Bajo</span>
                    </div>
                    <div className="stat-mini">
                        <span className="stat-mini-value">2</span>
                        <span className="stat-mini-label">En Oferta</span>
                    </div>
                </div>

                <div className="products-table-container animate-fade-in-up delay-300">
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Categoria</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map(product => {
                                const precio = product.precios[0];
                                const stockBajo = precio.stock < 100;

                                return (
                                    <tr key={product.id}>
                                        <td>
                                            <div className="product-cell">
                                                <img src={product.imagen} alt={product.nombre} />
                                                <div>
                                                    <span className="product-cell-name">{product.nombre}</span>
                                                    <span className="product-cell-id">SKU-{product.id.toString().padStart(4, '0')}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="category-badge">{product.categoria}</span>
                                        </td>
                                        <td>
                                            <span className="price-cell">Bs. {precio.precio.toFixed(2)}</span>
                                        </td>
                                        <td>
                                            <span className={`stock-cell ${stockBajo ? 'stock-low' : ''}`}>
                                                {precio.stock} und.
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${stockBajo ? 'status-warning' : 'status-active'}`}>
                                                {stockBajo ? 'Stock Bajo' : 'Activo'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="action-btn"
                                                    onClick={() => setEditingProduct(product)}
                                                    title="Editar"
                                                >
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                    </svg>
                                                </button>
                                                <button className="action-btn action-btn-danger" title="Eliminar">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <polyline points="3 6 5 6 21 6" />
                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="products-empty">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        </svg>
                        <p>No se encontraron productos</p>
                    </div>
                )}
            </div>

            {/* Edit/Add Product Modal */}
            {(editingProduct || showAddModal) && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal animate-scale-in" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        <div className="modal-content">
                            <h2 className="modal-title">
                                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                            </h2>

                            <form onSubmit={(e) => { e.preventDefault(); handleSaveProduct(editingProduct); }}>
                                <div className="input-group">
                                    <label className="input-label">Nombre del producto</label>
                                    <input
                                        type="text"
                                        className="input"
                                        defaultValue={editingProduct?.nombre || ''}
                                        placeholder="Nombre del producto"
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="input-group">
                                        <label className="input-label">Categoria</label>
                                        <select className="input" defaultValue={editingProduct?.categoria || ''}>
                                            <option value="">Seleccionar</option>
                                            {categorias.map(cat => (
                                                <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">Unidad minima</label>
                                        <input
                                            type="number"
                                            className="input"
                                            defaultValue={editingProduct?.unidadMinima || 1}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="input-group">
                                        <label className="input-label">Precio (Bs.)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="input"
                                            defaultValue={editingProduct?.precios[0]?.precio || ''}
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">Stock disponible</label>
                                        <input
                                            type="number"
                                            className="input"
                                            defaultValue={editingProduct?.precios[0]?.stock || ''}
                                            placeholder="0"
                                        />
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Descripcion</label>
                                    <textarea
                                        className="input textarea"
                                        defaultValue={editingProduct?.descripcion || ''}
                                        placeholder="Descripcion del producto"
                                        rows={3}
                                    />
                                </div>

                                <div className="modal-actions">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        {editingProduct ? 'Guardar' : 'Crear'}
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
