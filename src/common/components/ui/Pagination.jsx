import React from "react";
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

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPageNumber(newPage);
    }
  };

  const renderPageNumbers = () => {
    const startPage = Math.max(
      0,
      pageNumber - Math.floor(DEFAULT_VISIBLE_PAGES / 2)
    );
    const endPage = Math.min(
      totalPages - 1,
      startPage + DEFAULT_VISIBLE_PAGES - 1
    );

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => {
      const page = startPage + i;
      return (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`${pageItemClassName} ${
            page === pageNumber ? activePageClassName : ""
          } mx-1 px-3 py-1 rounded-md transition-colors`}
        >
          {page + 1}
        </button>
      );
    });
  };

  return (
    <div className={`flex justify-center items-center gap-2 ${className}`}>
      <button
        onClick={() => handlePageChange(pageNumber - 1)}
        className={`${pageItemClassName} px-4 py-2 rounded-md`}
        disabled={pageNumber === 0}
      >
        Previous
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => handlePageChange(pageNumber + 1)}
        className={`${pageItemClassName} px-4 py-2 rounded-md`}
        disabled={pageNumber === totalPages - 1}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
