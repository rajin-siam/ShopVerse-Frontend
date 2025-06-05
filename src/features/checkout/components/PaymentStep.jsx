import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { API_CONFIG } from "../../../common/constants/config";

// Load Stripe outside of component render cycle (important!)
const stripePromise = loadStripe("pk_test_51RLfs6Q0a3A1oMbPUDHCcTmXuDhlrA4MUZCJ9gYppOQDs4cRcZwbTkzveuSyAOF0suNZjTLjo5w8lcU1lj4uNPx700MRHBZ6ZK");

const StripeCheckoutForm = ({ onBack, onNext }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [succeeded, setSucceeded] = useState(false);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${API_CONFIG.BASE_URL}/payments/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        setClientSecret(data.clientSecret);
      })
      .catch(err => {
        setError("Failed to initialize payment. Please try again.");
        console.error(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setSucceeded(true);
      // Pass payment data to parent component
      onNext({
        cardNumber: "•••• •••• •••• ••••", // We don't store actual card numbers
        pgName: "Stripe",
        pgPaymentId: payload.paymentIntent.id,
        pgStatus: payload.paymentIntent.status,
        pgResponseMessage: "Payment processed successfully"
      });
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border rounded-lg bg-white">
        <h3 className="text-lg font-medium mb-4">Enter Payment Details</h3>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Credit or debit card
          </label>
          <div className="p-3 border rounded-md">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm mb-4">{error}</div>
        )}

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!stripe || processing || succeeded}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {processing ? "Processing..." : "Continue to Review"}
          </button>
        </div>
      </div>
    </form>
  );
};

export const PaymentStep = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <StripeCheckoutForm {...props} />
    </Elements>
  );
};