import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import { Toaster } from 'react-hot-toast';
import About from './pages/About'
import Contact from './pages/Contact'
import ProductsPage from './pages/ProductsPage'; 
function App() {
  return (
    <Router>
      <Toaster />
      <NavBar />
      <div className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<About />} /> 
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
