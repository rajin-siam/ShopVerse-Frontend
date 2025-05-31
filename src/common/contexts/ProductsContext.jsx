// src/contexts/ProductsContext.js
import React, { createContext, useContext, useState } from "react";

// Creating the context
const ProductsContext = createContext();

// Create a Provider Component
export const ProductsProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [pageNumber, setPageNumber] = useState(0); // Using 0-based indexing for API compatibility
  const [totalPages, setTotalPages] = useState(1);

  // Reset page number when filters change
  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
    setPageNumber(0); // Reset to first page
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPageNumber(0); // Reset to first page
  };

  // Explicitly handle page changes with validation
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPageNumber(newPage);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        searchQuery,
        setSearchQuery: handleSearchQueryChange,
        selectedCategory,
        setSelectedCategory: handleCategoryChange,
        pageNumber,
        setPageNumber: handlePageChange,
        totalPages,
        setTotalPages,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// Custom hook to use the context (optional for easy access)
export const useProducts = () => useContext(ProductsContext);
