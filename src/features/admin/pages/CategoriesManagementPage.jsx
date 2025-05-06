import { useState, useEffect } from 'react';
import { adminCategoryAPI } from './../api/adminCategoryAPI'
import CategoryTable from '../components/Categories/CategoryTable';
import AddCategoryModal from '../components/modals/AddCategoryModal';
import EditCategoryModal from '../components/modals/EditCategoryModal';

const CategoriesManagementPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const data = await adminCategoryAPI.getCategories();
      setCategories(data.content);
    } catch (err) {
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle category creation
  const handleCreate = async (categoryName) => {
    try {
      await adminCategoryAPI.createCategory(categoryName);
      fetchCategories();
      setShowAddModal(false);
    } catch (err) {
      alert('Failed to create category');
    }
  };

  // Handle category update
  const handleUpdate = async (categoryId, newName) => {
    try {
      await adminCategoryAPI.updateCategory(categoryId, newName);
      fetchCategories();
      setShowEditModal(false);
    } catch (err) {
      alert('Failed to update category');
    }
  };

  // Handle category deletion
  const handleDelete = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await adminCategoryAPI.deleteCategory(categoryId);
        fetchCategories();
      } catch (err) {
        alert('Failed to delete category');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <button 
        onClick={() => setShowAddModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Category
      </button>

      <CategoryTable
        categories={categories}
        onEdit={(category) => {
          setSelectedCategory(category);
          setShowEditModal(true);
        }}
        onDelete={handleDelete}
      />

      {/* Add Modal */}
      {showAddModal && (
        <AddCategoryModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleCreate}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <EditCategoryModal
          category={selectedCategory}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
};

export default CategoriesManagementPage;