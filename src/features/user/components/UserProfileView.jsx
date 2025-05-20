// features/user/components/UserProfileView.jsx
import React, { useState } from 'react';
import UserWishlist from './UserWishlist';

const UserProfileView = ({ profile, onEditClick }) => {
  const [activeTab, setActiveTab] = useState('profile');
  
  if (!profile) return null;

  const formatDate = (isoDate) => {
    if (!isoDate) return 'Not provided';
    return new Date(isoDate).toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'profile'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'wishlist'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Wishlist
        </button>
      </div>

      {/* Profile Information */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Account Information</h2>
              <button
                onClick={onEditClick}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
              >
                Edit Profile
              </button>
            </div>
            
            <div className="border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Username</p>
                  <p className="font-medium">{profile.username}</p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-medium">{profile.email}</p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm">Full Name</p>
                  <p className="font-medium">{profile.fullName || 'Not provided'}</p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm">Phone Number</p>
                  <p className="font-medium">{profile.phoneNumber || 'Not provided'}</p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm">Date of Birth</p>
                  <p className="font-medium">{formatDate(profile.dateOfBirth)}</p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm">Account Type</p>
                  <p className="font-medium">
                    {profile.roles && profile.roles.length > 0 ? 
                      profile.roles.map(role => role.replace('ROLE_', '')).join(', ') : 
                      'Standard User'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="bg-white rounded-lg shadow p-6">
          <UserWishlist />
        </div>
      )}
    </div>
  );
};

export default UserProfileView;