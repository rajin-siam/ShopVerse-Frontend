import { useState, useEffect } from "react";
import OrderHeader from "./OrderHeader";
import OrderFilters from "./OrderFilters";
import OrdersTable from "./OrdersTable";
import OrderDetailSidebar from "./OrderDetailsSidebar";
import adminOrderApi from "../../api/adminOrderApi";

export default function OrderManagement() {
  // State management
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState("orderDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Pagination state
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch orders from API
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    console.log(searchTerm)
    try {
      const response = await adminOrderApi.getOrders({
        pageNumber,
        pageSize,
        sortBy: sortField,
        sortOrder: sortDirection, // Changed from sortDirection to sortOrder to match API
        orderStatus: statusFilter !== "All" ? statusFilter : undefined,
        search: searchTerm || undefined,
      });

      // Safely set orders with a fallback to an empty array
      setOrders(response?.orders || []);
      
      // Set total pages if available in the response
      if (response?.totalPages) {
        setTotalPages(response.totalPages);
      }

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch orders");
      setLoading(false);
      console.error("Error fetching orders:", err);
      // Ensure orders is at least an empty array on error
      setOrders([]);
    }
  };

  // Load orders on component mount and when dependencies change
  useEffect(() => {
    fetchOrders();
  }, [pageNumber, pageSize, sortField, sortDirection, statusFilter, searchTerm]);

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Toggle order details
  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  // View order details in sidebar
  const viewOrderDetails = async (orderId) => {
    try {
      setLoading(true);
      const orderDetails = await adminOrderApi.getOrderDetails(orderId);
      console.log("view order details")
      console.log(orderDetails)
      setSelectedOrder(orderDetails);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching order details:", err);
      setError("Failed to load order details");
      setLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await adminOrderApi.updateOrderStatus(orderId, newStatus);

      // Refresh orders list
      fetchOrders();

      // If the updated order is selected, refresh its details
      if (selectedOrder && selectedOrder.orderId === orderId) {
        const updatedOrder = await adminOrderApi.getOrderDetails(orderId);
        setSelectedOrder(updatedOrder);
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      setError("Failed to update order status");
    }
  };

  // Update payment status
  const updatePaymentStatus = async (orderId, newStatus) => {
    try {
      await adminOrderApi.updatePaymentStatus(orderId, newStatus);

      // Refresh orders list
      fetchOrders();
      
      // If the updated order is selected, refresh its details
      if (selectedOrder && selectedOrder.orderId === orderId) {
        const updatedOrder = await adminOrderApi.getOrderDetails(orderId);
        setSelectedOrder(updatedOrder);
      }
    } catch (err) {
      console.error("Error updating payment status:", err);
      setError("Failed to update payment status");
    }
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

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (orders && orders.length === 0) ? (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-500">
                No orders found matching your criteria.
              </p>
            </div>
          ) : (
            <>
              <OrdersTable
                orders={orders || []}
                sortField={sortField}
                sortDirection={sortDirection}
                handleSort={handleSort}
                expandedOrderId={expandedOrderId}
                toggleOrderDetails={toggleOrderDetails}
                viewOrderDetails={viewOrderDetails}
              />

              {totalPages > 1 && (
                <div className="mt-4 flex justify-center">
                  <nav className="flex items-center gap-2">
                    <button
                      onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                      disabled={pageNumber === 1}
                      className={`px-3 py-1 rounded ${
                        pageNumber === 1
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-700">
                      Page {pageNumber} of {totalPages}
                    </span>
                    <button
                      onClick={() =>
                        setPageNumber((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={pageNumber === totalPages}
                      className={`px-3 py-1 rounded ${
                        pageNumber === totalPages
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </main>

        {/* Order detail sidebar */}
        {selectedOrder && (
          <OrderDetailSidebar
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            updateOrderStatus={updateOrderStatus}
            updatePaymentStatus={updatePaymentStatus}
          />
        )}
      </div>
    </div>
  );
}