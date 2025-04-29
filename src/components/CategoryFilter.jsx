import React, { useEffect, useState } from "react";

const CategoryFilter = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/public/categories?pageNumber=0&pageSize=10&sortBy=categoryName&sortOrder=desc");
        const data = await res.json();
        setCategories(data.content); // because it's paginated
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="mb-6">
      <label className="block font-semibold mb-2">Filter by Category:</label>
      <select
        className="border rounded px-4 py-2"
        onChange={(e) => onCategorySelect(e.target.value)}
      >
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category.categoryId} value={category.categoryId}>
            {category.categoryName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
