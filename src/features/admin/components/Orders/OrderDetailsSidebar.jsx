import OrderStatusBadge from './OrderStatusBadge';
import { DollarSign, Truck } from 'lucide-react';
import { productMapping } from './data/mockOrderData';

export default function OrderDetailSidebar({ order, onClose }) {
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
          <span className="font-medium">#{order.order_id}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Date:</span>
          <span>{new Date(order.order_date).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Customer:</span>
          <span>{order.email}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Status:</span>
          <span className="flex items-center">
            <OrderStatusBadge status={order.order_status} />
          </span>
        </div>
      </div>
      
      <h3 className="font-medium mb-3">Order Items</h3>
      <div className="space-y-3 mb-6">
        {order.items.map((item) => (
          <div key={item.order_item_id} className="flex justify-between py-2 border-b">
            <div>
              <p className="font-medium">{productMapping[item.product_id] || `Product #${item.product_id}`}</p>
              <p className="text-sm text-gray-500">
                {item.quantity} × ${item.ordered_product_price.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">${((item.ordered_product_price * item.quantity) - item.discount).toFixed(2)}</p>
              {item.discount > 0 && <p className="text-sm text-green-600">-${item.discount.toFixed(2)}</p>}
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Items Subtotal:</span>
          <span>
            ${order.items.reduce((sum, item) => 
              sum + (item.ordered_product_price * item.quantity), 0).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Total Discount:</span>
          <span className="text-green-600">
            -${order.items.reduce((sum, item) => sum + item.discount, 0).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between mt-3 pt-3 border-t font-bold">
          <span>Order Total:</span>
          <span>${order.total_amount.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="mt-6 space-y-3">
        <button 
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <DollarSign size={16} className="mr-2" />
          Update Payment Status
        </button>
        <button 
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <Truck size={16} className="mr-2" />
          Update Order Status
        </button>
      </div>
    </aside>
  );
}
