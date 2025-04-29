import React, { useEffect, useState } from "react";
import {
  fetchAllProducts,
  fetchProductsByKeyword,
  fetchProductsByCategoryId,
} from "../api/productsApi";
import Product from "./Product";
import Pagination from "./common/Pagination";
import { useProducts } from "../contexts/ProductsContext";

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
