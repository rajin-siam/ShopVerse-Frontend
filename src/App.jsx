import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import NavBar from "./common/components/layout/NavBar.jsx";
import HomePage from "./pages/HomePage";
import ProductsPage from "./features/products/pages/ProductsPage.jsx";
import CartPage from "./features/cart/pages/CartPage.jsx";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoginPage from "./features/auth/pages/LoginPage.jsx";
import { SignupPage } from "./features/auth/pages/SignupPage.jsx";
import { CheckoutPage } from "./features/checkout/pages/CheckoutPage.jsx"; // Updated import path
import OrderConfirmation from "./features/checkout/pages/OrderConfirmation.jsx"; // Add this import
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./common/contexts/AuthContext.jsx";
import { CartProvider } from "./common/contexts/CartContext.jsx";
import { ProductsProvider } from "./common/contexts/ProductsContext.jsx";
import { AdminLayout } from "./common/components/layout/AdminLayout.jsx";
import AdminDashboardPage from "./features/admin/pages/AdminDashboardPage.jsx";
import ProductsManagementPage from "./features/admin/pages/ProductsManagementPage.jsx";
import CategoriesManagementPage from "./features/admin/pages/CategoriesManagementPage.jsx";
import OrderManagement from "./features/admin/components/Orders/OrderManagement.jsx";

function App() {
  const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
      return <div className="text-center mt-10">Loading...</div>;
    }

    return user ? children : <Navigate to="/login" />;
  };

  const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
      return <div className="text-center p-8">Checking permissions...</div>;
    }
    // Redirect to home if not admin
    if (!user || !user.roles.includes("ROLE_ADMIN")) {
      return <Navigate to="/" replace />;
    }

    return children;
  };
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Toaster />
          <NavBar />
          <div className="container mx-auto px-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/products"
                element={
                  <ProductsProvider>
                    <ProductsPage />
                  </ProductsProvider>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Protected Routes */}
              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <CartPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <PrivateRoute>
                    <CheckoutPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/confirmation/:orderId"
                element={
                  <PrivateRoute>
                    <OrderConfirmation />
                  </PrivateRoute>
                }
              />

              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }
              >
                <Route index element={<AdminDashboardPage />} />
                <Route path="products" element={<ProductsManagementPage />} />
                <Route
                  path="categories"
                  element={<CategoriesManagementPage />}
                />
                <Route path="orders" element={<OrderManagement />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
