import { createContext, useContext, useState, useEffect } from 'react';

const NotificationsContext = createContext();

// Notificaciones de ejemplo
const mockNotifications = [
    {
        id: 1,
        type: 'order',
        title: 'Pedido Entregado',
        message: 'Tu pedido PED-001 ha sido entregado exitosamente',
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
        icon: 'package'
    },
    {
        id: 2,
        type: 'offer',
        title: 'Nueva Oferta Disponible',
        message: 'Coca-Cola 2L con 15% de descuento - ¡Solo por hoy!',
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        icon: 'tag'
    },
    {
        id: 3,
        type: 'system',
        title: 'Bienvenido a Nexo',
        message: 'Tu cuenta ha sido verificada correctamente. ¡Ya puedes empezar a comprar!',
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        icon: 'check-circle'
    },
    {
        id: 4,
        type: 'payment',
        title: 'Pago Confirmado',
        message: 'Se ha confirmado el pago de Bs. 485.50 para el pedido PED-001',
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
        icon: 'credit-card'
    },
    {
        id: 5,
        type: 'stock',
        title: 'Stock Bajo',
        message: 'El producto "Arroz Premium 1kg" tiene stock bajo en tu inventario',
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
        icon: 'alert-triangle'
    }
];

export function NotificationsProvider({ children }) {
    const [notifications, setNotifications] = useState(() => {
        const saved = localStorage.getItem('nexo_notifications');
        return saved ? JSON.parse(saved) : mockNotifications;
    });

    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        localStorage.setItem('nexo_notifications', JSON.stringify(notifications));
    }, [notifications]);

    const addNotification = (notification) => {
        const newNotification = {
            id: Date.now(),
            read: false,
            createdAt: new Date().toISOString(),
            ...notification
        };
        setNotifications(prev => [newNotification, ...prev]);
    };

    const markAsRead = (notificationId) => {
        setNotifications(prev => prev.map(n =>
            n.id === notificationId ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (notificationId) => {
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
    };

    const clearAllNotifications = () => {
        setNotifications([]);
    };

    const getUnreadCount = () => {
        return notifications.filter(n => !n.read).length;
    };

    const toggleNotifications = () => {
        setShowNotifications(prev => !prev);
    };

    const closeNotifications = () => {
        setShowNotifications(false);
    };

    const formatTimeAgo = (dateString) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Hace un momento';
        if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} min`;
        if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} horas`;
        if (diffInSeconds < 604800) return `Hace ${Math.floor(diffInSeconds / 86400)} días`;
        return date.toLocaleDateString('es-ES');
    };

    return (
        <NotificationsContext.Provider value={{
            notifications,
            showNotifications,
            addNotification,
            markAsRead,
            markAllAsRead,
            deleteNotification,
            clearAllNotifications,
            getUnreadCount,
            toggleNotifications,
            closeNotifications,
            formatTimeAgo
        }}>
            {children}
        </NotificationsContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(NotificationsContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationsProvider');
    }
    return context;
}
