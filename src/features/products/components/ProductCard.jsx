// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { product_name, price, special_price, description, image, discount, quantity } = product;

  // Calculate discount percentage
  const discountPercentage = discount ? Math.round((discount / price) * 100) : 0;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
      <img src={image} alt={product_name} className="w-full h-56 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-xl">{product_name}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
        <div className="flex justify-between items-center mt-2">
          <div className="text-lg font-semibold">
            {special_price ? (
              <>
                <span className="line-through text-red-500">${price}</span>{" "}
                <span className="text-green-500">${special_price}</span>
              </>
            ) : (
              `$${price}`
            )}
          </div>
          {discountPercentage > 0 && (
            <span className="text-sm text-white bg-red-500 px-2 py-1 rounded-full">
              {discountPercentage}% OFF
            </span>
          )}
        </div>
        {quantity > 0 ? (
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Add to Cart
          </button>
        ) : (
          <button className="mt-4 bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed">
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
