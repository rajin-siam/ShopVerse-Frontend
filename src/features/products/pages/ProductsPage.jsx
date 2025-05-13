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
    setPageNumber(0); // Reset to first page on search query or category change
  }, [searchQuery, selectedCategory, setPageNumber]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Products</h1>
          
          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar setSearchQuery={setSearchQuery} />
          </div>
          
          {/* Filters and View Toggles */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CategoryFilter onCategorySelect={setSelectedCategory} />
            
            {/* View toggle buttons */}
            <div className="inline-flex shadow-sm rounded-md">
              <button
                onClick={() => setView("grid")}
                className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                  view === "grid" 
                    ? "bg-indigo-600 text-white border-indigo-600" 
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" 
                  />
                </svg>
                Grid
              </button>
              <button
                onClick={() => setView("list")}
                className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                  view === "list" 
                    ? "bg-indigo-600 text-white border-indigo-600" 
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                </svg>
                List
              </button>
            </div>
          </div>
        </header>

        {/* Products */}
        <div className="bg-white rounded-lg shadow p-6">
          {/* Display products in the selected view */}
          {view === "grid" ? <ProductGrid /> : <ProductList />}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;