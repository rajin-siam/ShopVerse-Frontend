import React from "react";
import ProductGrid from "../components/ProductGrid";
import ProductList from "../components/ProductList";
import { SearchBar } from "../../../common/components/ui/SearchBar";
import CategoryFilter from "../components/CategoryFilter/CategoryFilter";
import { useProducts } from "../../../common/contexts/ProductsContext";

const ProductsPage = () => {
  const {
    searchQuery,
    view,
    setView,
    setSearchQuery,
    setSelectedCategory,
    selectedCategory,
    setPageNumber,
  } = useProducts();

  React.useEffect(() => {
    setPageNumber(0); // Reset to first page on search query change
  }, [searchQuery, selectedCategory]);
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Search Bar to filter products by query */}
      <SearchBar setSearchQuery={setSearchQuery} />

      {/* Category filter to filter products by category */}
      <CategoryFilter onCategorySelect={setSelectedCategory} />

      {/* View toggle buttons */}
      <div className="flex mb-4">
        <button
          onClick={() => setView("grid")}
          className={`px-4 py-2 rounded-md ${
            view === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Grid View
        </button>
        <button
          onClick={() => setView("list")}
          className={`px-4 py-2 rounded-md ${
            view === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          List View
        </button>
      </div>

      {/* Conditionally render the appropriate product display component */}
      {view === "grid" ? <ProductGrid /> : <ProductList />}
    </div>
  );
};

export default ProductsPage;
