import { Link } from 'react-router-dom';
import './Legal.css';

export default function Privacy() {
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
                    <h1>Política de Privacidad</h1>
                    <p className="legal-updated">Última actualización: Enero 2026</p>
                </div>

                <div className="legal-content animate-fade-in-up delay-100">
                    <section className="legal-section">
                        <h2>1. Información que Recopilamos</h2>
                        <p>
                            Recopilamos diferentes tipos de información para proporcionar y mejorar nuestro servicio:
                        </p>

                        <h3>1.1 Información Personal</h3>
                        <ul>
                            <li>Nombre completo del propietario o representante</li>
                            <li>Correo electrónico</li>
                            <li>Número de teléfono</li>
                            <li>Dirección del negocio</li>
                            <li>Fotografía de perfil</li>
                            <li>Documento de identidad (carnet anverso y reverso)</li>
                        </ul>

                        <h3>1.2 Información del Negocio</h3>
                        <ul>
                            <li>Nombre comercial</li>
                            <li>NIT (Número de Identificación Tributaria)</li>
                            <li>Licencia de funcionamiento</li>
                            <li>Categoría del negocio</li>
                        </ul>

                        <h3>1.3 Información de Uso</h3>
                        <ul>
                            <li>Historial de pedidos</li>
                            <li>Productos favoritos</li>
                            <li>Patrones de compra</li>
                            <li>Interacciones con la plataforma</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>2. Cómo Utilizamos su Información</h2>
                        <p>Utilizamos la información recopilada para:</p>
                        <ul>
                            <li>Verificar la identidad de usuarios y negocios</li>
                            <li>Procesar pedidos y transacciones</li>
                            <li>Proporcionar análisis predictivos personalizados</li>
                            <li>Enviar notificaciones relevantes sobre pedidos y ofertas</li>
                            <li>Mejorar la experiencia del usuario</li>
                            <li>Prevenir fraudes y garantizar la seguridad</li>
                            <li>Cumplir con obligaciones legales</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>3. Verificación con Inteligencia Artificial</h2>
                        <p>
                            Utilizamos tecnología de inteligencia artificial para:
                        </p>
                        <ul>
                            <li>Verificar la autenticidad de documentos de identidad</li>
                            <li>Validar información de facturación</li>
                            <li>Detectar y prevenir intentos de fraude</li>
                            <li>Comparar fotografías de perfil con documentos de identidad</li>
                        </ul>
                        <p>
                            Este proceso es automático y los datos son tratados con estricta confidencialidad.
                            En caso de verificación manual, solo personal autorizado tendrá acceso a los documentos.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>4. Compartición de Datos</h2>
                        <p>Compartimos información con:</p>
                        <ul>
                            <li><strong>Distribuidores:</strong> Información necesaria para procesar y entregar pedidos</li>
                            <li><strong>Procesadores de pago:</strong> Datos necesarios para procesar transacciones</li>
                            <li><strong>Autoridades legales:</strong> Cuando sea requerido por ley</li>
                        </ul>
                        <p>
                            No vendemos ni alquilamos su información personal a terceros para fines de marketing.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>5. Seguridad de Datos</h2>
                        <p>
                            Implementamos medidas de seguridad técnicas y organizativas para proteger su información:
                        </p>
                        <ul>
                            <li>Encriptación de datos en tránsito y en reposo</li>
                            <li>Autenticación de dos factores disponible</li>
                            <li>Acceso restringido a datos personales</li>
                            <li>Auditorías de seguridad regulares</li>
                            <li>Copias de seguridad periódicas</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>6. Retención de Datos</h2>
                        <p>
                            Conservamos su información mientras su cuenta esté activa o según sea necesario
                            para proporcionar servicios. Después de cerrar su cuenta:
                        </p>
                        <ul>
                            <li>Datos de transacciones: 5 años (requisito legal)</li>
                            <li>Documentos de identidad: 2 años después del cierre</li>
                            <li>Datos de uso: 1 año después del cierre</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>7. Sus Derechos</h2>
                        <p>Usted tiene derecho a:</p>
                        <ul>
                            <li><strong>Acceso:</strong> Solicitar una copia de sus datos personales</li>
                            <li><strong>Rectificación:</strong> Corregir datos inexactos</li>
                            <li><strong>Eliminación:</strong> Solicitar la eliminación de sus datos</li>
                            <li><strong>Portabilidad:</strong> Recibir sus datos en formato estructurado</li>
                            <li><strong>Oposición:</strong> Oponerse al procesamiento de sus datos</li>
                        </ul>
                        <p>
                            Para ejercer estos derechos, contacte a nuestro equipo de privacidad.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>8. Cookies y Tecnologías Similares</h2>
                        <p>
                            Utilizamos cookies para mejorar su experiencia, recordar preferencias y analizar
                            el uso de la plataforma. Puede configurar su navegador para rechazar cookies,
                            aunque esto puede afectar la funcionalidad del servicio.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>9. Menores de Edad</h2>
                        <p>
                            Nuestros servicios están destinados a usuarios mayores de 18 años o que tengan
                            la edad legal para operar un negocio. No recopilamos intencionalmente información
                            de menores de edad.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>10. Contacto</h2>
                        <p>
                            Para consultas sobre privacidad:
                        </p>
                        <ul>
                            <li>Email: privacidad@nexo.com</li>
                            <li>Teléfono: +591 3 123 4567</li>
                            <li>Dirección: Av. Principal 1234, Santa Cruz, Bolivia</li>
                        </ul>
                    </section>
                </div>

                <div className="legal-footer animate-fade-in-up delay-200">
                    <Link to="/terminos" className="btn btn-secondary">
                        Ver Términos y Condiciones
                    </Link>
                    <Link to="/" className="btn btn-primary">
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}
