import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

export default function Login() {
    const [searchParams] = useSearchParams();
    const tipoInicial = searchParams.get('tipo') || 'pulperia';

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userType: tipoInicial
    });
    const [error, setError] = useState('');
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError('Por favor completa todos los campos');
            return;
        }

        try {
            await login(formData.email, formData.password, formData.userType);
            if (formData.userType === 'pulperia') {
                navigate('/dashboard');
            } else {
                navigate('/empresa/dashboard');
            }
        } catch (err) {
            setError('Credenciales incorrectas');
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-container">
                <div className="auth-left">
                    <Link to="/" className="auth-logo">
                        <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
                            <rect width="32" height="32" rx="8" fill="currentColor" />
                            <path d="M8 12L16 20L24 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 20L16 12L24 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Nexo</span>
                    </Link>

                    <div className="auth-content animate-fade-in-up">
                        <h1 className="auth-title">Bienvenido de nuevo</h1>
                        <p className="auth-subtitle">Ingresa tus credenciales para continuar</p>

                        <div className="auth-type-selector">
                            <button
                                type="button"
                                className={`auth-type-btn ${formData.userType === 'pulperia' ? 'active' : ''}`}
                                onClick={() => setFormData({ ...formData, userType: 'pulperia' })}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                                Pulperia
                            </button>
                            <button
                                type="button"
                                className={`auth-type-btn ${formData.userType === 'distribuidor' ? 'active' : ''}`}
                                onClick={() => setFormData({ ...formData, userType: 'distribuidor' })}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="1" y="3" width="15" height="13" />
                                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                                    <circle cx="5.5" cy="18.5" r="2.5" />
                                    <circle cx="18.5" cy="18.5" r="2.5" />
                                </svg>
                                Distribuidor
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            {error && (
                                <div className="auth-error animate-fade-in">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" />
                                        <line x1="12" y1="16" x2="12.01" y2="16" />
                                    </svg>
                                    {error}
                                </div>
                            )}

                            <div className="input-group">
                                <label className="input-label" htmlFor="email">Correo electronico</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="input"
                                    placeholder="tu@correo.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label" htmlFor="password">Contrasena</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="input"
                                    placeholder="Tu contrasena"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="auth-options">
                                <label className="auth-checkbox">
                                    <input type="checkbox" />
                                    <span>Recordar sesion</span>
                                </label>
                                <Link to="/recuperar" className="auth-link">Olvidaste tu contrasena?</Link>
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <span className="auth-loading"></span>
                                ) : (
                                    'Iniciar Sesion'
                                )}
                            </button>
                        </form>

                        <p className="auth-footer">
                            No tienes cuenta? <Link to="/registro" className="auth-link">Registrate aqui</Link>
                        </p>
                    </div>
                </div>

                <div className="auth-right">
                    <div className="auth-right-content">
                        <h2 className="auth-right-title">Simplifica tu negocio</h2>
                        <p className="auth-right-description">
                            Conecta con los mejores distribuidores, compara precios y gestiona
                            tu inventario desde cualquier lugar.
                        </p>
                        <div className="auth-right-features">
                            <div className="auth-right-feature">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Pedidos 24/7</span>
                            </div>
                            <div className="auth-right-feature">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Comparacion de precios</span>
                            </div>
                            <div className="auth-right-feature">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Entregas programadas</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
