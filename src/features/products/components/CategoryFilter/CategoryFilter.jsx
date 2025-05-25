import React, { useEffect, useState } from "react";
import "./CategoryFilter.css"; // Create this CSS file

const CategoryFilter = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          "http://localhost:8081/api/public/categories?pageNumber=0&pageSize=30&sortBy=categoryName&sortOrder=desc"
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
    <div className="category-filter">
      <label className="filter-label">
        Filter by Category
      </label>
      <div className="select-wrapper">
        <select
          className={`filter-select ${isLoading ? "loading" : ""}`}
          onChange={(e) => onCategorySelect(e.target.value)}
          disabled={isLoading}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option 
              key={category.categoryId} 
              value={category.categoryId}
            >
              {category.categoryName}
            </option>
          ))}
        </select>
        
        <div className="dropdown-indicator">
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            <svg 
              className="chevron" 
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;