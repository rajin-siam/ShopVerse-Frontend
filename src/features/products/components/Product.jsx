import React from "react";
import { useCart } from "../../../common/contexts/CartContext";

const Product = ({ product, className = "", layout = "grid" }) => {
  const { handleAddToCart } = useCart();

  if (layout === "list") {
    return (
      <div className={`${className}`}>
        <div className="flex items-center w-full">
          <div className="w-32 h-32 relative flex-shrink-0">
            <img
              src={product.image}
              alt={product.productName}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          </div>
          
          <div className="ml-6 flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {product.productName.length > 50
                ? product.productName.substring(0, 50) + "..."
                : product.productName}
            </h3>
            <div className="flex items-baseline gap-4 flex-col">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                ${product.specialPrice.toFixed(2)}
              </span>
              <span className="text-lg line-through text-gray-400 dark:text-gray-500">
                ${product.price.toFixed(2)}
              </span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-sm font-medium rounded-full">
                {product.discount}% OFF
              </span>
            </div>
          </div>

          <button
            className="ml-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium
                      hover:bg-indigo-700 transition-colors duration-200
                      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => handleAddToCart(product.productId, 1)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`border rounded-lg p-4 shadow-lg flex flex-col items-center ${className}`}>
      <div className="w-full aspect-square relative mb-4">
        <img
          src={product.image}
          alt={product.productName}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-center dark:text-gray-100">
        {product.productName.length > 50
          ? product.productName.substring(0, 50) + "..."
          : product.productName}
      </h3>
      <div className="text-xl font-bold mb-2 dark:text-indigo-400">
        ${product.specialPrice.toFixed(2)}
      </div>
      <div className="text-sm line-through text-gray-500 dark:text-gray-400">
        ${product.price.toFixed(2)}
      </div>
      <div className="text-sm text-green-500 dark:text-green-400">
        {product.discount}% off
      </div>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md
                  hover:bg-blue-600 transition-colors dark:bg-blue-600
                  dark:hover:bg-blue-700"
        onClick={() => handleAddToCart(product.productId, 1)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;