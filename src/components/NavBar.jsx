import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHome } from 'react-icons/fa';
import { Button } from '@mui/material';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link to="/" className="flex items-center">
            <FaHome className="mr-2" /> E-Commerce App
          </Link>
        </div>

        <div className="space-x-4">
          {/* Adding the new links */}
          <Link to="/" className="text-white hover:text-gray-400">
            Home
          </Link>
          <Link to="/products" className="text-white hover:text-gray-400">
            Products
          </Link>
          <Link to="/about" className="text-white hover:text-gray-400">
            About
          </Link>
          <Link to="/contact" className="text-white hover:text-gray-400">
            Contact
          </Link>
          <Link to="/login" className="text-white hover:text-gray-400">
            Login
          </Link>

          {/* Cart Button */}
          <Link to="/cart">
            <Button variant="contained" color="primary" startIcon={<FaShoppingCart />}>
              Cart
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
