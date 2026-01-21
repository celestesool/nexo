import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem('nexo_cart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('nexo_cart', JSON.stringify(items));
    }, [items]);

    const addItem = (producto, distribuidorId, cantidad, precio) => {
        setItems(prev => {
            const existingIndex = prev.findIndex(
                item => item.productoId === producto.id && item.distribuidorId === distribuidorId
            );

            if (existingIndex >= 0) {
                const updated = [...prev];
                updated[existingIndex].cantidad += cantidad;
                return updated;
            }

            return [...prev, {
                productoId: producto.id,
                nombre: producto.nombre,
                imagen: producto.imagen,
                distribuidorId,
                cantidad,
                precio,
                unidadMinima: producto.unidadMinima
            }];
        });
    };

    const updateQuantity = (productoId, distribuidorId, cantidad) => {
        if (cantidad <= 0) {
            removeItem(productoId, distribuidorId);
            return;
        }

        setItems(prev => prev.map(item =>
            item.productoId === productoId && item.distribuidorId === distribuidorId
                ? { ...item, cantidad }
                : item
        ));
    };

    const removeItem = (productoId, distribuidorId) => {
        setItems(prev => prev.filter(
            item => !(item.productoId === productoId && item.distribuidorId === distribuidorId)
        ));
    };

    const clearCart = () => {
        setItems([]);
    };

    const getTotal = () => {
        return items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    };

    const getItemCount = () => {
        return items.reduce((sum, item) => sum + item.cantidad, 0);
    };

    const getItemsByDistributor = () => {
        const grouped = {};
        items.forEach(item => {
            if (!grouped[item.distribuidorId]) {
                grouped[item.distribuidorId] = [];
            }
            grouped[item.distribuidorId].push(item);
        });
        return grouped;
    };

    return (
        <CartContext.Provider value={{
            items,
            addItem,
            updateQuantity,
            removeItem,
            clearCart,
            getTotal,
            getItemCount,
            getItemsByDistributor
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
