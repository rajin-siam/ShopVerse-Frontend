import React from "react";

const ProductDescription = ({ descriptionPoints }) => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
        Product Description
      </h2>
      <div className="prose max-w-none">
        {descriptionPoints.length > 0 ? (
          <ul className="space-y-4">
            {descriptionPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">{point.trim()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">
            No description available for this product.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;