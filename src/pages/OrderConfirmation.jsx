import { Link, useParams } from "react-router-dom";

const OrderConfirmation = () => {
  const { orderId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Order Confirmed!
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          Thank you for your purchase! Your order ID is:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <code className="text-xl font-mono text-blue-600">#{orderId}</code>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            What's Next?
          </h2>
          <div className="space-y-2 text-gray-600">
            <p>• You'll receive an order confirmation email shortly</p>
            <p>• We'll notify you when your items ship</p>
            <p>• Estimated delivery: 3-5 business days</p>
          </div>
        </div>

        <Link
          to="/products"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
