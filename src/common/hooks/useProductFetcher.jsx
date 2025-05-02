// src/common/hooks/useProductFetcher.js
import { useEffect, useState } from "react";
import { useProducts } from "../contexts/ProductsContext";
import {
  fetchAllProducts,
  fetchProductsByKeyword,
  fetchProductsByCategoryId,
} from "../../features/products/api/productsApi";
import { PAGINATION_CONFIG } from "../constants/config";

export const useProductFetcher = () => {
  const { searchQuery, selectedCategory, pageNumber } = useProducts();
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        let data;
        const { DEFAULT_PAGE_SIZE, SORT_BY, SORT_ORDER } = PAGINATION_CONFIG;

        if (searchQuery) {
          data = await fetchProductsByKeyword(
            searchQuery,
            pageNumber,
            DEFAULT_PAGE_SIZE,
            SORT_BY,
            SORT_ORDER
          );
        } else if (selectedCategory) {
          data = await fetchProductsByCategoryId(
            selectedCategory,
            pageNumber,
            DEFAULT_PAGE_SIZE,
            SORT_BY,
            SORT_ORDER
          );
        } else {
          data = await fetchAllProducts(
            pageNumber,
            DEFAULT_PAGE_SIZE,
            SORT_BY,
            SORT_ORDER
          );
        }

        setProducts(data.content);
        setTotalPages(data.totalPages || 1);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [pageNumber, searchQuery, selectedCategory]);

  return { products, totalPages, isLoading, error };
};