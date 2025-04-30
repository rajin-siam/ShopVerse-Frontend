import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  console.log(item)
  const { productId, productName, quantity, price } = item;

  const handleQuantityChange = (operation) => {
    onUpdateQuantity(productId, operation);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <p>{productName}</p>
        <p>Price: ${price}</p>
        <p>Quantity: {quantity}</p>
      </div>
      <div className="cart-item-actions flex gap-2">
        <button className='h-8 w-8 bg-amber-500 rounded-xl'  onClick={() => handleQuantityChange('add')}>+</button>
        <button className='h-8 w-8 bg-blue-500 rounded-xl' onClick={() => handleQuantityChange('delete')}>-</button>
        <button onClick={() => onRemove(productId)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
