import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import { Toaster } from "react-hot-toast";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage"; // Import login page
import { ProductsProvider } from "./contexts/ProductsContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // Import AuthContext
import {SignupPage} from './pages/SignupPage'
// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
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
            {/* Login route */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* About, Contact, Cart pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<CartPage />} />

            {/* Example of private route in future */}
            {/* <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
