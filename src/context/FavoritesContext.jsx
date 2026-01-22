import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('nexo_favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('nexo_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (producto) => {
        setFavorites(prev => {
            if (prev.find(f => f.id === producto.id)) {
                return prev;
            }
            return [...prev, {
                id: producto.id,
                nombre: producto.nombre,
                imagen: producto.imagen,
                categoria: producto.categoria,
                addedAt: new Date().toISOString()
            }];
        });
    };

    const removeFavorite = (productoId) => {
        setFavorites(prev => prev.filter(f => f.id !== productoId));
    };

    const toggleFavorite = (producto) => {
        if (isFavorite(producto.id)) {
            removeFavorite(producto.id);
        } else {
            addFavorite(producto);
        }
    };

    const isFavorite = (productoId) => {
        return favorites.some(f => f.id === productoId);
    };

    const clearFavorites = () => {
        setFavorites([]);
    };

    const getFavoritesCount = () => {
        return favorites.length;
    };

    return (
        <FavoritesContext.Provider value={{
            favorites,
            addFavorite,
            removeFavorite,
            toggleFavorite,
            isFavorite,
            clearFavorites,
            getFavoritesCount
        }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
