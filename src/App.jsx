import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Pages
import Landing from './pages/Landing/Landing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Catalog from './pages/Catalog/Catalog';
import Cart from './pages/Cart/Cart';
import PulperiaDashboard from './pages/Dashboard/PulperiaDashboard';
import EmpresaDashboard from './pages/Dashboard/EmpresaDashboard';
import Orders from './pages/Orders/Orders';
import Inventory from './pages/Inventory/Inventory';
import Offers from './pages/Offers/Offers';
import Analytics from './pages/Analytics/Analytics';
import EmpresaProducts from './pages/Empresa/EmpresaProducts';
import EmpresaOrders from './pages/Empresa/EmpresaOrders';
import EmpresaOffers from './pages/Empresa/EmpresaOffers';

// Import CSS
import './pages/Orders/Orders.css';
import './pages/Inventory/Inventory.css';
import './pages/Offers/Offers.css';
import './pages/Analytics/Analytics.css';
import './pages/Empresa/EmpresaProducts.css';
import './pages/Empresa/EmpresaOrders.css';
import './pages/Empresa/EmpresaOffers.css';

// Protected Route Component
function ProtectedRoute({ children, requiredType }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requiredType && user?.tipo !== requiredType) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// Layout Component
function Layout({ children, showFooter = true }) {
  return (
    <>
      <Header />
      {children}
      {showFooter && <Footer />}
    </>
  );
}

// App Routes
function AppRoutes() {
  const { isAuthenticated, isPulperia, isDistribuidor } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <Layout>
            <Landing />
          </Layout>
        }
      />

      <Route
        path="/login"
        element={
          isAuthenticated() ? (
            <Navigate to={isPulperia() ? '/dashboard' : '/empresa/dashboard'} replace />
          ) : (
            <Login />
          )
        }
      />

      <Route
        path="/registro"
        element={
          isAuthenticated() ? (
            <Navigate to={isPulperia() ? '/dashboard' : '/empresa/dashboard'} replace />
          ) : (
            <Register />
          )
        }
      />

      <Route
        path="/catalogo"
        element={
          <Layout>
            <Catalog />
          </Layout>
        }
      />

      <Route
        path="/ofertas"
        element={
          <Layout>
            <Offers />
          </Layout>
        }
      />

      <Route
        path="/carrito"
        element={
          <Layout showFooter={false}>
            <Cart />
          </Layout>
        }
      />

      {/* Pulperia Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredType="pulperia">
            <Layout showFooter={false}>
              <PulperiaDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/pedidos"
        element={
          <ProtectedRoute requiredType="pulperia">
            <Layout showFooter={false}>
              <Orders />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/inventario"
        element={
          <ProtectedRoute requiredType="pulperia">
            <Layout showFooter={false}>
              <Inventory />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute requiredType="pulperia">
            <Layout showFooter={false}>
              <Analytics />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Empresa Routes */}
      <Route
        path="/empresa/dashboard"
        element={
          <ProtectedRoute requiredType="distribuidor">
            <Layout showFooter={false}>
              <EmpresaDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/empresa/productos"
        element={
          <ProtectedRoute requiredType="distribuidor">
            <Layout showFooter={false}>
              <EmpresaProducts />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/empresa/pedidos"
        element={
          <ProtectedRoute requiredType="distribuidor">
            <Layout showFooter={false}>
              <EmpresaOrders />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/empresa/ofertas"
        element={
          <ProtectedRoute requiredType="distribuidor">
            <Layout showFooter={false}>
              <EmpresaOffers />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route
        path="*"
        element={
          <Layout>
            <div className="coming-soon-page">
              <h1>404</h1>
              <p>Pagina no encontrada</p>
            </div>
          </Layout>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
