import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      login(data); // set user or token
      navigate("/products"); // go to home/dashboard
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-6 shadow">
      <h2 className="text-xl font-bold mb-4">Sign In</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="block w-full mb-4 border px-3 py-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full mb-4 border px-3 py-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Login
      </button>

      <p className="text-center mt-4 text-sm text-gray-600">Don't have an account?</p>
      <button
        type="button"
        onClick={() => navigate("/signup")}
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded w-full mt-2"
      >
        Sign Up
      </button>
    </form>
  );
};

export default LoginPage;
