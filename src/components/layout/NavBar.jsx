import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaHome } from "react-icons/fa";

/**
 * NavBar Component
 *
 * A responsive navigation bar for the e-commerce application.
 * Includes:
 * - Logo linking to the homepage
 * - Desktop and mobile navigation links (Home, Products, About, Contact, Login)
 * - Cart icon that links to the cart page
 * - Responsive mobile menu toggle button (not fully functional yet)
 *
 * Styling is handled using Tailwind CSS with support for dark mode.
 *
 * @returns {JSX.Element} A responsive top navigation bar component
 */
const NavBar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 antialiased border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-xl px-4 mx-auto py-4">
        <div className="flex items-center justify-between">
          {/* Left Section: Logo and Desktop Nav Links */}
          <div className="flex items-center space-x-8">
            {/* Logo that links to the home page */}
            <div className="shrink-0">
              <Link
                to="/"
                className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 dark:text-white dark:hover:text-indigo-400 transition-colors"
              >
                <FaHome className="w-6 h-6" />
                <span className="text-xl font-bold hidden sm:inline">
                  E-Commerce App
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <ul className="hidden lg:flex items-center gap-6">
              {/* Home Link */}
              <li>
                <NavLink
                  to="/"
                  exact
                  className={({ isActive }) =>
                    `text-sm font-medium ${
                      isActive
                        ? "text-indigo-700 dark:text-indigo-400"
                        : "text-gray-900 hover:text-indigo-700 dark:text-white dark:hover:text-indigo-400"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              {/* Products Link */}
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `text-sm font-medium ${
                      isActive
                        ? "text-indigo-700 dark:text-indigo-400"
                        : "text-gray-900 hover:text-indigo-700 dark:text-white dark:hover:text-indigo-400"
                    }`
                  }
                >
                  Products
                </NavLink>
              </li>
              {/* About Link */}
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `text-sm font-medium ${
                      isActive
                        ? "text-indigo-700 dark:text-indigo-400"
                        : "text-gray-900 hover:text-indigo-700 dark:text-white dark:hover:text-indigo-400"
                    }`
                  }
                >
                  About
                </NavLink>
              </li>
              {/* Contact Link */}
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `text-sm font-medium ${
                      isActive
                        ? "text-indigo-700 dark:text-indigo-400"
                        : "text-gray-900 hover:text-indigo-700 dark:text-white dark:hover:text-indigo-400"
                    }`
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Right Section: Login + Cart + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Login Button (Hidden on small screens) */}
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

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="inline-flex items-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FaShoppingCart className="w-5 h-5 text-gray-900 dark:text-white" />
              <span className="hidden sm:inline ml-2 text-sm font-medium text-gray-900 dark:text-white">
                Cart
              </span>
            </Link>

            {/* Mobile Menu Toggle Button (non-functional placeholder) */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              aria-label="Open menu"
            >
              <svg
                className="w-5 h-5 text-gray-900 dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu (Hidden by default) */}
        <div className="lg:hidden mt-4 hidden">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/"
                  exact
                  className="block text-gray-900 dark:text-white hover:text-indigo-700 dark:hover:text-indigo-400"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className="block text-gray-900 dark:text-white hover:text-indigo-700 dark:hover:text-indigo-400"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="block text-gray-900 dark:text-white hover:text-indigo-700 dark:hover:text-indigo-400"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="block text-gray-900 dark:text-white hover:text-indigo-700 dark:hover:text-indigo-400"
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className="block text-gray-900 dark:text-white hover:text-indigo-700 dark:hover:text-indigo-400"
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
