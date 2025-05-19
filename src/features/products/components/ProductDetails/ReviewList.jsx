// ReviewList.jsx
import React from "react";
import ReviewItem from "./ReviewItem";

const ReviewList = ({ reviews, currentUser, onDelete, onEdit }) => {
  // Sort reviews to show user's review first, then by date (newest to oldest)
  const sortedReviews = [...reviews].sort((a, b) => {
    // If current user exists and has a review, show it first
    if (currentUser && a.userEmail === currentUser.email) return -1;
    if (currentUser && b.userEmail === currentUser.email) return 1;
    
    // Then sort by date (newest first)
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="space-y-6">
      {sortedReviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          isOwner={currentUser && review.userEmail === currentUser.email}
          onDelete={() => onDelete(review.id)}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ReviewList;