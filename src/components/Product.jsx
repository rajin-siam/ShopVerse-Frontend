// components/Product.js
import React from "react";

const Product = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow-lg flex flex-col items-center">
      <img
        src={product.image}
        alt={product.productName}
        className="w-full h-48 object-cover mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">
        {product.productName.length > 50
          ? product.productName.substring(0, 50) + "..."
          : product.productName}
      </h3>
      <div className="text-xl font-bold mb-2">
        ${product.specialPrice.toFixed(2)}
      </div>
      <div className="text-sm line-through text-gray-500">
        ${product.price.toFixed(2)}
      </div>
      <div className="text-sm text-green-500">{product.discount}% off</div>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
