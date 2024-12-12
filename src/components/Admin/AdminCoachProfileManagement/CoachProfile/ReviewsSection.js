import React from 'react';
import { renderRatingStars } from '../../../Shared/renderStars';

const ReviewsSection = ({ reviews }) => {
  return (
    <div className="mt-0">
      <h2 className="text-xl font-semibold text-gray-800">Reviews ({reviews.length})</h2>
      
      
      <div
        className="space-y-4 mt-4 p-4 border border-gray-300 rounded-lg"
        style={{ maxHeight: '300px', overflowY: 'auto' }} 
      >
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review._id} className="p-2 border border-gray-400 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900">{review.name}</h3>
              <p className="text-sm text-gray-600">{renderRatingStars(review.rating, '1.5em')}</p>
              <p className="text-gray-700 mt-2">{review.comment}</p>
              <p className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
