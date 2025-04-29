// SignupPage.jsx
import { useState } from "react";
import { signUpUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: ["user"], // default role
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signUpUser(formData);
      login(data)
      alert("Signup successful!");

      navigate('/products')
    } catch (err) {
      alert("Signup failed!");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 shadow">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="block w-full mb-4 border px-3 py-2"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="block w-full mb-4 border px-3 py-2"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="block w-full mb-4 border px-3 py-2"
        required
      />
      <select
        name="role"
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            role: [e.target.value],
          }))
        }
        className="block w-full mb-4 border px-3 py-2"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Sign Up
      </button>
    </form>
  );
};

