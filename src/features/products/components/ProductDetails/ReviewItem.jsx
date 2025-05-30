// ReviewItem.jsx
import React from "react";

const ReviewItem = ({ review, isOwner, onDelete, onEdit }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            {/* Star Rating */}
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-5 w-5 ${
                    i < review.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 15.585l-5.255 2.763 1.003-5.848-4.25-4.14 5.876-.853L10 2.227l2.626 5.28 5.876.853-4.25 4.14 1.003 5.848z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
            
            {/* Review title */}
            <h3 className="ml-2 text-lg font-medium text-gray-900">
              {review.title}
            </h3>
          </div>
          
          {/* User info and date */}
          <div className="mt-1 flex items-center">
            <span className="text-sm font-medium text-gray-900">
              {review.userName}
            </span>
            <span className="mx-1 text-gray-500">•</span>
            <span className="text-sm text-gray-500">
              {formatDate(review.createdAt)}
            </span>
            {isOwner && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Your Review
              </span>
            )}
          </div>
        </div>
        
        {/* Action buttons for review owner */}
        {isOwner && (
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="inline-flex items-center p-1 border border-transparent rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
              aria-label="Edit"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                />
              </svg>
            </button>
            <button
              onClick={onDelete}
              className="inline-flex items-center p-1 border border-transparent rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600 focus:outline-none"
              aria-label="Delete"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      
      {/* Review content */}
      <div className="mt-4 text-sm text-gray-700 whitespace-pre-line">
        {review.content}
      </div>
    </div>
  );
};

export default ReviewItem;