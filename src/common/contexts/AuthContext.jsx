import { createContext, useContext, useState, useEffect } from "react";
import { signOutUser } from "../../features/auth/api/authApi";
import { toast } from "react-hot-toast"; 
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Or store token
  const [loading, setLoading] = useState(true); 
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    toast.success("User Logged in Successfully")
  };

  const logout = async () => {
    try {
      await signOutUser();
      setUser(null);
      localStorage.removeItem("user");
      toast.success("Logged out successfully!"); 
    } catch (err) {
      setUser(null);
      localStorage.removeItem("user");
      toast.error("Logout failed. Please try again.");
    }
  };
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false)
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
