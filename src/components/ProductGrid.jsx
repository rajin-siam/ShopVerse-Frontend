import React, { useEffect, useState } from "react";
import { fetchAllProducts, fetchProductsByKeyword } from "./../api/productsApi";
import Product from "./Product";
import Pagination from "./Pagination";

const ProductGrid = ({ searchQuery }) => {
  // Accept searchQuery as a prop
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      let data;
      try {
        if (searchQuery) {
          // When there's a search query
          data = await fetchProductsByKeyword(
            searchQuery,
            pageNumber,
            10,
            "productName",
            "desc"
          );
        } else {
          // When there's no search query, fetch all products
          data = await fetchAllProducts(pageNumber, 10, "productName", "desc");
        }
        setProducts(data.content); // Assuming data.content is the list of products
        setPageNumber(data.pageNumber); // Assuming data.pageNumber gives the current page number
        setTotalPages(data.totalPages); // Assuming data.totalPages gives total pages
      } catch (error) {
        console.log(error);
      }
    };

    loadProducts();
  }, [pageNumber, searchQuery]); // Run when pageNumber or searchQuery changes

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Product key={product.productId} product={product} />
        ))}
      </div>
      <Pagination
        pageNumber={pageNumber}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
      />
    </>
  );
};

export default ProductGrid;
