import { createContext, useContext, useState, useEffect } from 'react';
import { usuarioEjemplo, empresaEjemplo } from '../data/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('nexo_user');
        return saved ? JSON.parse(saved) : null;
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            localStorage.setItem('nexo_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('nexo_user');
        }
    }, [user]);

    const login = async (email, password, userType) => {
        setIsLoading(true);

        // Simulacion de login
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (userType === 'pulperia') {
            setUser({ ...usuarioEjemplo, email });
        } else {
            setUser({ ...empresaEjemplo, email });
        }

        setIsLoading(false);
        return true;
    };

    const register = async (userData, userType) => {
        setIsLoading(true);

        // Simulacion de registro
        await new Promise(resolve => setTimeout(resolve, 1500));

        const newUser = {
            id: Date.now(),
            tipo: userType,
            ...userData,
            verificado: false,
            fechaRegistro: new Date().toISOString().split('T')[0]
        };

        setUser(newUser);
        setIsLoading(false);
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('nexo_cart');
    };

    const isAuthenticated = () => {
        return user !== null;
    };

    const isPulperia = () => {
        return user?.tipo === 'pulperia';
    };

    const isDistribuidor = () => {
        return user?.tipo === 'distribuidor';
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            login,
            register,
            logout,
            isAuthenticated,
            isPulperia,
            isDistribuidor
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
