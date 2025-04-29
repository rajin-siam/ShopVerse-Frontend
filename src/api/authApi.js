
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
      const error = await response.text(); // or response.json() if the server returns a JSON error
      throw new Error(error || "Failed to sign up");
    }
    console.log(userData)

    
    const data = await loginUser(userData.username, userData.password);
    return data;
  };