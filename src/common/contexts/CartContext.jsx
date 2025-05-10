import React, { createContext, useContext, useState, useEffect } from "react";
import {
  addToCart,
  fetchCart,
  updateQuantity,
  removeFromCart,
} from "./../../features/cart/api/cartApi";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthContext";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ products: [], totalPrice: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    // Only attempt to load cart data when authentication state is known
    // and user is authenticated
    const loadCart = async () => {
      // Reset error state on new fetch attempt
      setError(null);
      setLoading(true);
      
      try {
        if (user) {
          const cartData = await fetchCart();
          setCart(cartData);
        } else {
          // If no user, set empty cart
          setCart({ products: [], totalPrice: 0 });
        }
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load cart. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    // Only fetch cart data if auth loading is complete
    if (!authLoading) {
      loadCart();
    }
  }, [user, authLoading]); // Depend on user and authLoading state

  const handleAddToCart = async (productId, quantity) => {
    if (!user) {
      toast.error("Please log in to add items to cart");
      return;
    }

    try {
      const updatedCart = await addToCart(productId, quantity);
      setCart(updatedCart);
      toast.success("Item added to cart! 🛒"); 
    } catch (err) {
      setError(err.message);
      toast.error("Failed to add item.");
    }
  };

  const handleUpdateQuantity = async (productId, operation) => {
    if (!user) {
      toast.error("Please log in to update your cart");
      return;
    }
    
    try {
      const updatedCart = await updateQuantity(productId, operation);
      setCart(updatedCart);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to update quantity. Please refresh the page.");
    }
  };

  const handleRemoveFromCart = async (productId) => {
    if (!user) {
      toast.error("Please log in to manage your cart");
      return;
    }
    
    if (!cart.cartId) {
      throw new Error("Cart not loaded. Please refresh the page.");
    }
    
    try {
      await removeFromCart(cart.cartId, productId);
      const updatedCart = await fetchCart();
      setCart(updatedCart);
      toast.success("Item removed from cart 🗑️");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to update quantity. Please refresh the page.");
    }
  };

  // Provide a clear loading state that accounts for both cart and auth loading
  const isLoading = loading || authLoading;

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        loading: isLoading,
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