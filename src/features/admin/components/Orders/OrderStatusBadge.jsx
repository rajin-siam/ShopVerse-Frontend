import { CheckCircle, Clock, Truck, AlertCircle } from "lucide-react";

export default function OrderStatusBadge({ status }) {
  // Get status icon based on order status
  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="text-green-500" size={16} />;
      case "Processing":
        return <Clock className="text-blue-500" size={16} />;
      case "Shipped":
        return <Truck className="text-purple-500" size={16} />;
      case "Pending":
        return <Clock className="text-yellow-500" size={16} />;
      case "Cancelled":
        return <AlertCircle className="text-red-500" size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center">
      {getStatusIcon(status)}
      <span
        className={`ml-1 text-sm ${
          status === "Delivered"
            ? "text-green-800"
            : status === "Processing"
            ? "text-blue-800"
            : status === "Shipped"
            ? "text-purple-800"
            : status === "Pending"
            ? "text-yellow-800"
            : "text-red-800"
        }`}
      >
        {status}
      </span>
    </div>
  );
}
