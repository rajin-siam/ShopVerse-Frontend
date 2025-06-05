import { API_CONFIG } from '../../../common/constants/config';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => response.text());
    throw new Error(error.message || String(error));
  }
  return response.json();
};

export const adminCategoryAPI = {
  getCategories: async () => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/public/categories`, {
      credentials: "include",
    });
    return handleResponse(response);
  },

  createCategory: async (categoryData) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/public/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({categoryName : categoryData}),
      credentials: "include",
    });
    return handleResponse(response);
  },

  updateCategory: async (categoryId, categoryData) => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}/public/categories/${categoryId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
        credentials: "include",
      }
    );
    return handleResponse(response);
  },

  deleteCategory: async (categoryId) => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}/public/categories/${categoryId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    return handleResponse(response);
  },

  getCategoryProducts: async (categoryId) => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}/public/categories/${categoryId}/products`
    );
    return handleResponse(response);
  },
};


