import React, { useState } from 'react';
import { renderRatingStars } from '../Shared/renderStars';

const ReviewsSection = ({ reviews }) => {
  const [visibleReviews, setVisibleReviews] = useState(2);

  const handleLoadMore = () => {
    setVisibleReviews(prevVisibleReviews => prevVisibleReviews + 2);
  };

  return (
    <div className="mt-0">
      <h2 className="text-xl font-semibold text-gray-800">Reviews ({reviews.length})</h2>
      <div className="space-y-4 mt-4">
        {reviews.length > 0 ? (
          reviews.slice(0, visibleReviews).map(review => (
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
        {visibleReviews < reviews.length && (
          <button
            onClick={handleLoadMore}
            className="bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-800 mt-4"
          >
            Load More Reviews
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
