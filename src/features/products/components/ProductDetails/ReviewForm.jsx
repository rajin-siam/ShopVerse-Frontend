// ReviewForm.jsx
import React, { useState } from "react";

const ReviewForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    rating: initialData?.rating || 5,
    title: initialData?.title || "",
    content: initialData?.content || "",
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rating" ? parseInt(value) : value,
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Review title is required";
    }
    
    if (!formData.content.trim()) {
      newErrors.content = "Review content is required";
    } else if (formData.content.trim().length < 10) {
      newErrors.content = "Review content must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {initialData ? "Edit Your Review" : "Write a Review"}
      </h3>
      
      <form onSubmit={handleSubmit}>
        {/* Rating */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleChange({ target: { name: "rating", value: star } })}
                className="p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full"
              >
                <svg
                  className={`h-8 w-8 ${
                    star <= formData.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 15.585l-5.255 2.763 1.003-5.848-4.25-4.14 5.876-.853L10 2.227l2.626 5.28 5.876.853-4.25 4.14 1.003 5.848z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {formData.rating} out of 5 stars
            </span>
          </div>
        </div>
        
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Review Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`shadow-sm block w-full sm:text-sm rounded-md px-4 py-2 ${
              errors.title 
                ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            }`}
            placeholder="Summarize your experience"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>
        
        {/* Content */}
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Review Content
          </label>
          <textarea
            id="content"
            name="content"
            rows="4"
            value={formData.content}
            onChange={handleChange}
            className={`shadow-sm block w-full sm:text-sm rounded-md px-4 py-2 ${
              errors.content 
                ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            }`}
            placeholder="Share your thoughts about this product"
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content}</p>
          )}
        </div>
        
        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {initialData ? "Update Review" : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;