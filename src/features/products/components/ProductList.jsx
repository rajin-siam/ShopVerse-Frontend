import React from "react";
import Product from "./Product";
import Pagination from "../../../common/components/ui/Pagination";
import { useProducts } from "../../../common/contexts/ProductsContext";
import { useProductFetcher } from "../../../common/hooks/useProductFetcher";

const ProductList = () => {
  const { pageNumber, setPageNumber } = useProducts();
  const { products, totalPages, isLoading, error } = useProductFetcher();

  return (
    <div className="w-full">
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      {error && (
        <div className="text-center py-8 px-4 mx-auto max-w-md">
          <div className="bg-red-50 rounded-lg p-4 border border-red-100">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {products.map((product) => (
          <Product
            key={product.productId}
            product={product}
            layout="list"
          />
        ))}
      </div>

      {!isLoading && products.length === 0 && (
        <div className="text-center py-16">
          <div className="mx-auto max-w-md">
            <svg 
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <p className="mt-4 text-gray-500 text-lg">
              No products found matching your criteria
            </p>
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 border-t border-gray-100 pt-8">
          <Pagination
            pageNumber={pageNumber}
            totalPages={totalPages}
            setPageNumber={setPageNumber}
            className="bg-white rounded-lg shadow-sm p-2 flex gap-1"
            pageItemClassName="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
            activePageClassName="bg-indigo-600 text-white hover:bg-indigo-700"
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;