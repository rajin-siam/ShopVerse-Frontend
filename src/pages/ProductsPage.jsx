import React, { useState } from "react";
import ProductGrid from "../components/ProductGrid";
import ProductList from "../components/ProductList";
import { SearchBar } from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

const ProductsPage = () => {
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="container mx-auto px-4 py-6">
      <SearchBar setSearchQuery={setSearchQuery} />
      <CategoryFilter onCategorySelect={setSelectedCategory} />

      <div className="flex justify-between mb-4">
        <button onClick={() => setView("grid")} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Grid View
        </button>
        <button onClick={() => setView("list")} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          List View
        </button>
      </div>

      {view === "grid" ? (
        <ProductGrid searchQuery={searchQuery} selectedCategoryId={selectedCategory}/>
      ) : (
        <ProductList searchQuery={searchQuery} selectedCategoryId={selectedCategory} />
      )}
    </div>
  );
};

export default ProductsPage;
