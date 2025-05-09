import React, { useState } from "react";

const SearchBar = ({ setSearchQuery }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 shadow-sm transition-all"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-4 rounded-r-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export { SearchBar };