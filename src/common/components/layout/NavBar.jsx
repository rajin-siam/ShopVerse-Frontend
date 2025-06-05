import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaShoppingCart,
  FaHome,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".user-dropdown")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/products");
  };
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-gray-600">
            <FaHome className="w-6 h-6" />
            <span className="font-bold text-xl hidden sm:block">ShopVerse</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "text-white bg-gray-900"
                      : "text-gray-700 hover:text-gray-700 hover:bg-gray-50 "
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right side - Auth & Cart */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="text-gray-700 hover:text-gray-600">
              <div className="relative">
                <FaShoppingCart className="w-5 h-5" />
              </div>
            </Link>

            {/* Auth */}
            {!user ? (
              <Link
                to="/login"
                className="hidden sm:flex items-center space-x-1 px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
              >
                <FaUser className="w-4 h-4" />
                <span>Login</span>
              </Link>
            ) : (
              <div className="relative user-dropdown">
                <button
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 text-gray-700"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block">{user.username}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700 hover:text-indigo-600"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t py-2">
          <div className="px-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded text-sm font-medium ${
                    isActive
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}

            {!user && (
              <Link
                to="/login"
                className="block mt-2 px-3 py-2 rounded bg-gray-600 text-white hover:bg-gray-700 text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
