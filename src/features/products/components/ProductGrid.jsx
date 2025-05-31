import React, { useEffect } from "react";
import Product from "./Product";
import Pagination from "../../../common/components/ui/Pagination";
import { useProducts } from "../../../common/contexts/ProductsContext";
import { useProductFetcher } from "../../../common/hooks/useProductFetcher";
import { Package } from "lucide-react";

const ProductGrid = () => {
  const { pageNumber, setPageNumber, setTotalPages } = useProducts();
  const { products, totalPages, isLoading, error } = useProductFetcher();
  
  // Sync total pages from API response to context
  useEffect(() => {
    if (totalPages > 0) {
      setTotalPages(totalPages);
    }
  }, [totalPages, setTotalPages]);


  // Handle page change with validation
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPageNumber(newPage);
    }
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <Product key={product.productId} product={product} />
          ))}
        </div>
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <Pagination
            currentPage={pageNumber}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="bg-white rounded-lg shadow-sm p-2"
          />
        </div>
      )}
    </div>
  );
};

export default ProductGrid;