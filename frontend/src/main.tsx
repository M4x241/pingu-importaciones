import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/layout/Layout'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'
import HomePage from './pages/HomePage'
import StorePage from './pages/StorePage'
import ProductDetailPage from './pages/ProductDetailPage'
import CheckoutPage from './pages/CheckoutPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import AdminPage from './pages/AdminPage'
import BusinessPage from './pages/BusinessPage'
import ClientPage from './pages/ClientPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
      <ToastProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/tienda" element={<StorePage />} />
            <Route path="/producto/:id" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/client" element={<ClientPage />} />
        </Routes>
      </Router>
      </ToastProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
