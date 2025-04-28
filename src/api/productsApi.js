// Function to fetch all products
export async function fetchAllProducts(pageNumber = 0, pageSize = 10, sortBy = 'productId', sortOrder = 'asc') {
  const url = `http://localhost:8081/api/public/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
  const response = await fetch(url);

  if (!response.ok) {
      throw new Error(`Failed to fetch all products. Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

// Function to fetch products by keyword
export async function fetchProductsByKeyword(keyword, pageNumber = 0, pageSize = 10, sortBy = 'productName', sortOrder = 'desc') {
  const url = `http://localhost:8081/api/public/products/keyword/${keyword}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
  const response = await fetch(url);
  
  if (!response.ok) {
      throw new Error(`Failed to search products. Status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data);  // Log after data is fetched

  return data;
}
