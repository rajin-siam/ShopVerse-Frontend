import React, { useEffect, useState } from "react";
import {
  fetchAllProducts,
  fetchProductsByKeyword,
  fetchProductsByCategoryId,
} from "./../api/productsApi";
import Product from "./Product";
import Pagination from "./Pagination";

const ProductList = ({ searchQuery, selectedCategoryId }) => {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        let data;

        if (searchQuery) {
          // Search filter
          data = await fetchProductsByKeyword(
            searchQuery,
            pageNumber,
            10,
            "productName",
            "desc"
          );
        } else if (selectedCategoryId) {
          // Category filter
          data = await fetchProductsByCategoryId(
            selectedCategoryId,
            pageNumber,
            10,
            "productName",
            "desc"
          );
        } else {
          // All products
          data = await fetchAllProducts(
            pageNumber,
            10,
            "productName",
            "desc"
          );
        }

        setProducts(data.content);
        setPageNumber(data.pageNumber || 0);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error(error);
      }
    };

    loadProducts();
  }, [pageNumber, searchQuery, selectedCategoryId]);

  return (
    <>
      <div className="space-y-6">
        {products.map((product) => (
          <div key={product.productId} className="flex items-center space-x-6">
            <img
              src={product.image}
              alt={product.productName}
              className="w-24 h-24 object-cover"
            />
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold">{product.productName}</h3>
              <p className="text-sm text-gray-700 mb-2">
                {product.description}
              </p>
              <div className="text-lg font-bold">
                ${product.specialPrice.toFixed(2)}
              </div>
              <div className="text-sm line-through text-gray-500">
                ${product.price.toFixed(2)}
              </div>
              <div className="text-sm text-green-500">
                {product.discount}% off
              </div>
            </div>
            <button className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-md">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          pageNumber={pageNumber}
          totalPages={totalPages}
          setPageNumber={setPageNumber}
        />
      )}
    </>
  );
};

export default ProductList;
