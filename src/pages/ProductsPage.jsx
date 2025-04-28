import React, { useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import ProductList from '../components/ProductList';
import {SearchBar} from '../components/SearchBar';

const ProductsPage = () => {
  const [view, setView] = useState('grid'); // Default to grid view
  const [searchQuery, setSearchQuery] = useState(''); // Track search query



  return (
    <div className="container mx-auto px-4 py-6">
      <SearchBar setSearchQuery={setSearchQuery} /> {/* Add search bar */}
      <div className="flex justify-between mb-4">
        <button onClick={() => setView('grid')} className="bg-blue-500 text-white px-4 py-2 rounded-md">Grid View</button>
        <button onClick={() => setView('list')} className="bg-blue-500 text-white px-4 py-2 rounded-md">List View</button>
      </div>
      
      {view === 'grid' ? <ProductGrid searchQuery={searchQuery} /> : <ProductList searchQuery={searchQuery} />}
    </div>
  );
};

export default ProductsPage;
