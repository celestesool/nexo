import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

export default function Register() {
    const [searchParams] = useSearchParams();
    const tipoInicial = searchParams.get('tipo') || 'pulperia';

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        userType: tipoInicial,
        // Datos basicos
        nombre: '',
        email: '',
        telefono: '',
        password: '',
        confirmPassword: '',
        // Datos adicionales pulperia
        propietario: '',
        direccion: '',
        nit: '',
        // Datos adicionales distribuidor
        representante: '',
        categorias: []
    });
    const [error, setError] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const { register, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const validateStep1 = () => {
        if (!formData.nombre || !formData.email || !formData.password) {
            setError('Por favor completa todos los campos obligatorios');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Las contrasenas no coinciden');
            return false;
        }
        if (formData.password.length < 6) {
            setError('La contrasena debe tener al menos 6 caracteres');
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (validateStep1()) {
            setStep(2);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!acceptTerms) {
            setError('Debes aceptar los terminos y condiciones');
            return;
        }

        try {
            await register(formData, formData.userType);
            if (formData.userType === 'pulperia') {
                navigate('/dashboard');
            } else {
                navigate('/empresa/dashboard');
            }
        } catch (err) {
            setError('Error al registrar. Intenta de nuevo.');
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-container">
                <div className="auth-left auth-left-wide">
                    <Link to="/" className="auth-logo">
                        <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
                            <rect width="32" height="32" rx="8" fill="currentColor" />
                            <path d="M8 12L16 20L24 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 20L16 12L24 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Nexo</span>
                    </Link>

                    <div className="auth-content animate-fade-in-up">
                        <div className="auth-steps">
                            <div className={`auth-step ${step >= 1 ? 'active' : ''}`}>
                                <span className="auth-step-number">1</span>
                                <span className="auth-step-label">Datos basicos</span>
                            </div>
                            <div className="auth-step-line"></div>
                            <div className={`auth-step ${step >= 2 ? 'active' : ''}`}>
                                <span className="auth-step-number">2</span>
                                <span className="auth-step-label">Informacion del negocio</span>
                            </div>
                        </div>

                        <h1 className="auth-title">Crear cuenta</h1>
                        <p className="auth-subtitle">
                            {step === 1
                                ? 'Ingresa tus datos para comenzar'
                                : 'Cuentanos sobre tu negocio'}
                        </p>

                        {step === 1 && (
                            <>
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
                                        Soy Pulpero
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
                                        Soy Distribuidor
                                    </button>
                                </div>

                                <form className="auth-form">
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
                                        <label className="input-label" htmlFor="nombre">
                                            {formData.userType === 'pulperia' ? 'Nombre de la pulperia' : 'Nombre de la empresa'} *
                                        </label>
                                        <input
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            className="input"
                                            placeholder={formData.userType === 'pulperia' ? 'Mi Pulperia' : 'Distribuidora XYZ'}
                                            value={formData.nombre}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="auth-form-row">
                                        <div className="input-group">
                                            <label className="input-label" htmlFor="email">Correo electronico *</label>
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
                                            <label className="input-label" htmlFor="telefono">Telefono</label>
                                            <input
                                                type="tel"
                                                id="telefono"
                                                name="telefono"
                                                className="input"
                                                placeholder="+591 71234567"
                                                value={formData.telefono}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="auth-form-row">
                                        <div className="input-group">
                                            <label className="input-label" htmlFor="password">Contrasena *</label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                className="input"
                                                placeholder="Minimo 6 caracteres"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label className="input-label" htmlFor="confirmPassword">Confirmar contrasena *</label>
                                            <input
                                                type="password"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                className="input"
                                                placeholder="Repite tu contrasena"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <button type="button" onClick={handleNext} className="btn btn-primary btn-lg w-full">
                                        Continuar
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                            <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </button>
                                </form>
                            </>
                        )}

                        {step === 2 && (
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

                                {formData.userType === 'pulperia' ? (
                                    <>
                                        <div className="input-group">
                                            <label className="input-label" htmlFor="propietario">Nombre del propietario</label>
                                            <input
                                                type="text"
                                                id="propietario"
                                                name="propietario"
                                                className="input"
                                                placeholder="Juan Perez"
                                                value={formData.propietario}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label className="input-label" htmlFor="direccion">Direccion del negocio</label>
                                            <input
                                                type="text"
                                                id="direccion"
                                                name="direccion"
                                                className="input"
                                                placeholder="Calle, Numero, Zona"
                                                value={formData.direccion}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label className="input-label" htmlFor="nit">NIT (opcional)</label>
                                            <input
                                                type="text"
                                                id="nit"
                                                name="nit"
                                                className="input"
                                                placeholder="1234567890"
                                                value={formData.nit}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="input-group">
                                            <label className="input-label" htmlFor="representante">Representante legal</label>
                                            <input
                                                type="text"
                                                id="representante"
                                                name="representante"
                                                className="input"
                                                placeholder="Nombre completo"
                                                value={formData.representante}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label className="input-label" htmlFor="direccion">Direccion de la empresa</label>
                                            <input
                                                type="text"
                                                id="direccion"
                                                name="direccion"
                                                className="input"
                                                placeholder="Direccion completa"
                                                value={formData.direccion}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label className="input-label" htmlFor="nit">NIT de la empresa</label>
                                            <input
                                                type="text"
                                                id="nit"
                                                name="nit"
                                                className="input"
                                                placeholder="1234567890"
                                                value={formData.nit}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </>
                                )}

                                <label className="auth-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={acceptTerms}
                                        onChange={(e) => setAcceptTerms(e.target.checked)}
                                    />
                                    <span>
                                        Acepto los <Link to="/terminos" className="auth-link">terminos y condiciones</Link> y
                                        la <Link to="/privacidad" className="auth-link">politica de privacidad</Link>
                                    </span>
                                </label>

                                <div className="auth-form-buttons">
                                    <button type="button" onClick={() => setStep(1)} className="btn btn-secondary btn-lg">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="19" y1="12" x2="5" y2="12" />
                                            <polyline points="12 19 5 12 12 5" />
                                        </svg>
                                        Volver
                                    </button>
                                    <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
                                        {isLoading ? (
                                            <span className="auth-loading"></span>
                                        ) : (
                                            'Crear Cuenta'
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}

                        <p className="auth-footer">
                            Ya tienes cuenta? <Link to="/login" className="auth-link">Inicia sesion</Link>
                        </p>
                    </div>
                </div>

                <div className="auth-right hide-mobile">
                    <div className="auth-right-content">
                        <h2 className="auth-right-title">Unete a Nexo</h2>
                        <p className="auth-right-description">
                            Miles de negocios ya optimizan su cadena de suministro con nuestra plataforma.
                        </p>
                        <div className="auth-testimonial">
                            <p className="auth-testimonial-text">
                                "Desde que uso Nexo ahorro hasta 20% en mis compras mensuales.
                                Puedo comparar precios y hacer pedidos cuando tengo tiempo."
                            </p>
                            <div className="auth-testimonial-author">
                                <div className="auth-testimonial-avatar">JM</div>
                                <div>
                                    <span className="auth-testimonial-name">Jose Martinez</span>
                                    <span className="auth-testimonial-role">Pulperia El Sol</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
