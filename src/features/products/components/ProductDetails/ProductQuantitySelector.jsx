// ProductQuantitySelector.jsx
import React from "react";

const ProductQuantitySelector = ({ quantity, onQuantityChange, onIncrease, onDecrease }) => {
  return (
    <div className="w-full md:w-1/3">
      <label
        htmlFor="quantity"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Quantity
      </label>
      <div className="flex rounded-md shadow-sm">
        <button
          type="button"
          className="relative inline-flex items-center justify-center px-4 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-l-md border border-gray-300 hover:bg-gray-100"
          onClick={onDecrease}
        >
          <span className="sr-only">Decrease</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          value={quantity}
          onChange={onQuantityChange}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full text-center border-gray-300 sm:text-sm"
        />
        <button
          type="button"
          className="relative inline-flex items-center justify-center px-4 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-r-md border border-gray-300 hover:bg-gray-100"
          onClick={onIncrease}
        >
          <span className="sr-only">Increase</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductQuantitySelector;