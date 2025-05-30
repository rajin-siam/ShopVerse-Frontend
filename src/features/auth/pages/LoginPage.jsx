import { useState, useEffect } from "react";
import { useAuth } from "./../../../common/contexts/AuthContext";
import { loginUser, googleLogin } from "./../api/authApi";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError(""); // Reset error on retry

    if (!username || !password) {
      setError("Username and password are required");
      setLoading(false);
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
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError("");
    
    try {
      // Extract the token ID from the credential response
      const tokenId = credentialResponse.credential;
      
      // Send the token to your backend
      const data = await googleLogin(tokenId);
      
      // Use the same login function to update auth context
      login(data);
      navigate("/products");
    } catch (err) {
      setError(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleFailure = () => {
    setError("Google sign-in was cancelled or failed");
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
          disabled={loading}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="my-4 relative flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-600">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Login Button */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            useOneTap
            theme="filled_blue"
            shape="rectangular"
            text="signin_with"
            size="large"
          />
        </div>

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

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </>
  );
};

export default LoginPage;