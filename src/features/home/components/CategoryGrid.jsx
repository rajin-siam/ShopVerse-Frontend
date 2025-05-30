// components/home/CategoryGrid.jsx - Simple Categories
import { Link } from "react-router-dom";
import { useCategoryImages } from "../hooks/useCategoryImages";
const CategoryGrid = ({ categories, onCategoryClick }) => {
  const { imageStates, imageUrls, handleImageError, handleImageLoad } =
    useCategoryImages(categories);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.categoryId}
              to="/products"
              onClick={() => onCategoryClick(category.categoryId)}
              className="group text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-200 overflow-hidden">
                {imageStates[category.categoryId] === "error" ? (
                  <span className="text-2xl">📦</span>
                ) : (
                  <img
                    src={imageUrls[category.categoryId]}
                    alt={category.categoryName}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(category.categoryId)}
                    onLoad={() => handleImageLoad(category.categoryId)}
                    style={{
                      display:
                        imageStates[category.categoryId] === "loaded"
                          ? "block"
                          : "none",
                    }}
                  />
                )}
                {imageStates[category.categoryId] === "loading" && (
                  <div className="w-full h-full flex items-center justify-center bg-blue-100">
                    <span className="text-xs text-blue-500">Loading...</span>
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-gray-900">
                {category.categoryName}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
