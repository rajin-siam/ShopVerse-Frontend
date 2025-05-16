import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ productName }) => {
  return (
    <nav className="flex mb-8 text-sm text-gray-500">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
        </li>
        <li className="flex items-center">
          <svg className="h-4 w-4 mx-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </li>
        <li>
          <Link to="/products" className="hover:text-indigo-600 transition-colors">
            Products
          </Link>
        </li>
        <li className="flex items-center">
          <svg className="h-4 w-4 mx-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </li>
        <li className="text-gray-800 font-medium truncate max-w-xs">
          {productName}
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
