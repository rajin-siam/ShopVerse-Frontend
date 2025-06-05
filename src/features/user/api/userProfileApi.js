import { API_CONFIG } from '../../../common/constants/config';

export const fetchUserProfile = async () => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/user/profile`, {
      method: "GET",
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch user profile");
    }

    return await response.json();
  } catch (err) {
    console.error("Error fetching user profile:", err);
    throw new Error(err.message || "An unexpected error occurred");
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/user/profile`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update user profile");
    }

    return await response.json();
  } catch (err) {
    console.error("Error updating user profile:", err);
    throw new Error(err.message || "An unexpected error occurred");
  }
};