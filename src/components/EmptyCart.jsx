import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <h2>Your cart is empty</h2>
      <Link to="/shop">Go to Shop</Link>
    </div>
  );
};

export default EmptyCart;
