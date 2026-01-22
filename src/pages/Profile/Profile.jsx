import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationsContext';
import './Profile.css';

export default function Profile() {
    const { user, logout } = useAuth();
    const { notifications } = useNotifications();
    const [activeTab, setActiveTab] = useState('info');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        nombre: user?.nombre || '',
        email: user?.email || '',
        telefono: user?.telefono || '',
        direccion: user?.direccion || '',
        propietario: user?.propietario || user?.representante || '',
        nit: user?.nit || ''
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        // Aquí iría la lógica para guardar en el backend
        setIsEditing(false);
        alert('Cambios guardados correctamente');
    };

    const handlePasswordSave = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        if (passwordData.newPassword.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres');
            return;
        }
        // Aquí iría la lógica para cambiar la contraseña
        setShowPasswordModal(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        alert('Contraseña cambiada correctamente');
    };

    const tabs = [
        { id: 'info', label: 'Información', icon: 'user' },
        { id: 'security', label: 'Seguridad', icon: 'shield' },
        { id: 'notifications', label: 'Notificaciones', icon: 'bell' },
        { id: 'documents', label: 'Documentos', icon: 'file' }
    ];

    const renderTabIcon = (icon) => {
        switch (icon) {
            case 'user':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                );
            case 'shield':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                );
            case 'bell':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                );
            case 'file':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className="profile-page">
            <div className="container">
                <div className="profile-header animate-fade-in-up">
                    <div className="profile-avatar-section">
                        <div className="profile-avatar">
                            {user?.avatar ? (
                                <img src={user.avatar} alt={user.nombre} />
                            ) : (
                                <span>{user?.nombre?.charAt(0) || 'U'}</span>
                            )}
                            <button className="avatar-edit-btn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                    <circle cx="12" cy="13" r="4" />
                                </svg>
                            </button>
                        </div>
                        <div className="profile-info">
                            <h1 className="profile-name">{user?.nombre}</h1>
                            <p className="profile-type">
                                {user?.tipo === 'pulperia' ? 'Pulpería' : 'Distribuidor'}
                            </p>
                            <div className="profile-badges">
                                {user?.verificado && (
                                    <span className="badge badge-success">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                        </svg>
                                        Verificado
                                    </span>
                                )}
                                <span className="badge">
                                    Miembro desde {new Date(user?.fechaRegistro).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="profile-actions">
                        <button onClick={logout} className="btn btn-secondary">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Cerrar Sesión
                        </button>
                    </div>
                </div>

                <div className="profile-content">
                    <nav className="profile-tabs animate-fade-in-up delay-100">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`profile-tab ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {renderTabIcon(tab.icon)}
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="profile-tab-content animate-fade-in-up delay-200">
                        {activeTab === 'info' && (
                            <div className="profile-section">
                                <div className="section-header">
                                    <h2>Información Personal</h2>
                                    <button
                                        className={`btn ${isEditing ? 'btn-primary' : 'btn-secondary'}`}
                                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                    >
                                        {isEditing ? (
                                            <>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                                    <polyline points="17 21 17 13 7 13 7 21" />
                                                    <polyline points="7 3 7 8 15 8" />
                                                </svg>
                                                Guardar Cambios
                                            </>
                                        ) : (
                                            <>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                </svg>
                                                Editar
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="info-grid">
                                    <div className="input-group">
                                        <label className="input-label">Nombre del Negocio</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            className="input"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">
                                            {user?.tipo === 'pulperia' ? 'Propietario' : 'Representante'}
                                        </label>
                                        <input
                                            type="text"
                                            name="propietario"
                                            className="input"
                                            value={formData.propietario}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">Correo Electrónico</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="input"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">Teléfono</label>
                                        <input
                                            type="tel"
                                            name="telefono"
                                            className="input"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="input-group full-width">
                                        <label className="input-label">Dirección</label>
                                        <input
                                            type="text"
                                            name="direccion"
                                            className="input"
                                            value={formData.direccion}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">NIT</label>
                                        <input
                                            type="text"
                                            name="nit"
                                            className="input"
                                            value={formData.nit}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="profile-section">
                                <h2>Seguridad de la Cuenta</h2>
                                <div className="security-cards">
                                    <div className="security-card">
                                        <div className="security-icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                            </svg>
                                        </div>
                                        <div className="security-info">
                                            <h3>Contraseña</h3>
                                            <p>Última actualización: hace 30 días</p>
                                        </div>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => setShowPasswordModal(true)}
                                        >
                                            Cambiar
                                        </button>
                                    </div>
                                    <div className="security-card">
                                        <div className="security-icon success">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                <polyline points="22 4 12 14.01 9 11.01" />
                                            </svg>
                                        </div>
                                        <div className="security-info">
                                            <h3>Verificación de Email</h3>
                                            <p>Tu correo está verificado</p>
                                        </div>
                                        <span className="badge badge-success">Verificado</span>
                                    </div>
                                    <div className="security-card">
                                        <div className="security-icon warning">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                                <path d="M12 8v4" />
                                                <path d="M12 16h.01" />
                                            </svg>
                                        </div>
                                        <div className="security-info">
                                            <h3>Autenticación en 2 Pasos</h3>
                                            <p>Añade una capa extra de seguridad</p>
                                        </div>
                                        <button className="btn btn-secondary">Activar</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="profile-section">
                                <h2>Preferencias de Notificaciones</h2>
                                <div className="notification-settings">
                                    <div className="notification-setting">
                                        <div className="setting-info">
                                            <h3>Pedidos</h3>
                                            <p>Recibe actualizaciones sobre el estado de tus pedidos</p>
                                        </div>
                                        <label className="toggle">
                                            <input type="checkbox" defaultChecked />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <div className="notification-setting">
                                        <div className="setting-info">
                                            <h3>Ofertas y Promociones</h3>
                                            <p>Entérate de las mejores ofertas de tus distribuidores</p>
                                        </div>
                                        <label className="toggle">
                                            <input type="checkbox" defaultChecked />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <div className="notification-setting">
                                        <div className="setting-info">
                                            <h3>Stock Bajo</h3>
                                            <p>Alertas cuando un producto tenga stock bajo</p>
                                        </div>
                                        <label className="toggle">
                                            <input type="checkbox" defaultChecked />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <div className="notification-setting">
                                        <div className="setting-info">
                                            <h3>Mensajes</h3>
                                            <p>Notificaciones de nuevos mensajes de distribuidores</p>
                                        </div>
                                        <label className="toggle">
                                            <input type="checkbox" defaultChecked />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <div className="notification-setting">
                                        <div className="setting-info">
                                            <h3>Correo Electrónico</h3>
                                            <p>Recibir resumen diario por correo</p>
                                        </div>
                                        <label className="toggle">
                                            <input type="checkbox" />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'documents' && (
                            <div className="profile-section">
                                <h2>Documentos de Verificación</h2>
                                <p className="section-description">
                                    Estos documentos son necesarios para verificar tu cuenta y cumplir con los requisitos legales.
                                </p>
                                <div className="documents-grid">
                                    <div className="document-card uploaded">
                                        <div className="document-icon">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="4" width="18" height="16" rx="2" />
                                                <circle cx="9" cy="10" r="2" />
                                                <path d="M15 8h2" />
                                                <path d="M15 12h2" />
                                                <path d="M7 16h10" />
                                            </svg>
                                        </div>
                                        <div className="document-info">
                                            <h3>Carnet (Anverso)</h3>
                                            <p className="document-status success">Verificado</p>
                                        </div>
                                        <button className="btn btn-ghost btn-sm">Ver</button>
                                    </div>
                                    <div className="document-card uploaded">
                                        <div className="document-icon">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="4" width="18" height="16" rx="2" />
                                                <line x1="7" y1="8" x2="17" y2="8" />
                                                <line x1="7" y1="12" x2="17" y2="12" />
                                                <line x1="7" y1="16" x2="12" y2="16" />
                                            </svg>
                                        </div>
                                        <div className="document-info">
                                            <h3>Carnet (Reverso)</h3>
                                            <p className="document-status success">Verificado</p>
                                        </div>
                                        <button className="btn btn-ghost btn-sm">Ver</button>
                                    </div>
                                    <div className="document-card pending">
                                        <div className="document-icon">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                <polyline points="14 2 14 8 20 8" />
                                                <line x1="16" y1="13" x2="8" y2="13" />
                                                <line x1="16" y1="17" x2="8" y2="17" />
                                            </svg>
                                        </div>
                                        <div className="document-info">
                                            <h3>Licencia de Funcionamiento</h3>
                                            <p className="document-status warning">Pendiente</p>
                                        </div>
                                        <button className="btn btn-primary btn-sm">Subir</button>
                                    </div>
                                    <div className="document-card">
                                        <div className="document-icon">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                <polyline points="14 2 14 8 20 8" />
                                                <line x1="12" y1="18" x2="12" y2="12" />
                                                <line x1="9" y1="15" x2="15" y2="15" />
                                            </svg>
                                        </div>
                                        <div className="document-info">
                                            <h3>NIT (Documento)</h3>
                                            <p className="document-status">No subido</p>
                                        </div>
                                        <button className="btn btn-secondary btn-sm">Subir</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Password Modal */}
            {showPasswordModal && (
                <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
                    <div className="modal animate-scale-in" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Cambiar Contraseña</h2>
                            <button className="modal-close" onClick={() => setShowPasswordModal(false)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group">
                                <label className="input-label">Contraseña Actual</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    className="input"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Nueva Contraseña</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    className="input"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Confirmar Nueva Contraseña</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="input"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowPasswordModal(false)}>
                                Cancelar
                            </button>
                            <button className="btn btn-primary" onClick={handlePasswordSave}>
                                Guardar Contraseña
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
