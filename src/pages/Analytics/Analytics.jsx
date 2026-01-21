import { useState } from 'react';
import { productos, pedidosEjemplo } from '../../data/mockData';
import './Analytics.css';

export default function Analytics() {
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    // Mock data para predicciones
    const predictions = {
        nextWeekDemand: [
            { productoId: 1, nombre: 'Coca Cola 2L', demandaEstimada: 48, confianza: 92, tendencia: 'up' },
            { productoId: 2, nombre: 'Arroz Grano de Oro 1kg', demandaEstimada: 36, confianza: 88, tendencia: 'stable' },
            { productoId: 3, nombre: 'Aceite Fino 1L', demandaEstimada: 24, confianza: 85, tendencia: 'up' },
            { productoId: 4, nombre: 'Leche PIL 1L', demandaEstimada: 60, confianza: 90, tendencia: 'down' },
            { productoId: 5, nombre: 'Azucar Bermejo 1kg', demandaEstimada: 30, confianza: 87, tendencia: 'stable' },
        ],
        restockAlerts: [
            { producto: 'Aceite Fino 1L', diasRestantes: 3, urgencia: 'alta', cantidadSugerida: 24 },
            { producto: 'Leche PIL 1L', diasRestantes: 5, urgencia: 'media', cantidadSugerida: 48 },
            { producto: 'Fideos Carozzi 400g', diasRestantes: 7, urgencia: 'baja', cantidadSugerida: 20 },
        ],
        bestDays: [
            { dia: 'Sabado', ventas: 1250, porcentaje: 22 },
            { dia: 'Domingo', ventas: 1100, porcentaje: 19 },
            { dia: 'Viernes', ventas: 950, porcentaje: 17 },
            { dia: 'Lunes', ventas: 800, porcentaje: 14 },
            { dia: 'Jueves', ventas: 750, porcentaje: 13 },
            { dia: 'Miercoles', ventas: 500, porcentaje: 9 },
            { dia: 'Martes', ventas: 350, porcentaje: 6 },
        ],
        categoryTrends: [
            { categoria: 'Bebidas', tendencia: 15, direccion: 'up' },
            { categoria: 'Lacteos', tendencia: 8, direccion: 'up' },
            { categoria: 'Abarrotes', tendencia: -3, direccion: 'down' },
            { categoria: 'Limpieza', tendencia: 12, direccion: 'up' },
        ],
        monthlyPrediction: {
            ventasEstimadas: 28500,
            gastosEstimados: 22000,
            margenEstimado: 6500,
            crecimiento: 12
        },
        savingsOpportunities: [
            { producto: 'Coca Cola 2L', distribuidorActual: 'Distribuidora Central', distribuidorMejor: 'Mayorista del Este', ahorroPotencial: 45 },
            { producto: 'Arroz Grano de Oro', distribuidorActual: 'Mayorista del Este', distribuidorMejor: 'Distribuidora Central', ahorroPotencial: 30 },
        ]
    };

    const getTrendIcon = (direction) => {
        if (direction === 'up') {
            return (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                </svg>
            );
        } else if (direction === 'down') {
            return (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                    <polyline points="17 18 23 18 23 12" />
                </svg>
            );
        }
        return (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
        );
    };

    return (
        <main className="analytics-page">
            <div className="analytics-container">
                {/* Header */}
                <div className="analytics-header animate-fade-in-up">
                    <div>
                        <h1 className="analytics-title">Analisis Predictivo</h1>
                        <p className="analytics-subtitle">Predicciones basadas en tu historial de compras y ventas</p>
                    </div>
                    <div className="period-selector">
                        <button
                            className={`period-btn ${selectedPeriod === 'week' ? 'active' : ''}`}
                            onClick={() => setSelectedPeriod('week')}
                        >
                            Semana
                        </button>
                        <button
                            className={`period-btn ${selectedPeriod === 'month' ? 'active' : ''}`}
                            onClick={() => setSelectedPeriod('month')}
                        >
                            Mes
                        </button>
                        <button
                            className={`period-btn ${selectedPeriod === 'quarter' ? 'active' : ''}`}
                            onClick={() => setSelectedPeriod('quarter')}
                        >
                            Trimestre
                        </button>
                    </div>
                </div>

                {/* Prediction Summary */}
                <div className="prediction-summary animate-fade-in-up delay-100">
                    <div className="prediction-card prediction-card-highlight">
                        <div className="prediction-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                <polyline points="17 6 23 6 23 12" />
                            </svg>
                        </div>
                        <div className="prediction-content">
                            <span className="prediction-value">Bs. {predictions.monthlyPrediction.ventasEstimadas.toLocaleString()}</span>
                            <span className="prediction-label">Ventas Estimadas</span>
                        </div>
                        <span className="prediction-badge positive">+{predictions.monthlyPrediction.crecimiento}%</span>
                    </div>

                    <div className="prediction-card">
                        <div className="prediction-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                        </div>
                        <div className="prediction-content">
                            <span className="prediction-value">Bs. {predictions.monthlyPrediction.gastosEstimados.toLocaleString()}</span>
                            <span className="prediction-label">Gastos Estimados</span>
                        </div>
                    </div>

                    <div className="prediction-card">
                        <div className="prediction-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="1" x2="12" y2="23" />
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </div>
                        <div className="prediction-content">
                            <span className="prediction-value">Bs. {predictions.monthlyPrediction.margenEstimado.toLocaleString()}</span>
                            <span className="prediction-label">Margen Estimado</span>
                        </div>
                    </div>
                </div>

                <div className="analytics-grid">
                    {/* Restock Alerts */}
                    <div className="analytics-section animate-fade-in-up delay-200">
                        <div className="section-header">
                            <h2 className="section-title">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                    <line x1="12" y1="9" x2="12" y2="13" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                                Alertas de Reabastecimiento
                            </h2>
                        </div>
                        <div className="restock-list">
                            {predictions.restockAlerts.map((alert, index) => (
                                <div key={index} className={`restock-item urgency-${alert.urgencia}`}>
                                    <div className="restock-info">
                                        <span className="restock-product">{alert.producto}</span>
                                        <span className="restock-days">Se agota en {alert.diasRestantes} dias</span>
                                    </div>
                                    <div className="restock-action">
                                        <span className="restock-qty">Pedir: {alert.cantidadSugerida} und.</span>
                                        <button className="btn btn-sm btn-primary">Pedir</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Demand Prediction */}
                    <div className="analytics-section animate-fade-in-up delay-300">
                        <div className="section-header">
                            <h2 className="section-title">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                Demanda Proxima Semana
                            </h2>
                        </div>
                        <div className="demand-list">
                            {predictions.nextWeekDemand.map((item, index) => (
                                <div key={index} className="demand-item">
                                    <span className="demand-rank">{index + 1}</span>
                                    <div className="demand-info">
                                        <span className="demand-product">{item.nombre}</span>
                                        <div className="demand-meta">
                                            <span className="demand-qty">{item.demandaEstimada} unidades</span>
                                            <span className="demand-confidence">{item.confianza}% confianza</span>
                                        </div>
                                    </div>
                                    <div className={`demand-trend trend-${item.tendencia}`}>
                                        {getTrendIcon(item.tendencia)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Best Days Chart */}
                <div className="analytics-section full-width animate-fade-in-up delay-400">
                    <div className="section-header">
                        <h2 className="section-title">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            Mejores Dias de Venta
                        </h2>
                        <span className="section-note">Basado en los ultimos 3 meses</span>
                    </div>
                    <div className="best-days-chart">
                        {predictions.bestDays.map((day, index) => (
                            <div key={index} className="day-bar-wrapper">
                                <div className="day-bar-container">
                                    <div
                                        className="day-bar-fill"
                                        style={{ height: `${(day.porcentaje / 22) * 100}%` }}
                                    >
                                        <span className="day-bar-value">{day.porcentaje}%</span>
                                    </div>
                                </div>
                                <span className="day-bar-label">{day.dia.slice(0, 3)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="analytics-grid">
                    {/* Category Trends */}
                    <div className="analytics-section animate-fade-in-up delay-500">
                        <div className="section-header">
                            <h2 className="section-title">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="20" x2="18" y2="10" />
                                    <line x1="12" y1="20" x2="12" y2="4" />
                                    <line x1="6" y1="20" x2="6" y2="14" />
                                </svg>
                                Tendencia por Categoria
                            </h2>
                        </div>
                        <div className="trends-list">
                            {predictions.categoryTrends.map((trend, index) => (
                                <div key={index} className="trend-item">
                                    <span className="trend-category">{trend.categoria}</span>
                                    <div className={`trend-value ${trend.direccion}`}>
                                        {getTrendIcon(trend.direccion)}
                                        <span>{trend.tendencia > 0 ? '+' : ''}{trend.tendencia}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Savings Opportunities */}
                    <div className="analytics-section animate-fade-in-up delay-600">
                        <div className="section-header">
                            <h2 className="section-title">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                    <line x1="9" y1="9" x2="9.01" y2="9" />
                                    <line x1="15" y1="9" x2="15.01" y2="9" />
                                </svg>
                                Oportunidades de Ahorro
                            </h2>
                        </div>
                        <div className="savings-list">
                            {predictions.savingsOpportunities.map((item, index) => (
                                <div key={index} className="savings-item">
                                    <div className="savings-info">
                                        <span className="savings-product">{item.producto}</span>
                                        <span className="savings-detail">
                                            Cambiar de {item.distribuidorActual} a {item.distribuidorMejor}
                                        </span>
                                    </div>
                                    <div className="savings-amount">
                                        <span>Ahorras</span>
                                        <strong>Bs. {item.ahorroPotencial}/mes</strong>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="savings-total">
                            Ahorro potencial total: <strong>Bs. 75/mes</strong>
                        </p>
                    </div>
                </div>

                {/* AI Insights */}
                <div className="ai-insights animate-fade-in-up delay-700">
                    <div className="ai-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                            <path d="M12 2a10 10 0 0 1 10 10" />
                            <circle cx="12" cy="12" r="6" />
                            <circle cx="12" cy="12" r="2" />
                        </svg>
                    </div>
                    <div className="ai-content">
                        <h3>Recomendacion Inteligente</h3>
                        <p>
                            Basado en tu historial, te sugerimos aumentar el stock de <strong>bebidas</strong> esta semana.
                            Las ventas de fin de semana han crecido un 15% y el proximo sabado es dia de pago.
                            Considera hacer un pedido anticipado el jueves para aprovechar mejores precios.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
