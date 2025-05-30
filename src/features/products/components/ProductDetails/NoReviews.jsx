// NoReviews.jsx
import React from "react";

const NoReviews = () => {
  return (
    <div className="text-center py-12">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
      <p className="mt-1 text-sm text-gray-500">
        Be the first to review this product.
      </p>
    </div>
  );
};

export default NoReviews;