import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4">
        <nav className="space-y-2">
          <Link to="/admin" className="block text-white hover:bg-gray-700 p-2 rounded">
            Dashboard
          </Link>
          <Link to="/admin/products" className="block text-white hover:bg-gray-700 p-2 rounded">
            Products Management
          </Link>
          <Link to="/admin/categories" className="block text-white hover:bg-gray-700 p-2 rounded">
            Categories Management
          </Link>
          <Link to="/admin/orders" className="block text-white hover:bg-gray-700 p-2 rounded">
            Orders Management
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};
