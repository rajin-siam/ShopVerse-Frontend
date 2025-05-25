import { useState } from "react";
import { adminProductAPI } from "./../api/adminProductAPI";

export const useAdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    totalPages: 1,
    pageSize: 5,
  });

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminProductAPI.getProducts(
        pagination.pageNumber,
        pagination.pageSize
      );
      setProducts(data.content);
      setPagination((prev) => ({
        ...prev,
        totalPages: data.totalPages,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({
      ...prev,
      pageNumber: Math.max(0, Math.min(newPage, prev.totalPages - 1)),
    }));
  };

  const createProduct = async (categoryId, productData) => {
    setLoading(true);
    try {
      await adminProductAPI.createProduct(categoryId, productData);
      await fetchProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (productId, productData) => {
    setLoading(true);
    try {
      await adminProductAPI.updateProduct(productId, productData);
      await fetchProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    setLoading(true);
    try {
      await adminProductAPI.deleteProduct(productId);
      await fetchProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (productId, imageFile) => {
    setLoading(true);
    try {
      await adminProductAPI.uploadImage(productId, imageFile);
      await fetchProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProductDiscount = async (productId, discountAmount) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/admin/products/${productId}/discount/${discountAmount}`,
        { method: "PUT", credentials: "include", }
      );
      if (!response.ok) throw new Error("Failed to update discount");
      fetchProducts(); 
    } catch (error) {
      console.error("Error updating discount:", error);
      throw error;
    }
  };

  return {
    products,
    loading,
    error,
    pagination,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
    handlePageChange,
    updateProductDiscount,
  };
};
