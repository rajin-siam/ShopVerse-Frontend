import React, { useEffect, useState } from "react";

const CategoryFilter = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          "http://localhost:8081/api/public/categories?pageNumber=0&pageSize=20&sortBy=categoryName&sortOrder=desc"
        );
        const data = await res.json();
        setCategories(data.content);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="relative w-full max-w-xs">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        Filter by Category
      </label>
      <select
        className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white shadow-sm"
        onChange={(e) => onCategorySelect(e.target.value)}
        disabled={isLoading}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.categoryId} value={category.categoryId}>
            {category.categoryName}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6">
        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default CategoryFilter;