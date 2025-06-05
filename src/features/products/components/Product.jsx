import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../common/contexts/CartContext";

const Product = ({ product, className = "" }) => {
  const { handleAddToCart } = useCart();

  // Simple star rating renderer
  const renderRating = (rating, count) => (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`${
              star <= Math.round(rating)
                ? "text-yellow-400"
                : "text-gray-300"
            } fill-current w-4 h-4`}
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
      <span className="text-xs text-gray-500">({count})</span>
    </div>
  );

  return (
    <div
      className={`bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-all duration-300 ease-in-out group relative ${className} 
      hover:-translate-y-1`}
    >
      <Link
        to={`/product/${product.productId}`}
        className="relative w-full pt-[85%] block overflow-hidden bg-gray-100"
      >
        <img
          src={product.image}
          alt={product.productName}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 bg-green-100/90 text-green-700 text-xs font-medium rounded-full shadow-sm">
              {product.discount}% OFF
            </span>
          </div>
        )}
      </Link>

      <div className="p-3">
        <h3 className="text-gray-800 font-medium mb-1 h-10 line-clamp-2 text-sm">
          <Link
            to={`/product/${product.productId}`}
            className="hover:text-indigo-600 transition-colors decoration-2 hover:underline underline-offset-4"
          >
            {product.productName}
          </Link>
        </h3>

        <div className="mb-2">
          {renderRating(product.averageRating || 4.2, product.ratingCount || 38)}
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-bold text-indigo-600">
            ${product.specialPrice.toFixed(2)}
          </span>
          {product.price !== product.specialPrice && (
            <span className="text-xs line-through text-gray-400">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <button
          className="w-full bg-indigo-600 text-white py-2 px-3 rounded-md text-sm
                  hover:bg-indigo-700 transition-all duration-200 shadow-sm 
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