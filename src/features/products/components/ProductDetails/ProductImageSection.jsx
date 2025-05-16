import React from "react";

const ProductImageSection = ({ image, productName, discount }) => {
  return (
    <div className="md:w-2/5 bg-gray-100 flex items-center justify-center p-8">
      <div className="relative w-full max-w-md">
        <img
          src={image}
          alt={productName}
          className="w-full h-auto object-contain rounded-md"
        />
        {discount > 0 && (
          <div className="absolute top-4 right-4">
            <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
              {discount}% OFF
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageSection;