import React from "react";
import { useCart } from "../../../common/contexts/CartContext";

const Product = ({ product, className = "", layout = "grid" }) => {
  const { handleAddToCart } = useCart();

  if (layout === "list") {
    return (
      <div className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 ${className}`}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-40 h-40 relative flex-shrink-0">
            <img
              src={product.image}
              alt={product.productName}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          
          <div className="flex-1 py-4 md:py-0">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              {product.productName.length > 50
                ? product.productName.substring(0, 50) + "..."
                : product.productName}
            </h3>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl font-bold text-indigo-600">
                ${product.specialPrice.toFixed(2)}
              </span>
              <span className="text-sm line-through text-gray-400">
                ${product.price.toFixed(2)}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                {product.discount}% OFF
              </span>
            </div>
          </div>

          <button
            className="w-full md:w-auto bg-indigo-600 text-white px-6 py-3 rounded-md font-medium
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
    <div className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
      <div className="relative w-full pt-[100%]">
        <img
          src={product.image}
          alt={product.productName}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            {product.discount}% OFF
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-gray-800 font-medium mb-2 h-12 line-clamp-2">
          {product.productName.length > 50
            ? product.productName.substring(0, 50) + "..."
            : product.productName}
        </h3>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg font-bold text-indigo-600">
            ${product.specialPrice.toFixed(2)}
          </span>
          <span className="text-sm line-through text-gray-400">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <button
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md
                    hover:bg-indigo-700 transition-colors text-sm font-medium"
          onClick={() => handleAddToCart(product.productId, 1)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;