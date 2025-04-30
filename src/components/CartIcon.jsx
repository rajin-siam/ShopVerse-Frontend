import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { product, quantity } = item;

  const handleIncrease = () => {
    onUpdateQuantity(product.id, 'increment');
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(product.id, 'decrement');
    }
  };

  const handleRemove = () => {
    onRemove(item.cartId, product.id); // you must ensure `cartId` is part of item
  };

  return (
    <div className="border p-4 mb-4 rounded shadow flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p>${product.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={handleDecrease} className="px-2 py-1 bg-gray-200 rounded">-</button>
        <span>{quantity}</span>
        <button onClick={handleIncrease} className="px-2 py-1 bg-gray-200 rounded">+</button>
        <button
          onClick={handleRemove}
          className="ml-4 px-3 py-1 bg-red-500 text-white rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
