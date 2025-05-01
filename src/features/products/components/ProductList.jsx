import React, { useEffect, useState } from "react";
import {
  fetchAllProducts,
  fetchProductsByKeyword,
  fetchProductsByCategoryId,
} from "../api/productsApi";
import Pagination from "./../../../common/components/ui/Pagination";
import { useProducts } from "./../../../common/contexts/ProductsContext";

const ProductList = () => {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-4">
        {products.map((product) => (
          <div 
            key={product.productId} 
            className="flex items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
          >
            <img
              src={product.image}
              alt={product.productName}
              className="w-32 h-32 object-cover rounded-lg"
            />
            
            <div className="ml-6 flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {product.productName.length > 50
                  ? product.productName.substring(0, 50) + "..."
                  : product.productName}
              </h3>
              
              <div className="flex items-baseline gap-4 flex-col">
                <span className="text-2xl font-bold text-indigo-600">
                  ${product.specialPrice.toFixed(2)}
                </span>
                <span className="text-lg line-through text-gray-400">
                  ${product.price.toFixed(2)}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  {product.discount}% OFF
                </span>
              </div>
            </div>

            <button 
              className="ml-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium
                        hover:bg-indigo-700 transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No products found matching your criteria
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 border-t border-gray-200 pt-8">
          <Pagination
            pageNumber={pageNumber}
            totalPages={totalPages}
            setPageNumber={setPageNumber}
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;