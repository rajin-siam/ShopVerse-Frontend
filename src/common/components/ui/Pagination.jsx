import React, { useEffect, useState } from "react";
import { PAGINATION_CONFIG } from "../../../common/constants/config";

const Pagination = ({
  pageNumber,
  totalPages,
  setPageNumber,
  className = "",
  pageItemClassName = "",
  activePageClassName = "",
}) => {
  const { DEFAULT_VISIBLE_PAGES = 5 } = PAGINATION_CONFIG;
  const [isMobile, setIsMobile] = useState(false);
  const [visiblePages, setVisiblePages] = useState(DEFAULT_VISIBLE_PAGES);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setVisiblePages(window.innerWidth < 768 ? 3 : DEFAULT_VISIBLE_PAGES);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [DEFAULT_VISIBLE_PAGES]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPageNumber(newPage);
    }
  };

  const renderPageNumbers = () => {
    let startPage = Math.max(0, pageNumber - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);
    
    if (endPage === totalPages - 1) {
      startPage = Math.max(0, endPage - visiblePages + 1);
    }

    const pages = [];
    
    if (startPage > 0) {
      pages.push(
        <button
          key={0}
          onClick={() => handlePageChange(0)}
          className={`${pageItemClassName} mx-1 px-3 py-1 rounded-md transition-all 
            hover:bg-gray-100 hover:text-indigo-600`}
        >
          1
        </button>
      );
      if (startPage > 1) {
        pages.push(
          <span key="start-ellipsis" className="px-2 text-gray-400">
            ...
          </span>
        );
      }
    }

    // Add visible pages
    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`${pageItemClassName} ${
            page === pageNumber 
              ? `${activePageClassName} bg-indigo-600 text-white`
              : 'hover:bg-gray-100 hover:text-indigo-600 text-gray-700'
          } mx-1 px-3 md:px-4 py-1 rounded-md transition-all min-w-[2rem]`}
        >
          {page + 1}
        </button>
      );
    }

    // Add last page and ellipsis if needed
    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) {
        pages.push(
          <span key="end-ellipsis" className="px-2 text-gray-400">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages - 1}
          onClick={() => handlePageChange(totalPages - 1)}
          className={`${pageItemClassName} mx-1 px-3 py-1 rounded-md transition-all 
            hover:bg-gray-100 hover:text-indigo-600`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={`flex flex-wrap justify-center items-center gap-2 ${className}`}>
      <button
        onClick={() => handlePageChange(pageNumber - 1)}
        className={`${pageItemClassName} px-3 md:px-4 py-2 rounded-md 
          transition-all hover:bg-gray-100 text-gray-700 mr-4
          ${pageNumber === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={pageNumber === 0}
      >
        {isMobile ? '←' : 'Previous'}
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => handlePageChange(pageNumber + 1)}
        className={`${pageItemClassName} px-3 md:px-4 py-2 rounded-md 
          transition-all hover:bg-gray-100 text-gray-700
          ${pageNumber === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={pageNumber === totalPages - 1}
      >
        {isMobile ? '→' : 'Next'}
      </button>
    </div>
  );
};

export default Pagination;