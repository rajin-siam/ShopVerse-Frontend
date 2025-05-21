import React from "react";
import ProductGrid from "../components/ProductGrid";
import ProductList from "../components/ProductList";
import { SearchBar } from "../../../common/components/ui/SearchBar";
import CategoryFilter from "../components/CategoryFilter/CategoryFilter";
import { useProducts } from "../../../common/contexts/ProductsContext";
import { LayoutGrid, List } from "lucide-react";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <header className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Our Products</h1>
            
            {/* View toggle buttons */}
            <div className="inline-flex shadow-sm rounded-md">
              <button
                onClick={() => setView("grid")}
                className={`relative inline-flex items-center px-3 py-1.5 rounded-l-md border border-gray-300 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                  view === "grid" 
                    ? "bg-indigo-600 text-white border-indigo-600" 
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <LayoutGrid className="h-4 w-4 mr-1.5" />
                Grid
              </button>
              <button
                onClick={() => setView("list")}
                className={`relative inline-flex items-center px-3 py-1.5 rounded-r-md border border-gray-300 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                  view === "list" 
                    ? "bg-indigo-600 text-white border-indigo-600" 
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <List className="h-4 w-4 mr-1.5" />
                List
              </button>
            </div>
          </div>
          
          {/* Search and Filters Row */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search Bar */}
            <div className="w-full lg:w-1/2">
              <SearchBar 
                setSearchQuery={setSearchQuery} 
                className="shadow-sm"
              />
            </div>
            
            <div className="w-full lg:w-1/2">
              <CategoryFilter 
                onCategorySelect={setSelectedCategory} 
                className="bg-white shadow-sm rounded-lg p-2"
              />
            </div>
          </div>
        </header>

        {/* Products */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          {/* Active filters & Results summary */}
          <div className="mb-4 pb-4 border-b border-gray-100 flex flex-wrap items-center justify-between">
            <div>
              <h2 className="text-sm font-medium text-gray-700">
                {searchQuery && (
                  <span className="mr-2">
                    Results for: <span className="text-indigo-600">"{searchQuery}"</span>
                  </span>
                )}
                {selectedCategory && (
                  <span className="mr-2">
                    Category: <span className="text-indigo-600">{selectedCategory}</span>
                  </span>
                )}
              </h2>
            </div>
            <div className="text-xs text-gray-500 mt-1 lg:mt-0">
              Showing products in {view === "grid" ? "grid" : "list"} view
            </div>
          </div>
          
          {/* Display products in the selected view */}
          {view === "grid" ? <ProductGrid /> : <ProductList />}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;