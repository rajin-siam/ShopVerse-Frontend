import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../common/contexts/CartContext";
import { useAuth } from "../../../common/contexts/AuthContext";
import CartPageView from "../components/CartPageView";

const CartPageContainer = () => {
  const { cart, loading, error, handleUpdateQuantity, handleRemoveFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cartError, setCartError] = React.useState(null);

  // Authentication check - redirect to login if not authenticated
  React.useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { state: { redirect: "/cart" } });
    }
  }, [loading, user, navigate]);

  // Clear cart error after 5 seconds
  React.useEffect(() => {
    if (error) {
      setCartError(error);
      const timer = setTimeout(() => {
        setCartError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <CartPageView
      isLoading={loading}
      cart={cart}
      user={user}
      error={cartError}
      onUpdateQuantity={handleUpdateQuantity}
      onRemoveFromCart={handleRemoveFromCart}
    />
  );
};

export default CartPageContainer;