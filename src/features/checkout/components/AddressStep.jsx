import { useState } from "react";

export const AddressStep = ({ onNext }) => {
  const [formData, setFormData] = useState({
    street: "Santosh",
    city: "Tangail",
    state: "Dhaka",
    country: "Bangladesh",
    pincode: "14200",
    buildingName: "BSMRH",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:8081/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include"
      });

      if (response.status !== 201) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      onNext({ ...formData, addressId: data.addressId }); // Pass full address data
      
    } catch (err) {
      setError(err.message || "Failed to save address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Street Address</label>
          <input
            required
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>City</label>
          <input
            required
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>State</label>
          <input
            required
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Pincode</label>
          <input
            required
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Building Name</label>
          <input
            value={formData.buildingName}
            onChange={(e) => setFormData({ ...formData, buildingName: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Country</label>
          <input
            value={formData.country}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? "Saving..." : "Continue to Payment"}
      </button>
    </form>
  );
};