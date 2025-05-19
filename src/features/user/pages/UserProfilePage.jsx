// features/user/pages/UserProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { fetchUserProfile } from '../api/userProfileApi';
import UserProfileView from '../components/UserProfileView';
import UserProfileEdit from '../components/UserProfileEdit';
import { toast } from 'react-hot-toast';

const UserProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        const data = await fetchUserProfile();
        setUserProfile(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load profile:', err);
        setError(err.message || 'Failed to load user profile');
        toast.error(err.message || 'Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleProfileUpdate = (updatedProfile) => {
    setUserProfile(updatedProfile);
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      
      {isEditing ? (
        <UserProfileEdit 
          profile={userProfile} 
          onCancel={handleEditToggle} 
          onUpdateSuccess={handleProfileUpdate}
        />
      ) : (
        <UserProfileView 
          profile={userProfile} 
          onEditClick={handleEditToggle} 
        />
      )}
    </div>
  );
};

export default UserProfilePage;