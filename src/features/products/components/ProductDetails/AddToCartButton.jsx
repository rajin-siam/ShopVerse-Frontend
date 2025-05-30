import React from "react";

const AddToCartButton = ({ isAvailable, onAddToCart }) => {
  return (
    <div className="w-full md:w-2/3">
      <button
        onClick={onAddToCart}
        disabled={!isAvailable}
        className={`w-full py-3 px-6 rounded-lg text-base font-medium shadow-sm flex items-center justify-center
          ${
            isAvailable
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          } 
          transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      >
        <svg
          className="w-5 h-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCartButton;