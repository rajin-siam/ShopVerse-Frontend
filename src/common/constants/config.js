export const PAGINATION_CONFIG = {
    DEFAULT_PAGE_SIZE: 10,
    SORT_BY: "productName",
    SORT_ORDER: "desc",
    DEFAULT_VISIBLE_PAGES: 5 // Number of visible page buttons
};

// Add API configuration
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api"
};