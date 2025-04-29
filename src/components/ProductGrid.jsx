import React, { useEffect, useState } from "react";
import { fetchAllProducts, fetchProductsByKeyword, fetchProductsByCategoryId } from "./../api/productsApi";
import Product from "./Product";
import Pagination from "./Pagination";

const ProductGrid = ({ searchQuery, selectedCategoryId }) => {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      let data;
      try {
        if (searchQuery) {
          data = await fetchProductsByKeyword(searchQuery, pageNumber, 10, "productName", "desc");
        } else if (selectedCategoryId) {
          data = await fetchProductsByCategoryId(selectedCategoryId, pageNumber, 10, "productName", "desc"); // No pagination support
          setProducts(data.content); // Direct list
         // setTotalPages(1);
          return;
        } else {
          data = await fetchAllProducts(pageNumber, 10, "productName", "desc");
        }

        setProducts(data.content);
        setPageNumber(data.pageNumber || 0);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.log(error);
      }
    };

    loadProducts();
  }, [pageNumber, searchQuery, selectedCategoryId]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Product key={product.productId} product={product} />
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

export default ProductGrid;
