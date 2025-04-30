import React, { createContext, useContext, useState, useEffect } from "react";
import {
  addToCart,
  fetchCart,
  updateQuantity,
  removeFromCart,
} from "../api/cartApi";

// Create CartContext
const CartContext = createContext();

// CartProvider Component that will wrap your app
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart data when the app starts
  useEffect(() => {
    const getCart = async () => {
      try {
        const cartData = await fetchCart();
        setCart(cartData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getCart();
  }, []);

  // Function to add product to the cart
  const handleAddToCart = async (productId, quantity) => {
    try {
      const updatedCart = await addToCart(productId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  // Function to update quantity of a product in the cart
  const handleUpdateQuantity = async (productId, operation) => {
    try {
      const updatedCart = await updateQuantity(productId, operation);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  // Function to remove product from the cart
  const handleRemoveFromCart = async (cartId, productId) => {
    try {
      await removeFromCart(cartId, productId);
      const updatedCart = cart.filter((item) => item.product.id !== productId);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        handleAddToCart,
        handleUpdateQuantity,
        handleRemoveFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCart = () => {
  return useContext(CartContext);
};
