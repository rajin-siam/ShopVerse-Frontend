import { useState, useEffect } from "react";

const EditProductModal = ({ isOpen, onClose, onSubmit, initialData, categories }) => {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    image: "",
    quantity: 0,
    price: 0,
    discount: 0,
    specialPrice: 0,
    categoryId: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            className="w-full p-2 border rounded"
            value={formData.productName}
            onChange={handleChange}
            required
          />

          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="border px-2 py-1 w-full mb-4"
            required
          >
            <option value="">-- Select Category --</option>
            {categories &&
              categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.categoryName}
                </option>
              ))}
          </select>

          <textarea
            name="description"
            placeholder="Description"
            className="w-full p-2 border rounded"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="w-full p-2 border rounded"
            value={formData.image}
            onChange={handleChange}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            className="w-full p-2 border rounded"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="w-full p-2 border rounded"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="discount"
            placeholder="Discount %"
            className="w-full p-2 border rounded"
            value={formData.discount}
            onChange={handleChange}
          />
          <input
            type="number"
            name="specialPrice"
            placeholder="Special Price"
            className="w-full p-2 border rounded"
            value={formData.specialPrice}
            onChange={handleChange}
          />
          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
