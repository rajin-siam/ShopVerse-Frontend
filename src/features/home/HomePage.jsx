// HomePage.jsx - Smart Component (Container)
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../common/contexts/AuthContext';
import { useProducts } from '../../common/contexts/ProductsContext';
import { fetchAllProducts } from '../products/api/productsApi';

import HeroSection from './HeroSection';
import ProductGrid from './ProductGrid';
import CategoryGrid from './CategoryGrid';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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
        fetchCategories()
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

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/public/categories?pageNumber=0&pageSize=8');
      if (!response.ok) throw new Error('Failed to fetch');
      return await response.json();
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