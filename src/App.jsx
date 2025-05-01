import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import NavBar from "./components/layout/NavBar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoginPage from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { CheckoutPage } from "./pages/CheckoutPage.jsx"; // Updated import path
import OrderConfirmation from "./pages/OrderConfirmation"; // Add this import
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ProductsProvider } from "./contexts/ProductsContext";

function App() {
  const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
      return <div className="text-center mt-10">Loading...</div>;
    }

    return user ? children : <Navigate to="/login" />;
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
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;