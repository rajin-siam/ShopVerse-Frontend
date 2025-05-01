import React, { useEffect, useState } from "react";
import {
  fetchAllProducts,
  fetchProductsByKeyword,
  fetchProductsByCategoryId,
} from "./../api/productsApi";
import Product from "./Product";
import Pagination from "./../../../common/components/ui/Pagination";
import { useProducts } from "./../../../common/contexts/ProductsContext";

const ProductGrid = () => {
  const { searchQuery, selectedCategory, pageNumber, setPageNumber } =
    useProducts();
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        let data;

        if (searchQuery) {
          data = await fetchProductsByKeyword(
            searchQuery,
            pageNumber,
            10,
            "productName",
            "desc"
          );
        } else if (selectedCategory) {
          data = await fetchProductsByCategoryId(
            selectedCategory,
            pageNumber,
            10,
            "productName",
            "desc"
          );
        } else {
          data = await fetchAllProducts(pageNumber, 10, "productName", "desc");
        }

        setProducts(data.content);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error(error);
      }
    };

    loadProducts();
  }, [pageNumber, searchQuery, selectedCategory]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <Product
            key={product.productId}
            product={product}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out overflow-hidden"
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No products found matching your criteria
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
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

export default ProductGrid;
