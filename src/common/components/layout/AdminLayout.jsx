import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronRight,
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
} from "lucide-react";

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { path: "/admin/products", label: "Products", icon: <Package size={18} /> },
    {
      path: "/admin/categories",
      label: "Categories",
      icon: <Tags size={18} />,
    },
    {
      path: "/admin/orders",
      label: "Orders",
      icon: <ShoppingCart size={18} />,
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-white shadow text-gray-700 hover:bg-gray-100"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar - responsive with smooth transition */}
      <aside
        className={`
          fixed lg:static
          h-full
          bg-white
          shadow-lg
          transition-all duration-300 ease-in-out
          z-40
          ${
            sidebarOpen
              ? "w-64 translate-x-0"
              : "w-0 lg:w-16 -translate-x-full lg:translate-x-0"
          }
          overflow-hidden
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="p-4 border-b flex items-center justify-between">
            <h1
              className={`font-bold text-lg text-gray-800 ${
                !sidebarOpen && "lg:hidden"
              }`}
            >
              Admin Panel
            </h1>
            <button
              onClick={toggleSidebar}
              className="hidden lg:block text-gray-500 hover:text-gray-700"
            >
              <ChevronRight
                size={20}
                className={`transform transition-transform ${
                  sidebarOpen ? "" : "rotate-180"
                }`}
              />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="py-4 flex-grow">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center px-4 py-3 mx-2 my-1 rounded-md
                  transition-colors duration-200
                  ${
                    isActive(item.path)
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                <span className="mr-3">{item.icon}</span>
                <span className={`${!sidebarOpen && "lg:hidden"}`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Sidebar footer */}
          <div className="mt-auto p-4 border-t">
            <div
              className={`text-xs text-gray-500 ${!sidebarOpen && "lg:hidden"}`}
            >
              &copy; {new Date().getFullYear()} Admin
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`
        flex-1
        transition-all duration-300
        ${sidebarOpen ? "lg:ml-0" : "lg:ml-0"}
        p-4 md:p-6 lg:p-8
        overflow-x-hidden
      `}
      >
        <div className="bg-white shadow rounded-lg p-5 min-h-full">
          <Outlet />
        </div>
      </main>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};
