// src/contexts/ProductsContext.js
import React, { createContext, useState, useContext } from "react";

// Creating the context
const ProductsContext = createContext();

// Create a Provider Component
export const ProductsProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);

  return (
    <ProductsContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        pageNumber,
        setPageNumber,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// Custom hook to use the context (optional for easy access)
export const useProducts = () => useContext(ProductsContext);
