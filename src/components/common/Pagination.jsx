import React from "react";

const Pagination = ({ pageNumber, totalPages, setPageNumber }) => {
  const handlePrevious = () => {
    if (pageNumber > 0) setPageNumber(pageNumber - 1);
  };

  const handleNext = () => {
    if (pageNumber < totalPages - 1) setPageNumber(pageNumber + 1);
  };

  return (
    <div className="flex justify-center items-center my-4 gap-4">
      <button
        onClick={handlePrevious}
        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        disabled={pageNumber === 0}
      >
        Previous
      </button>

      <span>Page {pageNumber + 1} of {totalPages}</span>

      <button
        onClick={handleNext}
        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        disabled={pageNumber === totalPages - 1}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
