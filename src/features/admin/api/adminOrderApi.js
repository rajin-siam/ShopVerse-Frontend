const API_BASE_URL = "http://localhost:8081/api";

const defaultOptions = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage =
      errorData?.message || `Error: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }
  return response.json();
};

// Field mapping from frontend to backend
const sortFieldMapping = {
  order_date: "orderDate",
  order_id: "orderId",
  total_amount: "totalAmount",
  order_status: "orderStatus",
  // Add other mappings as needed
};

const adminOrderApi = {
  getOrders: async (params = {}) => {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "All") {
        // Map the sort field if needed
        if (key === "sort" && sortFieldMapping[value]) {
          queryParams.append(key, sortFieldMapping[value]);
        } else {
          queryParams.append(key, value);
        }
      }
    });

    const queryString = queryParams.toString()
      ? `?${queryParams.toString()}`
      : "";

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/orders${queryString}`,
        defaultOptions
      );
      const data = await handleResponse(response);

      console.log(data)
      // Ensure these properties exist to prevent undefined errors
      return {
        orders: data.content || [],
        pagination: data.pagination || { pages: 1 },
      };
    } catch (error) {
      console.error("API Error in getOrders:", error);
      throw error;
    }
  },

  getOrderDetails: async (orderId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/order/${orderId}`,{
          credentials: 'include',
        }
      );
      return handleResponse(response);
    } catch (error) {
      console.error("API Error in getOrderDetails:", error);
      throw error;
    }
  },

  updateOrderStatus: async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/orders/${orderId}/status`,
        {
          ...defaultOptions,
          method: "PATCH",
          body: JSON.stringify({ status: newStatus }),
        }
      );
      return handleResponse(response);
    } catch (error) {
      console.error("API Error in updateOrderStatus:", error);
      throw error;
    }
  },

  updatePaymentStatus: async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/orders/${orderId}/payment`,
        {
          ...defaultOptions,
          method: "PATCH",
          body: JSON.stringify({ paymentStatus: newStatus }),
        }
      );
      return handleResponse(response);
    } catch (error) {
      console.error("API Error in updatePaymentStatus:", error);
      throw error;
    }
  },

  getProducts: async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/public/products`,
        defaultOptions
      );
      const data = await handleResponse(response);
      console.log(data)

      // Ensure the products property exists to prevent undefined errors
      return {
        products: data.products || [],
      };
    } catch (error) {
      console.error("API Error in getProducts:", error);
      throw error;
    }
  },
};

export default adminOrderApi;
