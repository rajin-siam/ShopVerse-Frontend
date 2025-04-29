// src/contexts/ProductsContext.js
import React, { createContext, useState, useContext } from "react";

// Creating the context
const ProductsContext = createContext();

// Create a Provider Component
export const ProductsProvider = ({ children }) => {
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <ProductsContext.Provider
      value={{
        view,
        setView,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// Custom hook to use the context (optional for easy access)
export const useProducts = () => {
  return useContext(ProductsContext);
};
