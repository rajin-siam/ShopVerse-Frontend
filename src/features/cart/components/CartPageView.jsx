import React from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { ShoppingBag, ArrowRight, LogIn, AlertCircle } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import EmptyCart from "./EmptyCart";
import AuthRequired from "./AuthRequired";

const CartPageView = ({
  isLoading,
  cart,
  user,
  onUpdateQuantity,
  onRemoveFromCart
}) => {
  if (isLoading) {
    return <LoadingSpinner message="Loading your cart..." />;
  }

  if (!user) {
    return <AuthRequired />;
  }

  if (!cart.products?.length) {
    return <EmptyCart />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cart</h1>
        <p className="text-gray-600 mb-8">
          You have {cart.products.length} {cart.products.length === 1 ? "item" : "items"} in your cart
        </p>

        {/* Cart Items Container */}
        <div className="grid gap-6 mb-8">
          {cart.products.map((item) => (
            <CartItem
              key={item.productId}
              item={item}
              onUpdateQuantity={(op) => onUpdateQuantity(item.productId, op)}
              onRemove={() => onRemoveFromCart(item.productId)}
            />
          ))}
        </div>

        {/* Order Summary */}
        <OrderSummary cart={cart} />
      </div>
    </div>
  );
};

const OrderSummary = ({ cart }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 mt-8">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
    
    <div className="space-y-3 mb-6">
      <div className="flex justify-between text-gray-600">
        <span>Subtotal</span>
        <span>${cart.totalPrice?.toFixed(2) || "0.00"}</span>
      </div>
      <div className="flex justify-between text-gray-600">
        <span>Shipping</span>
        <span>Calculated at checkout</span>
      </div>
    </div>
    
    <div className="border-t border-gray-200 pt-4 mb-6">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-gray-900">Total</span>
        <span className="text-2xl font-bold text-indigo-600">
          ${cart.totalPrice?.toFixed(2) || "0.00"}
        </span>
      </div>
    </div>

    <div className="flex flex-col sm:flex-row gap-4">
      <Link
        to="/products"
        className="px-6 py-3 text-center border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
      >
        Continue Shopping
      </Link>
      <Link
        to="/checkout"
        className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium text-center hover:bg-indigo-700 transition-colors"
      >
        Proceed to Checkout
      </Link>
    </div>
  </div>
);

export default CartPageView;