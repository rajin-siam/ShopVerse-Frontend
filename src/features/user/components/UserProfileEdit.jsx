// features/user/components/UserProfileEdit.jsx
import React, { useState } from 'react';
import { updateUserProfile } from '../api/userProfileApi';
import { toast } from 'react-hot-toast';

const UserProfileEdit = ({ profile, onCancel, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: profile.fullName || '',
    phoneNumber: profile.phoneNumber || '',
    dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await updateUserProfile(formData);
      const updatedProfile = { ...profile, ...formData };
      onUpdateSuccess(updatedProfile);
      toast.success('Profile updated successfully');
    } catch (err) {
      console.error('Update failed:', err);
      setError(err.message || 'Failed to update profile');
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength="50"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            pattern="^\\+?[0-9\\s()-]*$"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
        
        {error && (
          <p className="mt-4 text-red-500">{error}</p>
        )}
      </form>
    </div>
  );
};

export default UserProfileEdit;