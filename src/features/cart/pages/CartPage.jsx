import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./../../../common/contexts/CartContext";
import CartItem from "./../components/CartItem";
import { ShoppingBag, ArrowRight } from "lucide-react";

const CartPage = () => {
  const { cart, loading, error, handleUpdateQuantity, handleRemoveFromCart } =
    useCart();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-red-500 text-lg mb-4">
            Something went wrong while loading your cart
          </div>
          <p className="text-gray-600 mb-6">Please try again later</p>
          <Link
            to="/"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  if (!cart.products?.length) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm text-center">
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-indigo-100 rounded-full">
              <ShoppingBag size={48} className="text-indigo-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link
            to="/products"
            className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Start Shopping
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    );
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
              onUpdateQuantity={(op) => handleUpdateQuantity(item.productId, op)}
              onRemove={() => handleRemoveFromCart(item.productId)}
            />
          ))}
        </div>

        {/* Order Summary */}
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
      </div>
    </div>
  );
};

export default CartPage;