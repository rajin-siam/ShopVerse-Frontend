import React from "react";

const SectionTabs = ({ visibleSections, onToggleSection, onShowAllSections }) => {
  return (
    <div className="buttons border-t border-gray-200 p-4">
      <div className="flex flex-wrap gap-2 flex-start">
        <button
          onClick={onShowAllSections}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all
            bg-indigo-600 text-white
            hover:bg-indigo-700
            active:bg-indigo-800`}
        >
          Show All
        </button>
        <button
          onClick={() => onToggleSection("specifications")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all
            ${
              visibleSections.specifications
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          Specifications
        </button>
        <button
          onClick={() => onToggleSection("description")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all
            ${
              visibleSections.description
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          Description
        </button>
        <button
          onClick={() => onToggleSection("reviews")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all
            ${
              visibleSections.reviews
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          Reviews
        </button>
      </div>
    </div>
  );
};

export default SectionTabs;