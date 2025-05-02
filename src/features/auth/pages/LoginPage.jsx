import { useState } from "react";
import { useAuth } from "./../../../common/contexts/AuthContext";
import { loginUser } from "./../api/authApi";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error on retry

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      const data = await loginUser(username, password);
      login(data);
      navigate("/products");
    } catch (err) {
      if (err.message === "Failed to fetch") {
        setError("Network error. Please check your connection.");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <>
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

        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?
        </p>
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded w-full mt-2"
        >
          Sign Up
        </button>
      </form>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
    </>
  );
};

export default LoginPage;
