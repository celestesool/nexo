import { Link } from 'react-router-dom';
import './Legal.css';

export default function Terms() {
    return (
        <div className="legal-page">
            <div className="container">
                <div className="legal-header animate-fade-in-up">
                    <Link to="/" className="legal-back">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Volver
                    </Link>
                    <h1>Términos y Condiciones</h1>
                    <p className="legal-updated">Última actualización: Enero 2026</p>
                </div>

                <div className="legal-content animate-fade-in-up delay-100">
                    <section className="legal-section">
                        <h2>1. Aceptación de los Términos</h2>
                        <p>
                            Al acceder y utilizar la plataforma Nexo, usted acepta estar sujeto a estos Términos y Condiciones
                            de uso. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al servicio.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>2. Descripción del Servicio</h2>
                        <p>
                            Nexo es una plataforma B2B que conecta pulperías y pequeños comercios con distribuidores mayoristas.
                            El servicio incluye:
                        </p>
                        <ul>
                            <li>Catálogo de productos con comparación de precios</li>
                            <li>Sistema de pedidos y seguimiento</li>
                            <li>Gestión de inventario</li>
                            <li>Análisis predictivo y estadísticas</li>
                            <li>Sistema de ofertas y promociones</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>3. Registro y Verificación</h2>
                        <p>
                            Para utilizar nuestros servicios, los usuarios deben:
                        </p>
                        <ul>
                            <li>Proporcionar información veraz y actualizada</li>
                            <li>Subir documentación válida de identidad (carnet de identidad anverso y reverso)</li>
                            <li>Proporcionar foto de perfil actual del propietario o representante</li>
                            <li>Documentación del negocio (NIT, licencia de funcionamiento si aplica)</li>
                            <li>Completar el proceso de verificación antes de realizar transacciones</li>
                        </ul>
                        <p>
                            Nexo utiliza inteligencia artificial para verificar la autenticidad de los documentos proporcionados.
                            Cualquier intento de fraude resultará en la suspensión inmediata de la cuenta.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>4. Obligaciones del Usuario</h2>
                        <h3>4.1 Pulperías y Comercios</h3>
                        <ul>
                            <li>Mantener información de contacto actualizada</li>
                            <li>Realizar pagos en los términos acordados</li>
                            <li>Reportar cualquier problema con los pedidos dentro de 24 horas</li>
                            <li>No utilizar la plataforma para fines ilegales</li>
                        </ul>

                        <h3>4.2 Distribuidores</h3>
                        <ul>
                            <li>Mantener información de productos y precios actualizada</li>
                            <li>Cumplir con los plazos de entrega acordados</li>
                            <li>Garantizar la calidad de los productos</li>
                            <li>Proporcionar facturas válidas por cada transacción</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>5. Política de Pagos</h2>
                        <p>
                            Los pagos se procesan a través de pasarelas de pago seguras. Nexo no almacena información
                            de tarjetas de crédito directamente. Los términos de pago específicos se acuerdan entre
                            el comprador y el distribuidor.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>6. Cancelaciones y Devoluciones</h2>
                        <p>
                            Las políticas de cancelación y devolución varían según el distribuidor. Cada distribuidor
                            debe publicar claramente sus políticas en su perfil. Nexo actúa como intermediario y
                            facilitará la resolución de disputas cuando sea necesario.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>7. Propiedad Intelectual</h2>
                        <p>
                            Todo el contenido de la plataforma, incluyendo pero no limitado a textos, gráficos, logos,
                            iconos, imágenes y software, es propiedad de Nexo o sus licenciantes y está protegido
                            por las leyes de propiedad intelectual.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>8. Limitación de Responsabilidad</h2>
                        <p>
                            Nexo no será responsable por:
                        </p>
                        <ul>
                            <li>Daños indirectos o consecuentes derivados del uso del servicio</li>
                            <li>Pérdidas comerciales o de beneficios</li>
                            <li>Calidad de los productos vendidos por distribuidores</li>
                            <li>Incumplimiento de entregas por parte de distribuidores</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>9. Modificaciones</h2>
                        <p>
                            Nexo se reserva el derecho de modificar estos términos en cualquier momento.
                            Los usuarios serán notificados de cambios significativos con al menos 30 días de anticipación.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>10. Contacto</h2>
                        <p>
                            Para cualquier consulta sobre estos términos, puede contactarnos a:
                        </p>
                        <ul>
                            <li>Email: legal@nexo.com</li>
                            <li>Teléfono: +591 3 123 4567</li>
                            <li>Dirección: Av. Principal 1234, Santa Cruz, Bolivia</li>
                        </ul>
                    </section>
                </div>

                <div className="legal-footer animate-fade-in-up delay-200">
                    <Link to="/privacidad" className="btn btn-secondary">
                        Ver Política de Privacidad
                    </Link>
                    <Link to="/" className="btn btn-primary">
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}
