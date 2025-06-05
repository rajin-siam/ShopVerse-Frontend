// features/user/components/UserWishlist.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { API_CONFIG } from '../../../common/constants/config';

const UserWishlist = () => {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_CONFIG.BASE_URL}/public/wishlist`,{
        credentials: "include"
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      setWishlist(data);
      setError(null);
    } catch (err) {
      console.error('Failed to load wishlist:', err);
      setError(err.message || 'Failed to load wishlist');
      toast.error('Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/public/wishlist/remove/${productId}`, {
        method: 'DELETE',
        credentials: "include"
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Failed with status: ${response.status}`);
      }
      
      toast.success('Item removed from wishlist');
      // Refresh wishlist data
      fetchWishlist();
    } catch (err) {
      console.error('Failed to remove item:', err);
      toast.error(err.message || 'Failed to remove item from wishlist');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="text-gray-600">Loading wishlist...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 mt-6">
        <p className="text-red-600">Error loading wishlist: {error}</p>
      </div>
    );
  }

  if (!wishlist || wishlist.wishlistItems.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-md p-6 mt-6 text-center">
        <p className="text-gray-600">Your wishlist is empty</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">My Wishlist ({wishlist.wishlistItems.length} items)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wishlist.wishlistItems.map((item) => (
          <div 
            key={item.wishlistItemId} 
            className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex p-4">
              <div className="w-24 h-24 flex-shrink-0">
                <img 
                  src={item.product.image} 
                  alt={item.product.productName} 
                  className="h-full w-full object-contain"
                />
              </div>
              
              <div className="ml-4 flex-grow">
                <h3 className="font-medium text-sm line-clamp-2">{item.product.productName}</h3>
                
                <div className="mt-2 flex items-baseline">
                  <span className="text-lg font-semibold">₹{item.product.specialPrice}</span>
                  {item.product.discount > 0 && (
                    <>
                      <span className="ml-2 text-sm text-gray-500 line-through">₹{item.product.price}</span>
                      <span className="ml-2 text-xs text-green-600">{item.product.discount}% off</span>
                    </>
                  )}
                </div>
                
                <div className="mt-3 flex justify-between">
                  <button
                    onClick={() => handleRemoveItem(item.product.productId)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserWishlist;