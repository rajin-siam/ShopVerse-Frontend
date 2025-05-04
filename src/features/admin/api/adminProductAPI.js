const API_BASE =  'http://localhost:8081';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Request failed');
  }
  return response.json();
};

export const adminProductAPI = {
  getProducts: async (pageNumber = 0, pageSize = 5) => {
    const response = await fetch(
      `${API_BASE}/api/public/products?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        credentials: 'include',
      }
    );
    return handleResponse(response);
  },

  createProduct: async (categoryId, productData) => {
    const response = await fetch(
      `${API_BASE}/api/admin/categories/${categoryId}/product`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
        credentials: 'include',
      }
    );
    return handleResponse(response);
  },

  updateProduct: async (productId, productData) => {
    const response = await fetch(
      `${API_BASE}/api/admin/products/${productId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
        credentials: 'include',
      }
    );
    return handleResponse(response);
  },

  deleteProduct: async (productId) => {
    const response = await fetch(
      `${API_BASE}/api/admin/products/${productId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );
    return handleResponse(response);
  },

  uploadImage: async (productId, imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(
      `${API_BASE}/api/admin/products/${productId}/image`,
      {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      }
    );
    return handleResponse(response);
  },
};