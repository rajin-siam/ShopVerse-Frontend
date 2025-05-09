import { useState, useEffect } from 'react';
import OrderStatusBadge from './OrderStatusBadge';
import { DollarSign, Truck } from 'lucide-react';

export default function OrderDetailSidebar({ order, onClose, updateOrderStatus, updatePaymentStatus }) {
  const [currentStatus, setCurrentStatus] = useState(order.orderStatus);
  
  // Update local state when order prop changes
  useEffect(() => {
    setCurrentStatus(order.orderStatus);
  }, [order.orderStatus]);

  // Order status options
  const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  
  // Handle status change
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
    updateOrderStatus(order.orderId, newStatus);
  };

  return (
    <aside className="hidden md:block w-96 bg-white border-l overflow-y-auto p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-bold">Order Details</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
      
      <div className="border-b pb-4 mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Order ID:</span>
          <span className="font-medium">#{order.orderId}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Date:</span>
          <span>{new Date(order.orderDate).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Customer:</span>
          <span>{order.email}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Status:</span>
          <div className="flex items-center">
            <OrderStatusBadge status={currentStatus} />
          </div>
        </div>
      </div>
      
      <h3 className="font-medium mb-3">Order Items</h3>
      <div className="space-y-3 mb-6">
        {order.orderItems && order.orderItems.map((item) => (
          <div key={item.orderItemId} className="flex justify-between py-2 border-b">
            <div>
              <p className="font-medium">{item.product.productName}</p>
              <p className="text-sm text-gray-500">
                {item.quantity} × ${parseFloat(item.orderedProductPrice).toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                ${((item.orderedProductPrice * item.quantity) - item.discount).toFixed(2)}
              </p>
              {item.discount > 0 && 
                <p className="text-sm text-green-600">-${parseFloat(item.discount).toFixed(2)}</p>
              }
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Items Subtotal:</span>
          <span>
            ${order.orderItems && order.orderItems.reduce((sum, item) => 
              sum + (item.orderedProductPrice * item.quantity), 0).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Total Discount:</span>
          <span className="text-green-600">
            -${order.orderItems && order.orderItems.reduce((sum, item) => sum + item.discount, 0).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between mt-3 pt-3 border-t font-bold">
          <span>Order Total:</span>
          <span>${parseFloat(order.totalAmount).toFixed(2)}</span>
        </div>
      </div>
      
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium">Update Order Status:</span>
          <select
            value={currentStatus}
            onChange={handleStatusChange}
            className="w-1/2 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={() => updatePaymentStatus(order.orderId, 'Paid')}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <DollarSign size={16} className="mr-2" />
          Update Payment Status
        </button>
      </div>
    </aside>
  );
}