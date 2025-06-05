import { API_CONFIG } from '../../../common/constants/config';

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    return await response.json();
  } catch (err) {
    console.error("Login error:", err);
    throw new Error(err.message || "An unexpected error occurred");
  }
};

export const signUpUser = async (userData) => {
  const response = await fetch(`${API_CONFIG.BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to Sign up");
  }

  const data = await loginUser(userData.username, userData.password);
  return data;
};

export const signOutUser = async () => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/auth/signout`, {
      method: "POST",
      credentials: "include", 
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Logout failed");
    }

    return await response.json(); 
  } catch (err) {
    console.error("Logout error:", err);
    throw new Error(err.message || "Failed to disconnect session");
  }
};

export const googleLogin = async (tokenId) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: tokenId }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Google login failed");
    }

    return await response.json();
  } catch (err) {
    console.error("Google login error:", err);
    throw new Error(err.message || "An unexpected error occurred");
  }
};
