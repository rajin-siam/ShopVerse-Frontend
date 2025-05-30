// components/home/CategoryGrid.jsx - Simple Categories
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryGrid = ({ categories, onCategoryClick }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Shop by Category
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.categoryId}
              to="/products"
              onClick={() => onCategoryClick(category.categoryId)}
              className="group text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-200">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="font-semibold text-gray-900">{category.categoryName}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;