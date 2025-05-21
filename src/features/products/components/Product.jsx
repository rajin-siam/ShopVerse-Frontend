import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../common/contexts/CartContext";
import { Star } from "lucide-react";

const Product = ({ product, className = "", layout = "grid" }) => {
  const { handleAddToCart } = useCart();
  
  // Generate star rating display
  const renderRating = (rating, count) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => {
            let starClass = "text-gray-300"; // Empty star default
            
            if (i < fullStars) {
              starClass = "text-yellow-400"; // Full star
            } else if (i === fullStars && hasHalfStar) {
              starClass = "text-yellow-400 opacity-60"; // Half star approximation
            }
            
            return (
              <Star
                key={i}
                size={layout === "list" ? 16 : 14}
                className={`${starClass} fill-current`}
              />
            );
          })}
        </div>
        <span className="text-xs text-gray-500">({count})</span>
      </div>
    );
  };

  if (layout === "list") {
    return (
      <div
        className={`bg-white rounded-xl shadow hover:shadow-xl transition-all duration-300 ease-in-out p-4 
        group relative ${className} hover:bg-indigo-50/30`}
      >
        <div className="flex flex-col md:flex-row items-center gap-5">
          <Link
            to={`/product/${product.productId}`}
            className="w-full md:w-32 h-32 relative flex-shrink-0 overflow-hidden rounded-lg"
          >
            <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-20 transition-opacity z-10"></div>
            <img
              src={product.image}
              alt={product.productName}
              className="w-full h-full object-cover rounded-lg transition-all duration-500 group-hover:scale-110"
            />
            <div className="absolute top-2 right-2">
              <span className="px-2 py-1 bg-green-100/90 text-green-700 text-xs font-medium rounded-full shadow-sm">
                {product.discount}% OFF
              </span>
            </div>
          </Link>

          <div className="flex-1 py-2 md:py-0">
            <h3 className="text-base font-medium text-gray-800 mb-1 line-clamp-1">
              <Link
                to={`/product/${product.productId}`}
                className="hover:text-indigo-600 transition-colors decoration-2 hover:underline underline-offset-4"
              >
                {product.productName.length > 40
                  ? product.productName.substring(0, 40) + "..."
                  : product.productName}
              </Link>
            </h3>
            
            {/* Rating display */}
            <div className="mb-2">
              {renderRating(product.averageRating || 4.5, product.ratingCount || 42)}
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold text-indigo-600">
                ${product.specialPrice.toFixed(2)}
              </span>
              <span className="text-xs line-through text-gray-400">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            className="w-full md:w-auto bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium
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
  }

  return (
    <div
      className={`bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-all duration-300 ease-in-out group relative ${className} 
      hover:-translate-y-1`}
    >
      <Link
        to={`/product/${product.productId}`}
        className="relative w-full pt-[85%] block overflow-hidden bg-gray-100"
      >
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity z-10"></div>
        <img
          src={product.image}
          alt={product.productName}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 bg-green-100/90 text-green-700 text-xs font-medium rounded-full shadow-sm">
            {product.discount}% OFF
          </span>
        </div>
      </Link>
      <div className="p-3">
        <h3 className="text-gray-800 font-medium mb-1 h-10 line-clamp-2 text-sm">
          <Link
            to={`/product/${product.productId}`}
            className="hover:text-indigo-600 transition-colors decoration-2 hover:underline underline-offset-4"
          >
            {product.productName.length > 40
              ? product.productName.substring(0, 40) + "..."
              : product.productName}
          </Link>
        </h3>
        
        {/* Rating display */}
        <div className="mb-2">
          {renderRating(product.averageRating || 4.2, product.ratingCount || 38)}
        </div>
        
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-bold text-indigo-600 transition-transform duration-200 group-hover:scale-105 origin-left">
            ${product.specialPrice.toFixed(2)}
          </span>
          <span className="text-xs line-through text-gray-400">
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        <button
          className="w-full bg-indigo-600 text-white py-2 px-3 rounded-md text-sm
                  hover:bg-indigo-700 transition-all duration-200 shadow-sm 
                  transform group-hover:shadow-md
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => handleAddToCart(product.productId, 1)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;