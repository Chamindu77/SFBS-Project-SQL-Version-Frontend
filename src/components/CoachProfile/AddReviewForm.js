import React, { useState } from 'react';

const AddReviewForm = ({ onSubmitReview, submitError }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitReview(rating, comment);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800">Leave a Review</h2>
      {submitError && <p className="text-red-500">{submitError}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="block text-gray-700">Rating (out of 5)</label>
          <input
            type="number"
            step="0.1"
            max="5"
            min="0"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-20"
            placeholder="Rate"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Write your comment"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-800"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReviewForm;
