// Mock data para el MVP de Nexo
// Datos simulados de productos, distribuidores, pedidos, etc.

export const distribuidores = [
  {
    id: 1,
    nombre: "Distribuidora Central S.A.",
    logo: "https://ui-avatars.com/api/?name=DC&background=000&color=fff&size=128",
    categoria: "Multi-producto",
    calificacion: 4.8,
    entregas: 1250,
    tiempoEntrega: "24-48h",
    direccion: "Av. Principal 1234, Zona Central"
  },
  {
    id: 2,
    nombre: "Alimentos del Sur",
    logo: "https://ui-avatars.com/api/?name=AS&background=000&color=fff&size=128",
    categoria: "Alimentos",
    calificacion: 4.6,
    entregas: 890,
    tiempoEntrega: "24h",
    direccion: "Calle Sur 567, Zona Industrial"
  },
  {
    id: 3,
    nombre: "Bebidas Express",
    logo: "https://ui-avatars.com/api/?name=BE&background=000&color=fff&size=128",
    categoria: "Bebidas",
    calificacion: 4.9,
    entregas: 2100,
    tiempoEntrega: "12-24h",
    direccion: "Av. Comercial 890, Centro"
  },
  {
    id: 4,
    nombre: "Productos Básicos",
    logo: "https://ui-avatars.com/api/?name=PB&background=000&color=fff&size=128",
    categoria: "Abarrotes",
    calificacion: 4.5,
    entregas: 670,
    tiempoEntrega: "24-48h",
    direccion: "Calle Norte 234, Zona Norte"
  }
];

export const categorias = [
  { id: 1, nombre: "Bebidas", icono: "bottle" },
  { id: 2, nombre: "Lácteos", icono: "milk" },
  { id: 3, nombre: "Snacks", icono: "cookie" },
  { id: 4, nombre: "Limpieza", icono: "spray" },
  { id: 5, nombre: "Abarrotes", icono: "box" },
  { id: 6, nombre: "Higiene Personal", icono: "soap" },
  { id: 7, nombre: "Enlatados", icono: "can" },
  { id: 8, nombre: "Congelados", icono: "snowflake" }
];

export const productos = [
  // Bebidas
  {
    id: 1,
    nombre: "Coca-Cola 2L",
    categoria: "Bebidas",
    imagen: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300&h=300&fit=crop",
    precios: [
      { distribuidorId: 1, precio: 12.50, stock: 150, precioAnterior: 13.00 },
      { distribuidorId: 2, precio: 12.80, stock: 80, precioAnterior: null },
      { distribuidorId: 3, precio: 11.90, stock: 200, precioAnterior: 12.50 }
    ],
    unidadMinima: 6,
    descripcion: "Refresco de cola en presentacion de 2 litros"
  },
  {
    id: 2,
    nombre: "Pepsi 2L",
    categoria: "Bebidas",
    imagen: "https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=300&h=300&fit=crop",
    precios: [
      { distribuidorId: 1, precio: 11.80, stock: 120, precioAnterior: null },
      { distribuidorId: 3, precio: 11.50, stock: 180, precioAnterior: 12.00 }
    ],
    unidadMinima: 6,
    descripcion: "Refresco de cola en presentacion de 2 litros"
  },
  {
    id: 3,
    nombre: "Agua Mineral 1L Pack x12",
    categoria: "Bebidas",
    imagen: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&h=300&fit=crop",
    precios: [
      { distribuidorId: 1, precio: 45.00, stock: 50, precioAnterior: null },
      { distribuidorId: 2, precio: 43.50, stock: 75, precioAnterior: 46.00 },
      { distribuidorId: 3, precio: 44.00, stock: 100, precioAnterior: null }
    ],
    unidadMinima: 1,
    descripcion: "Pack de 12 botellas de agua mineral"
  },
  // Lácteos
  {
    id: 4,
    nombre: "Leche Entera 1L",
    categoria: "Lácteos",
    imagen: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop",
    precios: [
      { distribuidorId: 1, precio: 8.50, stock: 200, precioAnterior: null },
      { distribuidorId: 2, precio: 8.20, stock: 150, precioAnterior: 8.80 },
      { distribuidorId: 4, precio: 8.40, stock: 180, precioAnterior: null }
    ],
    unidadMinima: 12,
    descripcion: "Leche entera pasteurizada en carton de 1 litro"
  },
  {
    id: 5,
    nombre: "Yogurt Natural 1L",
    categoria: "Lácteos",
    imagen: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=300&h=300&fit=crop",
    precios: [
      { distribuidorId: 2, precio: 15.00, stock: 80, precioAnterior: null },
      { distribuidorId: 4, precio: 14.50, stock: 60, precioAnterior: 15.50 }
    ],
    unidadMinima: 6,
    descripcion: "Yogurt natural sin azucar agregada"
  },
  // Snacks
  {
    id: 6,
    nombre: "Papas Fritas Clasicas 150g",
    categoria: "Snacks",
    imagen: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop",
    precios: [
      { distribuidorId: 1, precio: 6.50, stock: 300, precioAnterior: null },
      { distribuidorId: 2, precio: 6.80, stock: 200, precioAnterior: null },
      { distribuidorId: 4, precio: 6.20, stock: 250, precioAnterior: 6.80 }
    ],
    unidadMinima: 12,
    descripcion: "Papas fritas sabor clasico, bolsa de 150g"
  },
  {
    id: 7,
    nombre: "Galletas de Chocolate Pack x6",
    categoria: "Snacks",
    imagen: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop",
    precios: [
      { distribuidorId: 1, precio: 18.00, stock: 100, precioAnterior: 19.50 },
      { distribuidorId: 4, precio: 17.50, stock: 120, precioAnterior: null }
    ],
    unidadMinima: 1,
    descripcion: "Pack de 6 paquetes de galletas con chips de chocolate"
  },
  // Limpieza
  {
    id: 8,
    nombre: "Detergente Líquido 3L",
    categoria: "Limpieza",
    imagen: "https://images.unsplash.com/photo-1599599810694-84d8c6c2b5b9?w=300&h=300&fit=crop",
    precios: [
      { distribuidorId: 1, precio: 35.00, stock: 80, precioAnterior: null },
      { distribuidorId: 4, precio: 33.50, stock: 100, precioAnterior: 36.00 }
    ],
    unidadMinima: 4,
    descripcion: "Detergente liquido para ropa, galon de 3 litros"
  },
  {
    id: 9,
    nombre: "Jabón de Tocador x3",
    categoria: "Higiene Personal",
    imagen: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=300&h=300&fit=crop",
    precios: [
      { distribuidorId: 1, precio: 12.00, stock: 150, precioAnterior: null },
      { distribuidorId: 2, precio: 11.50, stock: 200, precioAnterior: 12.50 },
      { distribuidorId: 4, precio: 11.80, stock: 180, precioAnterior: null }
    ],
    unidadMinima: 6,
    descripcion: "Pack de 3 jabones de tocador"
  },
  // Abarrotes
  {
    id: 10,
    nombre: "Arroz Premium 1kg",
    categoria: "Abarrotes",
    imagen: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
    precios: [
      { distribuidorId: 1, precio: 9.50, stock: 500, precioAnterior: null },
      { distribuidorId: 2, precio: 9.20, stock: 400, precioAnterior: 10.00 },
      { distribuidorId: 4, precio: 9.00, stock: 600, precioAnterior: null }
    ],
    unidadMinima: 10,
    descripcion: "Arroz de grano largo premium, bolsa de 1kg"
  },
  {
    id: 11,
    nombre: "Aceite Vegetal 1L",
    categoria: "Abarrotes",
    imagen: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop",
    precios: [
      { distribuidorId: 1, precio: 18.00, stock: 200, precioAnterior: null },
      { distribuidorId: 2, precio: 17.20, stock: 150, precioAnterior: 18.50 },
      { distribuidorId: 4, precio: 17.50, stock: 180, precioAnterior: null }
    ],
    unidadMinima: 6,
    descripcion: "Aceite vegetal de primera calidad"
  },
  {
    id: 12,
    nombre: "Azúcar Refinada 1kg",
    categoria: "Abarrotes",
    imagen: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&h=300&fit=crop",
    precios: [
      { distribuidorId: 1, precio: 7.50, stock: 400, precioAnterior: null },
      { distribuidorId: 4, precio: 7.00, stock: 500, precioAnterior: 7.80 }
    ],
    unidadMinima: 10,
    descripcion: "Azucar refinada blanca"
  }
];

export const ofertas = [
  {
    id: 1,
    productoId: 1,
    distribuidorId: 3,
    descuento: 15,
    motivo: "Promocion de temporada",
    fechaInicio: "2026-01-15",
    fechaFin: "2026-01-31",
    activa: true
  },
  {
    id: 2,
    productoId: 4,
    distribuidorId: 2,
    descuento: 10,
    motivo: "Lote proximo a vencer - Fecha: 15/02/2026",
    fechaInicio: "2026-01-20",
    fechaFin: "2026-01-28",
    activa: true
  },
  {
    id: 3,
    productoId: 10,
    distribuidorId: 4,
    descuento: 20,
    motivo: "Liquidacion de inventario",
    fechaInicio: "2026-01-18",
    fechaFin: "2026-01-25",
    activa: true
  }
];

export const pedidosEjemplo = [
  {
    id: "PED-001",
    fecha: "2026-01-20",
    estado: "entregado",
    distribuidorId: 1,
    total: 485.50,
    items: [
      { productoId: 1, cantidad: 12, precioUnitario: 12.50 },
      { productoId: 10, cantidad: 20, precioUnitario: 9.50 },
      { productoId: 8, cantidad: 4, precioUnitario: 35.00 }
    ]
  },
  {
    id: "PED-002",
    fecha: "2026-01-19",
    estado: "en_camino",
    distribuidorId: 3,
    total: 237.80,
    items: [
      { productoId: 2, cantidad: 18, precioUnitario: 11.50 },
      { productoId: 3, cantidad: 1, precioUnitario: 44.00 }
    ]
  },
  {
    id: "PED-003",
    fecha: "2026-01-18",
    estado: "procesando",
    distribuidorId: 2,
    total: 156.00,
    items: [
      { productoId: 5, cantidad: 6, precioUnitario: 14.50 },
      { productoId: 9, cantidad: 6, precioUnitario: 11.50 }
    ]
  }
];

export const ventanasTiempo = [
  { id: 1, dia: "Lunes", horaInicio: "08:00", horaFin: "12:00", label: "Lunes AM" },
  { id: 2, dia: "Lunes", horaInicio: "14:00", horaFin: "18:00", label: "Lunes PM" },
  { id: 3, dia: "Martes", horaInicio: "08:00", horaFin: "12:00", label: "Martes AM" },
  { id: 4, dia: "Martes", horaInicio: "14:00", horaFin: "18:00", label: "Martes PM" },
  { id: 5, dia: "Miercoles", horaInicio: "08:00", horaFin: "12:00", label: "Miercoles AM" },
  { id: 6, dia: "Miercoles", horaInicio: "14:00", horaFin: "18:00", label: "Miercoles PM" },
  { id: 7, dia: "Jueves", horaInicio: "08:00", horaFin: "12:00", label: "Jueves AM" },
  { id: 8, dia: "Jueves", horaInicio: "14:00", horaFin: "18:00", label: "Jueves PM" },
  { id: 9, dia: "Viernes", horaInicio: "08:00", horaFin: "12:00", label: "Viernes AM" },
  { id: 10, dia: "Viernes", horaInicio: "14:00", horaFin: "18:00", label: "Viernes PM" }
];

export const usuarioEjemplo = {
  id: 1,
  tipo: "pulperia",
  nombre: "Pulpería Don José",
  propietario: "José Martinez",
  email: "pulperia.donjose@email.com",
  telefono: "+591 71234567",
  direccion: "Calle Los Pinos 123, Zona Este",
  nit: "1234567890",
  verificado: true,
  fechaRegistro: "2025-06-15",
  avatar: "https://ui-avatars.com/api/?name=JM&background=000&color=fff&size=128"
};

export const empresaEjemplo = {
  id: 1,
  tipo: "distribuidor",
  nombre: "Distribuidora Central S.A.",
  representante: "María García",
  email: "contacto@distcentral.com",
  telefono: "+591 78901234",
  direccion: "Av. Principal 1234, Zona Central",
  nit: "9876543210",
  verificado: true,
  fechaRegistro: "2024-03-20",
  logo: "https://ui-avatars.com/api/?name=DC&background=000&color=fff&size=128",
  productosActivos: 45,
  pedidosCompletados: 1250,
  calificacion: 4.8
};

// Estadísticas de ejemplo para el dashboard de empresa
export const estadisticasEmpresa = {
  ventasHoy: 15420.50,
  pedidosHoy: 23,
  pedidosPendientes: 8,
  clientesActivos: 156,
  productosMasVendidos: [
    { productoId: 1, cantidad: 450 },
    { productoId: 10, cantidad: 380 },
    { productoId: 4, cantidad: 320 },
    { productoId: 11, cantidad: 290 },
    { productoId: 3, cantidad: 250 }
  ],
  ventasMensuales: [
    { mes: "Ago", ventas: 125000 },
    { mes: "Sep", ventas: 142000 },
    { mes: "Oct", ventas: 138000 },
    { mes: "Nov", ventas: 165000 },
    { mes: "Dic", ventas: 198000 },
    { mes: "Ene", ventas: 156000 }
  ]
};

// Estadísticas de ejemplo para el dashboard de pulpería
export const estadisticasPulperia = {
  gastosMes: 4850.00,
  pedidosMes: 12,
  ahorroMes: 320.50,
  ultimoPedido: "2026-01-20",
  productosFrecuentes: [
    { productoId: 1, cantidad: 48 },
    { productoId: 4, cantidad: 36 },
    { productoId: 10, cantidad: 30 },
    { productoId: 6, cantidad: 24 }
  ]
};
