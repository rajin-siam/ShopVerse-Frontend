// components/SearchBar.js
import React, { useState } from "react";

const SearchBar = ({ setSearchQuery }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(query); // Update the search query in the parent
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center my-4">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update local query state
        className="px-4 py-2 border border-gray-300 rounded-l-md w-64"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
      >
        Search
      </button>
    </form>
  );
};

// Named export
export { SearchBar };
