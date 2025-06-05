import { API_CONFIG } from '../../../common/constants/config';

// Function to fetch all products
export async function fetchAllProducts(
  pageNumber = 0,
  pageSize = 10,
  sortBy = "productId",
  sortOrder = "asc"
) {
  const url = `${API_CONFIG.BASE_URL}/public/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch all products. Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

// Function to fetch products by keyword
export async function fetchProductsByKeyword(
  keyword,
  pageNumber = 0,
  pageSize = 10,
  sortBy = "productName",
  sortOrder = "desc"
) {
  const encodedKeyword = encodeURIComponent(keyword);
  const url = `${API_CONFIG.BASE_URL}/public/products/keyword/${encodedKeyword}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to search products. Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export const fetchProductsByCategoryId = async (
  categoryId,
  pageNumber = 0,
  pageSize = 10,
  sortBy = "productName",
  sortOrder = "desc"
) => {
  try {
    const url = `${API_CONFIG.BASE_URL}/public/categories/${categoryId}/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch products by category");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

// Function to fetch product details by ID
export async function fetchProductById(productId) {
  const url = `${API_CONFIG.BASE_URL}/public/products/${productId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch product details. Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}