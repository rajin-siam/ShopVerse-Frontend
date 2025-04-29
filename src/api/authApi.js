export const loginUser = async (username, password) => {
    const response = await fetch("http://localhost:8081/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      throw new Error("Login failed");
    }
  
    return response.json(); // returns token or user data
  };
  