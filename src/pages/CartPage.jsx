import React from 'react';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const { cart, loading, handleUpdateQuantity, handleRemoveFromCart } = useCart();

  if (loading) return <p>Loading cart...</p>;
  if (cart.length === 0) return <p>Your cart is empty.</p>;

  const totalPrice = cart.totalPrice


  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.products.map(item => (
        <CartItem
          key={item.productId}
          item={item}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemoveFromCart}
        />
      ))}
      <div className="mt-6 text-xl font-semibold">
        Total: ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default CartPage;
