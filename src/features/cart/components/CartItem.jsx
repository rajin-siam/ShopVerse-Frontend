import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { productName, quantity, price, image } = item;
  const subtotal = price * quantity;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-6">
        {/* Product Image (placeholder) */}
        <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0">
          {image ? (
            <img 
              src={image} 
              alt={productName} 
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{productName}</h3>
          <p className="text-gray-600 mb-4">${price.toFixed(2)} each</p>
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Quantity Controls */}
            <div className="flex items-center">
              <button
                onClick={() => onUpdateQuantity('delete')}
                disabled={quantity <= 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              
              <span className="mx-3 w-8 text-center font-medium">{quantity}</span>
              
              <button
                onClick={() => onUpdateQuantity('add')}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
            
            {/* Subtotal and Remove */}
            <div className="flex items-center gap-4">
              <p className="font-semibold text-indigo-600">${subtotal.toFixed(2)}</p>
              
              <button
                onClick={onRemove}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Remove item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;