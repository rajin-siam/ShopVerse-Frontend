import React, { useState, useEffect } from "react";
import Product from "./Product";
import { fetchAllProducts } from "../api/productsApi";
import { Package, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const PAGE_SIZE = 15; // Number of products per page

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const loadProducts = async (page) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAllProducts(page, PAGE_SIZE);
      setProducts(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      setError(err.message || "Failed to load products");
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Generate page buttons array
  const getPageButtons = () => {
    const buttons = [];
    
    // Always include current page
    buttons.push(currentPage);
    
    // Add previous page if it exists
    if (currentPage > 0) {
      buttons.unshift(currentPage - 1);
    }
    
    // Add next page if it exists
    if (currentPage < totalPages - 1) {
      buttons.push(currentPage + 1);
    }
    
    return buttons;
  };

  return (
    <div className="w-full">
      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-10">
          <div className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="text-center py-6 px-4 mx-auto max-w-md">
          <div className="bg-red-50 rounded-lg p-4 border border-red-100">
            <p className="text-red-600 text-sm">Error: {error}</p>
          </div>
        </div>
      )}

      {/* Products grid */}
      {!isLoading && products.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <Product key={product.productId} product={product} />
            ))}
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-2">
              {/* First page button */}
              <button
                onClick={() => handlePageChange(0)}
                disabled={currentPage === 0}
                className={`p-2 rounded ${
                  currentPage === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                aria-label="First page"
              >
                <ChevronsLeft size={18} />
              </button>

              {/* Previous page button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className={`p-2 rounded ${
                  currentPage === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Page number buttons */}
              {getPageButtons().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {page + 1}
                </button>
              ))}

              {/* Next page button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className={`p-2 rounded ${
                  currentPage === totalPages - 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                aria-label="Next page"
              >
                <ChevronRight size={18} />
              </button>

              {/* Last page button */}
              <button
                onClick={() => handlePageChange(totalPages - 1)}
                disabled={currentPage === totalPages - 1}
                className={`p-2 rounded ${
                  currentPage === totalPages - 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                aria-label="Last page"
              >
                <ChevronsRight size={18} />
              </button>
            </div>
          )}
        </>
      )}

      {/* Empty state */}
      {!isLoading && products.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto max-w-md">
            <Package className="mx-auto h-12 w-12 text-gray-400" strokeWidth={1.5} />
            <p className="mt-4 text-gray-500 text-base">
              No products found matching your criteria
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your search or filter options
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;