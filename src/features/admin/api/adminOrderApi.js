
const API_BASE_URL = 'http://localhost:8081/api';


const defaultOptions = {
  credentials: 'include', 
  headers: {
    'Content-Type': 'application/json'
  }
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.message || `Error: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }
  return response.json();
};


const apiService = {
  getOrders: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== 'All') {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    
    return fetch(`${API_BASE_URL}/orders${queryString}`, defaultOptions)
      .then(handleResponse);
  },
  
  getOrderDetails: async (orderId) => {
    return fetch(`${API_BASE_URL}/orders/${orderId}`, defaultOptions)
      .then(handleResponse);
  },
  
  updateOrderStatus: async (orderId, newStatus) => {
    return fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      ...defaultOptions,
      method: 'PATCH',
      body: JSON.stringify({ order_status: newStatus })
    }).then(handleResponse);
  },
  
  updatePaymentStatus: async (orderId, newStatus) => {
    return fetch(`${API_BASE_URL}/orders/${orderId}/payment`, {
      ...defaultOptions,
      method: 'PATCH',
      body: JSON.stringify({ payment_status: newStatus })
    }).then(handleResponse);
  },
  
  getProducts: async () => {
    return fetch(`${API_BASE_URL}/products`, defaultOptions)
      .then(handleResponse);
  }
};

export default apiService;