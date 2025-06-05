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
      setError(null);

      try {
        const { DEFAULT_PAGE_SIZE, SORT_BY, SORT_ORDER } = PAGINATION_CONFIG;
        let data;
        // Choose API method based on filters
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

        // Update state with API response data
        setProducts(data.content || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message || "Failed to load products");
        setProducts([]);
        setTotalPages(0);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [pageNumber, searchQuery, selectedCategory]);

  return { products, totalPages, isLoading, error };
};