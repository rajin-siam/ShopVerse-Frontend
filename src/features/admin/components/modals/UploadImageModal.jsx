import { useState } from "react";

const UploadImageModal = ({ isOpen, onClose, productId, onUploaded }) => {
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      await fetch(`/api/products/${productId}/image`, {
        method: "PUT",
        body: formData,
      });
      onUploaded(); // refresh product list
      onClose();
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-96 shadow-md"
      >
        <h2 className="text-lg font-semibold mb-4">Upload Product Image</h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
          className="mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadImageModal;
