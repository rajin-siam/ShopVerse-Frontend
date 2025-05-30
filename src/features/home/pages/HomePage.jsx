// HomePage.jsx - Smart Component (Container)
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../common/contexts/AuthContext';
import { useProducts } from '../../../common/contexts/ProductsContext';
import { fetchAllProducts } from '../../products/api/productsApi';

import HeroSection from '../components/HeroSection';
import ProductGrid from '../components/ProductGrid';
import CategoryGrid from '../components/CategoryGrid';
import { fetchCategories } from '../../categories/api/categoriesApi';
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const { user } = useAuth();
  const { setSelectedCategory } = useProducts();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [productsData, categoriesData] = await Promise.all([
        fetchProducts(),
        fetchCategories(0,8)
      ]);

      setProducts(productsData.content || []);
      setCategories(categoriesData.content || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      return await fetchAllProducts(0, 8);
    } catch (error) {
      return { content: [] };
    }
  };



  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection user={user} />
      
      {categories.length > 0 && (
        <CategoryGrid 
          categories={categories} 
          onCategoryClick={handleCategoryClick} 
        />
      )}
      
      {products.length > 0 && (
        <ProductGrid products={products} />
      )}
    </div>
  );
};

export default HomePage;