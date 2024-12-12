import React from 'react';
import { renderRatingStars } from '../Shared/renderStars';

const CoachCard = ({ coach, handleViewProfile, handleCoachBooking }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 flex flex-col md:flex-row items-center p-4">
      <div className="flex-shrink-0">
        <img
          className="h-56 w-52 object-cover rounded-lg"
          src={coach.image || 'default-image-path.jpg'}
          alt={coach.coachName}
        />
      </div>
      <div className="flex-grow ml-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-900">{coach.coachName}</h3>
          <p className="text-base font-bold text-gray-700">{coach.coachingSport}</p>
        </div>
        <p className="text-teal-600 font-semibold mb-2">{coach.coachLevel}</p>
        <p className="text-gray-700 mb-4">{coach.experience}</p>
        <div className="mt-4">
          <p className="text-lg font-semibold text-gray-800">
            Sessions: <span className="text-gray-700 font-normal">{coach.offerSessions.join(', ')}</span>
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center mt-6">
            {coach.avgRating ? renderRatingStars(coach.avgRating) : <span>No ratings yet</span>}
            {/* <p className="ml-2 font-normal text-teal-700">Per Hour: Rs. {coach.coachPrice}/=</p> */}
          </div>
          <div className="text-right">
            <div className="mt-2 flex space-x-2">
              <button
                className="bg-white text-teal-600 font-semibold py-2 px-4 border border-teal-500 rounded-lg hover:bg-teal-700 hover:text-white"
                onClick={() => handleViewProfile(`/coach-profile/${coach.coachProfileId}`)}
              >
                View Profile
              </button>
              <button
                className="bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-800"
                onClick={() => handleCoachBooking(`/coach-booking/${coach.coachProfileId}`)}
              >
                Book Now →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachCard;
