import { useState, useEffect } from 'react';
import { adminCategoryAPI } from '../api/adminCategoryAPI';

export const useAdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories and their product counts
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Get categories with proper API handling
      const response = await adminCategoryAPI.getCategories();
      const categoriesData = response.content; // Access the actual array of categories
  
      // 2. Fetch product counts using proper API structure
      const enrichedCategories = await Promise.all(
        categoriesData.map(async (cat) => {
          try {
            // Use API method instead of raw fetch
            const productsResponse = await adminCategoryAPI.getCategoryProducts(cat.categoryId);
            return { 
              ...cat, 
              productCount: productsResponse.content?.length || 0 
            };
          } catch (error) {
            console.error(`Failed to fetch products for category ${cat.categoryId}:`, error);
            return { ...cat, productCount: 0 }; // Fallback with error logging
          }
        })
      );
  
      // 3. Correct state update without .content
      setCategories(enrichedCategories);
    } catch (err) {
      setError(err.message || 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };
  // CRUD Operations
  const createCategory = async (categoryData) => {
    // eslint-disable-next-line no-useless-catch
    try {
      await adminCategoryAPI.createCategory(categoryData);
      await fetchCategories(); // Refresh list
    } catch (err) {
      throw err;
    }
  };

  const updateCategory = async (categoryId, categoryData) => {
    // eslint-disable-next-line no-useless-catch
    try {
      await adminCategoryAPI.updateCategory(categoryId, categoryData);
      await fetchCategories();
    } catch (err) {
      throw err;
    }
  };

  const deleteCategory = async (categoryId) => {
    // eslint-disable-next-line no-useless-catch
    try {
      await adminCategoryAPI.deleteCategory(categoryId);
      await fetchCategories();
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error, createCategory, updateCategory, deleteCategory };
};