import { API_CONFIG } from '../../../common/constants/config';

const apiClient = async (url, options = {}) => {
  const response = await fetch(`${API_CONFIG.BASE_URL}/carts${url}`, {
    credentials: "include",
    ...options,
  });

  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    const error = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();
    throw new Error(error.message || error);
  }

  return contentType?.includes("application/json")
    ? response.json()
    : response.text();
};

export const addToCart = (productId, quantity) =>
  apiClient(`/products/${productId}/quantity/${quantity}`, { method: "POST" });

export const fetchCart = () => apiClient("/users/cart");

export const updateQuantity = (productId, operation) =>
  apiClient(`/products/${productId}/quantity/${operation}`, { method: "PUT" });

export const removeFromCart = (cartId, productId) =>
  apiClient(`/${cartId}/product/${productId}`, { method: "DELETE" });