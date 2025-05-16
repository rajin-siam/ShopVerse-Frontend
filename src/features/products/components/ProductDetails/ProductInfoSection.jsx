import React from "react";
import ProductQuantitySelector from "./ProductQuantitySelector";
import AddToCartButton from "./AddToCartButton";

const ProductInfoSection = ({
  product,
  descriptionPoints,
  quantity,
  onQuantityChange,
  onIncrease,
  onDecrease,
  onAddToCart
}) => {

  console.log("product info section ", product.productId)
  return (
    <div className="md:w-3/5 p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {product.productName}
        </h1>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-indigo-600">
              ${product.specialPrice?.toFixed(2)}
            </span>
            {product.price && product.price !== product.specialPrice && (
              <span className="ml-2 text-lg line-through text-gray-400">
                ${product.price?.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock indicator */}
          {product.quantity > 0 ? (
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              In Stock
            </span>
          ) : (
            <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Short description - first point only */}
      {descriptionPoints.length > 0 && (
        <div className="mb-8">
          <p className="text-gray-600">{descriptionPoints[0]}</p>
        </div>
      )}

      <div className="mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          {/* Quantity selector */}
          <ProductQuantitySelector
            quantity={quantity}
            onQuantityChange={onQuantityChange}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />

          {/* Add to cart button */}
          <AddToCartButton 
            isAvailable={product.quantity > 0} 
            onAddToCart={onAddToCart} 
          />
        </div>
      </div>

      {/* Additional buttons */}
      <div className="flex gap-4">
        <button className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          Add to Wishlist
        </button>
        <button className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          Share
        </button>
      </div>
    </div>
  );
};

export default ProductInfoSection;