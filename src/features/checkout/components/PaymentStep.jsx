import { useState } from "react";

export const PaymentStep = ({ onBack, onNext }) => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: "4242424242424242", // Test card number
    expiry: "12/25",
    cvv: "123",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add payment validation here
    onNext({
      cardNumber: paymentData.cardNumber, // Pass actual card number
      pgName: "Stripe",
      pgPaymentId: "pi_" + Math.random().toString(36).substring(2, 15), // Mock payment ID
      pgStatus: "succeeded",
      pgResponseMessage: "Payment successful",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Card Number</label>
        <input
          type="text"
          value={paymentData.cardNumber}
          onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label>Expiry Date</label>
        <input
          type="text"
          value={paymentData.expiry}
          onChange={(e) => setPaymentData({...paymentData, expiry: e.target.value})}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label>CVV</label>
        <input
          type="text"
          value={paymentData.cvv}
          onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex gap-4">
        <button 
          type="button" 
          onClick={onBack}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Back
        </button>
        <button 
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Review Order
        </button>
      </div>
    </form>
  );
};