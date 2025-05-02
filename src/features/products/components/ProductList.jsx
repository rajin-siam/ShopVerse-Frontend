import React from "react";
import Product from "./Product";
import Pagination from "../../../common/components/ui/Pagination";
import { useProducts } from "../../../common/contexts/ProductsContext";
import { useProductFetcher } from "../../../common/hooks/useProductFetcher";
import { PAGINATION_CONFIG } from "../../../common/constants/config";

const ProductList = () => {
  const { pageNumber, setPageNumber } = useProducts();
  const { products, totalPages, isLoading, error } = useProductFetcher();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {isLoading && <div className="text-center py-8">Loading...</div>}
      {error && (
        <div className="text-center py-8 text-red-500">Error: {error}</div>
      )}

      <div className="space-y-4">
        {products.map((product) => (
          <Product
            key={product.productId}
            product={product}
            className="flex items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-700 w-full"
            layout="list"
          />
        ))}
      </div>

      {!isLoading && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No products found matching your criteria
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
          <Pagination
            pageNumber={pageNumber}
            totalPages={totalPages}
            setPageNumber={setPageNumber}
            className="rounded-lg bg-white dark:bg-gray-800 shadow-sm px-4 py-2 flex gap-2"
            pageItemClassName="px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            activePageClassName="bg-indigo-600 text-white hover:bg-indigo-700"
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;
