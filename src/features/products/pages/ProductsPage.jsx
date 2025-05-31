import React from "react";
import ProductGrid from "../components/ProductGrid";
import { SearchBar } from "../../../common/components/ui/SearchBar";
import CategoryFilter from "../components/CategoryFilter/CategoryFilter";
import { useProducts } from "../../../common/contexts/ProductsContext";

const ProductsPage = () => {
  const { setSearchQuery, setSelectedCategory } = useProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <header className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Our Products</h1>
          </div>
          
          {/* Search and Filters Row */}
          <div className="flex flex-col gap-4 items-start">
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
          <ActiveFilters />
          
          {/* Display products in grid view */}
          <ProductGrid />
        </div>
      </div>
    </div>
  );
};

// Component to display active filters
const ActiveFilters = () => {
  const { searchQuery, selectedCategory } = useProducts();
  
  if (!searchQuery && !selectedCategory) return null;
  
  return (
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
    </div>
  );
};

export default ProductsPage;