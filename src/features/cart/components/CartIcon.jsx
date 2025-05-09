import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const CartIcon = ({ itemCount = 0 }) => {
  return (
    <Link 
      to="/cart" 
      className="relative p-2 text-gray-700 hover:text-indigo-600 transition-colors"
      aria-label="View shopping cart"
    >
      <ShoppingCart size={24} />
      
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;