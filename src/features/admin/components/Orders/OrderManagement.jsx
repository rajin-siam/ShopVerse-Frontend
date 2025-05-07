import { useState, useEffect } from 'react';
import OrderHeader from './OrderHeader';
import OrderFilters from './OrderFilters';
import OrdersTable from './OrdersTable';
import OrderDetailSidebar from './OrderDetailsSidebar';
import { mockOrders } from './data/mockOrderData'

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('order_date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders - replace with API call
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 500);
  }, []);

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => {
      // Filter by search term (order ID, email)
      const searchMatch = 
        order.order_id.toString().includes(searchTerm) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by status
      const statusMatch = statusFilter === 'All' || order.order_status === statusFilter;
      
      return searchMatch && statusMatch;
    })
    .sort((a, b) => {
      if (sortField === 'order_date') {
        const dateA = new Date(a.order_date);
        const dateB = new Date(b.order_date);
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortField === 'total_amount') {
        return sortDirection === 'asc' 
          ? a.total_amount - b.total_amount 
          : b.total_amount - a.total_amount;
      } else if (sortField === 'order_id') {
        return sortDirection === 'asc' 
          ? a.order_id - b.order_id 
          : b.order_id - a.order_id;
      }
      return 0;
    });

  // Toggle order details
  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  // Select order for detailed view
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <OrderHeader />

      <div className="flex flex-1 overflow-hidden">
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4">
          <OrderFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-500">No orders found matching your criteria.</p>
            </div>
          ) : (
            <OrdersTable 
              orders={filteredOrders}
              sortField={sortField}
              sortDirection={sortDirection}
              handleSort={handleSort}
              expandedOrderId={expandedOrderId}
              toggleOrderDetails={toggleOrderDetails}
              viewOrderDetails={viewOrderDetails}
            />
          )}
        </main>

        {/* Order detail sidebar */}
        {selectedOrder && (
          <OrderDetailSidebar 
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </div>
    </div>
  );
}
