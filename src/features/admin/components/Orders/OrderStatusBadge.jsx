import { CheckCircle, Clock, Truck, AlertCircle } from "lucide-react";

export default function OrderStatusBadge({ status }) {
  // Normalize status to lowercase for comparison
  const normalizedStatus = status ? status.toLowerCase() : '';
  
  // Format display status with first letter capitalized
  const displayStatus = status ? 
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : '';
  
  // Get status icon based on order status
  const getStatusIcon = (normalizedStatus) => {
    switch (normalizedStatus) {
      case "delivered":
        return <CheckCircle className="text-green-500" size={16} />;
      case "processing":
        return <Clock className="text-blue-500" size={16} />;
      case "shipped":
        return <Truck className="text-purple-500" size={16} />;
      case "pending":
        return <Clock className="text-yellow-500" size={16} />;
      case "cancelled":
        return <AlertCircle className="text-red-500" size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center">
      {getStatusIcon(normalizedStatus)}
      <span
        className={`ml-1 text-sm ${
          normalizedStatus === "delivered"
            ? "text-green-800"
            : normalizedStatus === "processing"
            ? "text-blue-800"
            : normalizedStatus === "shipped"
            ? "text-purple-800"
            : normalizedStatus === "pending"
            ? "text-yellow-800"
            : "text-red-800"
        }`}
      >
        {displayStatus}
      </span>
    </div>
  );
}