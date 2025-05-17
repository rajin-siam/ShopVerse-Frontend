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
  onAddToCart,
}) => {
  console.log("product info section ", product.productId);
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


    </div>
  );
};

export default ProductInfoSection;