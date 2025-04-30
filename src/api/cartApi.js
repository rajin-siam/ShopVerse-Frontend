const API_BASE = "http://localhost:8081/api/carts";

const apiClient = async (url, options = {}) => {
  const response = await fetch(`${API_BASE}${url}`, {
    credentials: "include",
    ...options,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Request failed");
  }

  return response.json();
};

export const addToCart = (productId, quantity) =>
  apiClient(`/products/${productId}/quantity/${quantity}`, { method: "POST" });

export const fetchCart = () => apiClient("/users/cart");

export const updateQuantity = (productId, operation) =>
  apiClient(`/products/${productId}/quantity/${operation}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

export const removeFromCart = (cartId, productId) =>
  apiClient(`/${cartId}/product/${productId}`, { method: "DELETE" });
