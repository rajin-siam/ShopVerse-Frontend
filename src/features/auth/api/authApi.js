
export const loginUser = async (username, password) => {
  try {
    const response = await fetch("http://localhost:8081/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
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
    console.log(userData)
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