import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../common/contexts/CartContext";

const Product = ({ product, className = "", layout = "grid" }) => {
  const { handleAddToCart } = useCart();

  if (layout === "list") {
    return (
      <div
        className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out p-4 
  hover:-translate-y-1.5 group relative ${className}`}
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Link
            to={`/product/${product.productId}`}
            className="w-full md:w-40 h-40 relative flex-shrink-0 overflow-hidden rounded-xl"
          >
            <img
              src={product.image}
              alt={product.productName}
              className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <div className="flex-1 py-4 md:py-0">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              <Link
                to={`/product/${product.productId}`}
                className="hover:text-indigo-600 transition-colors decoration-2 hover:underline underline-offset-4"
              >
                {product.productName.length > 50
                  ? product.productName.substring(0, 50) + "..."
                  : product.productName}
              </Link>
            </h3>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl font-bold text-indigo-600">
                ${product.specialPrice.toFixed(2)}
              </span>
              <span className="text-sm line-through text-gray-400">
                ${product.price.toFixed(2)}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full shadow-sm">
                {product.discount}% OFF
              </span>
            </div>
          </div>

          <button
            className="w-full md:w-auto bg-indigo-600 text-white px-6 py-3 rounded-md font-medium
                hover:bg-indigo-700 transition-colors duration-200 shadow-sm hover:shadow-md
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                transform hover:-translate-y-0.5 active:translate-y-0"
            onClick={() => handleAddToCart(product.productId, 1)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out group relative ${className}`}
    >
      <Link
        to={`/product/${product.productId}`}
        className="relative w-full pt-[100%] block overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.productName}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <span className="px-3 py-1.5 bg-green-100/95 text-green-700 text-xs font-medium rounded-full shadow-sm hover:bg-green-200/90 transition-colors">
            {product.discount}% OFF
          </span>
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-gray-800 font-medium mb-2 h-12 line-clamp-2">
          <Link
            to={`/product/${product.productId}`}
            className="hover:text-indigo-600 transition-colors decoration-2 hover:underline underline-offset-4"
          >
            {product.productName.length > 50
              ? product.productName.substring(0, 50) + "..."
              : product.productName}
          </Link>
        </h3>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg font-bold text-indigo-600 transition-transform duration-200 group-hover:scale-105 origin-left">
            ${product.specialPrice.toFixed(2)}
          </span>
          <span className="text-sm line-through text-gray-400">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <button
          className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg
                  hover:bg-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                  transform hover:-translate-y-0.5 active:translate-y-0"
          onClick={() => handleAddToCart(product.productId, 1)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
