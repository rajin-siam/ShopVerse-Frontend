import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { productName, quantity, price } = item;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow mb-4">
      <div className="flex-1 mb-2 sm:mb-0">
        <h3 className="text-lg font-semibold text-gray-800">{productName}</h3>
        <p className="text-gray-600">${price.toFixed(2)} each</p>
        <p className="text-sm text-gray-500">Quantity: {quantity}</p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdateQuantity('add')}
            className="h-8 w-8 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            +
          </button>
          <button
            onClick={() => onUpdateQuantity('delete')}
            className="h-8 w-8 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            -
          </button>
        </div>
        <button
          onClick={onRemove}
          className="px-3 py-1.5 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;