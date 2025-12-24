import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OfferProvider } from './context/OfferContext';
import { HeroProvider } from './context/HeroContext';
import { CollectionProvider } from './context/CollectionContext';
import { SettingsProvider } from './context/SettingsContext';
import { ProductProvider } from './context/ProductContext';
import { OrderProvider } from './context/OrderContext';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import RecoverPassword from './pages/RecoverPassword';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';

// Admin Pages
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProducts from './pages/Admin/AdminProducts';
import ProductForm from './pages/Admin/ProductForm';
import AdminOffers from './pages/Admin/AdminOffers';
import AdminHeroSlider from './pages/Admin/AdminHeroSlider';
import AdminCollections from './pages/Admin/AdminCollections';
import AdminSettings from './pages/Admin/AdminSettings';
import AdminSales from './pages/Admin/AdminSales';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <AuthProvider>
      <HeroProvider>
        <OfferProvider>
          <ProductProvider>
            <CartProvider>
              <CollectionProvider>
                <SettingsProvider>
                  <OrderProvider>
                    <Router>
                      <div className="app-wrapper">
                        <ScrollToTop />
                        <Navbar />
                        <main>
                          <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/product/:id" element={<ProductDetail />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/recover" element={<RecoverPassword />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/faq" element={<FAQ />} />

                            {/* Admin Routes */}
                            <Route path="/admin" element={
                              <ProtectedRoute role="admin">
                                <AdminLayout />
                              </ProtectedRoute>
                            }>
                              <Route index element={<AdminDashboard />} />
                              <Route path="products" element={<AdminProducts />} />
                              <Route path="products/new" element={<ProductForm />} />
                              <Route path="products/edit/:id" element={<ProductForm />} />
                              <Route path="offers" element={<AdminOffers />} />
                              <Route path="hero-slider" element={<AdminHeroSlider />} />
                              <Route path="collections" element={<AdminCollections />} />
                              <Route path="settings" element={<AdminSettings />} />
                              <Route path="sales" element={<AdminSales />} />
                            </Route>
                          </Routes>
                        </main>
                        <Footer />
                      </div>
                    </Router>
                  </OrderProvider>
                </SettingsProvider>
              </CollectionProvider>
            </CartProvider>
          </ProductProvider>
        </OfferProvider>
      </HeroProvider>
    </AuthProvider>
  );
}

export default App;
