import React from "react";
import { Link } from "react-router-dom";
import { LogIn, ArrowRight } from "lucide-react";

const AuthRequired = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm text-center">
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-indigo-100 rounded-full">
            <LogIn size={48} className="text-indigo-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Authentication Required</h2>
        <p className="text-gray-600 mb-8">Please log in to view your cart and continue shopping.</p>
        <Link
          to="/login"
          className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Log In
          <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default AuthRequired;