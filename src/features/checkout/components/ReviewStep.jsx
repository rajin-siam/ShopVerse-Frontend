import { useEffect, useState } from "react";
import { API_CONFIG } from "../../../common/constants/config";

export const ReviewStep = ({ address, payment, onBack, onConfirm, loading }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartLoading, setCartLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/carts/users/cart`, {
          credentials: "include"
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }
        
        const cartData = await response.json();
        console.log(cartData)
        setCartItems(cartData.products || []);
        setCartTotal(cartData.totalPrice || 0);
      } catch (err) {
        setError("Could not load cart information. Please try again.");
        console.error(err);
      } finally {
        setCartLoading(false);
      }
    };
    
    fetchCartData();
  }, []);

  if (cartLoading) {
    return <div className="text-center py-8">Loading order details...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={onBack}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-2 pb-2 border-b">Shipping Address</h3>
            <p className="text-gray-700">{address.street}</p>
            {address.buildingName && <p className="text-gray-700">{address.buildingName}</p>}
            <p className="text-gray-700">
              {address.city}, {address.state}
            </p>
            <p className="text-gray-700">
              {address.country} - {address.pincode}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-lg mb-2 pb-2 border-b">Payment Method</h3>
            <p className="text-gray-700">
              {payment.pgName} - Card ending with {payment.cardNumber?.slice(-4)}
            </p>
            <p className="text-sm text-gray-500">
              Payment Status: {payment.pgStatus}
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2 pb-2 border-b">Order Summary</h3>
          {cartItems.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <div className="space-y-4 mb-4">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${item.price?.toFixed(2)}</p>
                </div>
              ))}
              <div className="pt-4 border-t mt-4">
                <div className="flex justify-between font-bold">
                  <p>Total:</p>
                  <p>${cartTotal.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button 
          type="button" 
          onClick={onBack}
          disabled={loading}
          className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300 disabled:bg-gray-100"
        >
          Back
        </button>
        <button 
          onClick={onConfirm}
          disabled={loading || cartItems.length === 0}
          className="bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};