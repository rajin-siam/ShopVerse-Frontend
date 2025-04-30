import React from 'react';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const { cart, loading, error, handleUpdateQuantity, handleRemoveFromCart } = useCart();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="p-4 max-w-4xl mx-auto text-red-500">
      Error: {error}
    </div>
  );

  if (!cart.products?.length) return (
    <div className="p-4 max-w-4xl mx-auto text-center py-12">
      <p className="text-xl text-gray-600">Your cart is empty</p>
      <p className="text-gray-500 mt-2">Start adding some items!</p>
    </div>
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
      
      <div className="space-y-4 mb-8">
        {cart.products.map(item => (
          <CartItem
            key={item.productId}
            item={item}
            onUpdateQuantity={(op) => handleUpdateQuantity(item.productId, op)}
            onRemove={() => handleRemoveFromCart(item.productId)}
          />
        ))}
      </div>

      <div className="sticky bottom-0 bg-white border-t-2 border-gray-100 py-4">
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold text-gray-800">Total:</span>
          <span className="text-2xl font-bold text-emerald-600">
            ${cart.totalPrice?.toFixed(2) || '0.00'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartPage;