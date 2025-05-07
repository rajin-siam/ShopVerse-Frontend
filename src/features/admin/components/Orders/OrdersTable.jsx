import React from 'react';
import { ChevronDown, ChevronUp, ShoppingCart } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';
import OrderItemsTable from './OrderItemsTable';

export default function OrdersTable({ 
  orders, 
  sortField, 
  sortDirection, 
  handleSort,
  expandedOrderId,
  toggleOrderDetails,
  viewOrderDetails
}) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('order_id')}
            >
              <div className="flex items-center">
                Order ID
                {sortField === 'order_id' && (
                  sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                )}
              </div>
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('order_date')}
            >
              <div className="flex items-center">
                Date
                {sortField === 'order_date' && (
                  sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                )}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('total_amount')}
            >
              <div className="flex items-center">
                Total
                {sortField === 'total_amount' && (
                  sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                )}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <React.Fragment key={order.order_id}>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{order.order_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.order_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  ${order.total_amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <OrderStatusBadge status={order.order_status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => toggleOrderDetails(order.order_id)}
                      className="text-indigo-600 hover:text-indigo-900 flex items-center"
                    >
                      <ShoppingCart size={16} className="mr-1" />
                      {expandedOrderId === order.order_id ? 'Hide Items' : 'View Items'}
                    </button>
                    <button 
                      onClick={() => viewOrderDetails(order)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Details
                    </button>
                  </div>
                </td>
              </tr>
              {expandedOrderId === order.order_id && (
                <tr>
                  <td colSpan="6" className="px-6 py-4 bg-gray-50">
                    <div className="ml-8 border-l-2 border-indigo-300 pl-4">
                      <h4 className="font-medium text-sm mb-2">Order Items:</h4>
                      <OrderItemsTable items={order.items} />
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
