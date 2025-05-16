import React from "react";

const ProductSpecifications = ({product}) => {
  if (!product) {
    console.log("product is undefined")
  }
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
        Product Specifications
      </h2>
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <dl className="divide-y divide-gray-200">
          <div className="px-6 py-4">
            <dt className="text-sm font-medium text-gray-500 mb-1">
              Product ID
            </dt>
            <dd className="text-sm text-gray-900">
              {product.productId}
            </dd>
          </div>
          <div className="px-6 py-4">
            <dt className="text-sm font-medium text-gray-500 mb-1">
              Availability
            </dt>
            <dd className="text-sm text-gray-900">
              {product.quantity > 0 ? "In Stock" : "Out of Stock"}
            </dd>
          </div>
          <div className="px-6 py-4">
            <dt className="text-sm font-medium text-gray-500 mb-1">
              Price
            </dt>
            <dd className="text-sm text-gray-900">
              ${product.price?.toFixed(2)}
            </dd>
          </div>
          <div className="px-6 py-4">
            <dt className="text-sm font-medium text-gray-500 mb-1">
              Special Price
            </dt>
            <dd className="text-sm text-gray-900">
              ${product.specialPrice?.toFixed(2)}
            </dd>
          </div>
          <div className="px-6 py-4">
            <dt className="text-sm font-medium text-gray-500 mb-1">
              Discount
            </dt>
            <dd className="text-sm text-gray-900">
              {product.discount}%
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ProductSpecifications;