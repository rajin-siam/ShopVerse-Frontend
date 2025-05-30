export const loginUser = async (username, password) => {
  try {
    const response = await fetch("http://localhost:8081/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json(); // Parse error response
      throw new Error(errorData.message || "Login failed"); // Use server-provided message
    }

    return await response.json(); // Return parsed data
  } catch (err) {
    console.error("Login error:", err);
    throw new Error(err.message || "An unexpected error occurred");
  }
};

export const signUpUser = async (userData) => {
  const response = await fetch("http://localhost:8081/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json(); // or response.json() if the server returns a JSON error
    throw new Error(error.message || "Failed to Sign up");
  }

  const data = await loginUser(userData.username, userData.password);
  return data;
};


export const signOutUser = async () => {
  try {
    const response = await fetch("http://localhost:8081/api/auth/signout", {
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


// Google Authentication API Function
// Add this to your authApi.js file

export const googleLogin = async (tokenId) => {
  try {
    const response = await fetch("http://localhost:8081/api/auth/google", {
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
