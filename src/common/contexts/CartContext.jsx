import React, { createContext, useContext, useState, useEffect } from "react";
import {
  addToCart,
  fetchCart,
  updateQuantity,
  removeFromCart,
} from "./../../features/cart/api/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ products: [], totalPrice: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await fetchCart();
        setCart(cartData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  const handleAddToCart = async (productId, quantity) => {
    try {
      const updatedCart = await addToCart(productId, quantity);
      setCart(updatedCart);
    } catch (err) {
      setError(err.message);
      alert(err);
    }
  };

  const handleUpdateQuantity = async (productId, operation) => {
    try {
      const updatedCart = await updateQuantity(productId, operation);
      setCart(updatedCart);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    if (!cart.cartId) {
      throw new Error("Cart not loaded. Please refresh the page.");
    }
    try {
      await removeFromCart(cart.cartId, productId);
      const updatedCart = await fetchCart();
      setCart(updatedCart);
    } catch (err) {
      setError(err.message);
      alert(err.message); 
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        handleAddToCart,
        handleUpdateQuantity,
        handleRemoveFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
