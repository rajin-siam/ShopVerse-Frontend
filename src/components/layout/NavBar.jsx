import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaHome } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext"; // Update the path if needed
import {useNavigate} from "react-router-dom"


const NavBar = () => {
  const { user, logout } = useAuth(); // Get user and logout from context
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate()
  return (
    <nav className="bg-white dark:bg-gray-800 antialiased border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-xl px-4 mx-auto py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo and links */}
          <div className="flex items-center space-x-8">
            <div className="shrink-0">
              <Link to="/" className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 dark:text-white dark:hover:text-indigo-400 transition-colors">
                <FaHome className="w-6 h-6" />
                <span className="text-xl font-bold hidden sm:inline">E-Commerce App</span>
              </Link>
            </div>

            <ul className="hidden lg:flex items-center gap-6">
              <li><NavLink to="/" className={({ isActive }) => `text-sm font-medium ${isActive ? "text-indigo-700 dark:text-indigo-400" : "text-gray-900 hover:text-indigo-700 dark:text-white dark:hover:text-indigo-400"}`}>Home</NavLink></li>
              <li><NavLink to="/products" className={({ isActive }) => `text-sm font-medium ${isActive ? "text-indigo-700 dark:text-indigo-400" : "text-gray-900 hover:text-indigo-700 dark:text-white dark:hover:text-indigo-400"}`}>Products</NavLink></li>
              <li><NavLink to="/about" className={({ isActive }) => `text-sm font-medium ${isActive ? "text-indigo-700 dark:text-indigo-400" : "text-gray-900 hover:text-indigo-700 dark:text-white dark:hover:text-indigo-400"}`}>About</NavLink></li>
              <li><NavLink to="/contact" className={({ isActive }) => `text-sm font-medium ${isActive ? "text-indigo-700 dark:text-indigo-400" : "text-gray-900 hover:text-indigo-700 dark:text-white dark:hover:text-indigo-400"}`}>Contact</NavLink></li>
            </ul>
          </div>

          {/* Right: Auth & Cart */}
          <div className="flex items-center gap-4 relative">
            {/* Conditional: Login or Username Dropdown */}
            {!user ? (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hidden sm:inline text-sm font-medium ${
                    isActive
                      ? "text-indigo-700 dark:text-indigo-400"
                      : "text-gray-900 hover:text-indigo-700 dark:text-white dark:hover:text-indigo-400"
                  }`
                }
              >
                Login
              </NavLink>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                  className="text-sm font-medium text-gray-900 dark:text-white hover:text-indigo-700 dark:hover:text-indigo-400"
                >
                  {user.username} ⌄
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 border rounded shadow-lg z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                        setTimeout(() => {
                          navigate("/products");
                        }, 0);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="inline-flex items-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FaShoppingCart className="w-5 h-5 text-gray-900 dark:text-white" />
              <span className="hidden sm:inline ml-2 text-sm font-medium text-gray-900 dark:text-white">Cart</span>
            </Link>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md" aria-label="Open menu">
              <svg className="w-5 h-5 text-gray-900 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
