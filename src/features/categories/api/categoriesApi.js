export async function fetchCategories(
  pageNumber = 0, 
  pageSize = 8,
  sortBy = "categoryName",
  sortOrder = "desc"
) {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  try {
    const response = await fetch(
      `${apiUrl}/public/categories?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`
    );
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { content: [] };
  }
}