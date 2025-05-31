import React, { useState, useEffect } from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  const [visiblePages, setVisiblePages] = useState(5);
  
  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setVisiblePages(window.innerWidth < 640 ? 3 : 5);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  if (totalPages <= 1) return null;
  
  // Calculate page range to display
  const getPageRange = () => {
    const halfVisible = Math.floor(visiblePages / 2);
    let startPage = Math.max(0, currentPage - halfVisible);
    let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);
    
    // Adjust start page if end page is maxed out
    if (endPage === totalPages - 1) {
      startPage = Math.max(0, endPage - visiblePages + 1);
    }
    
    const pages = [];
    
    // Add first page and ellipsis if needed
    if (startPage > 0) {
      pages.push(0); // First page
      if (startPage > 1) {
        pages.push('ellipsis-start');
      }
    }
    
    // Add visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis and last page if needed
    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) {
        pages.push('ellipsis-end');
      }
      pages.push(totalPages - 1); // Last page
    }
    
    return pages;
  };

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className={`px-3 py-1 rounded-md text-sm ${
          currentPage === 0
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        Previous
      </button>
      
      {/* Page numbers */}
      {getPageRange().map((page, index) => {
        if (page === 'ellipsis-start' || page === 'ellipsis-end') {
          return (
            <span key={page} className="px-2 text-gray-400">
              ...
            </span>
          );
        }
        
        return (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-md text-sm ${
              currentPage === page
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {page + 1}
          </button>
        );
      })}
      
      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className={`px-3 py-1 rounded-md text-sm ${
          currentPage === totalPages - 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;