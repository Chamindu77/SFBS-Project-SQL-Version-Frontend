import React from 'react';
import { renderRatingStars } from '../../../Shared/renderStars';

const CoachProfile = ({ coachProfile, avgRating }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-2">
      <div>
        <img
          className="h-64 w-60 object-cover rounded-lg"
          src={coachProfile.image || 'default-image-path.jpg'}
          alt={coachProfile.coachName}
        />
        <p className="text-lg font-normal text-gray-600 mt-4">
          Coaching Sport: <span className="font-normal text-gray-800">{coachProfile.coachingSport}</span>
        </p>
        <p className="font-normal text-gray-800">
          {avgRating !== 'No Ratings' ? renderRatingStars(avgRating, '2em') : 'No Ratings'}
        </p>

        
        <p className="text-lg font-normal text-gray-600 mt-2">
          Individual Session Price: <span className="font-normal text-gray-800">Rs. {coachProfile.coachPrice.individualSessionPrice}/=</span>
        </p>
        <p className="text-lg font-normal text-gray-600 mt-2">
          Group Session Price: <span className="font-normal text-gray-800">Rs. {coachProfile.coachPrice.groupSessionPrice}/=</span>
        </p>

        {/* Available Time Slots Section */}
        <div className="bg-gray-50 rounded-lg mt-4">
          <h2 className="text-2xl font-bold text-gray-800">Available Times</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            {coachProfile.availableTimeSlots?.map(slot => (
              <li key={slot._id}>
                {new Date(slot.date).toLocaleDateString()} - {slot.timeSlot}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-0.5">{coachProfile.coachName}</h1>
        <p className="text-teal-600 text-xl font-semibold mb-4">{coachProfile.coachLevel}</p>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Experience</h2>
          <p className="text-gray-700">{coachProfile.experience}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Offered Sessions</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {coachProfile.offerSessions.map((session, index) => (
              <li key={index}>{session}</li>
            ))}
          </ul>
          <p className="text-gray-700 mt-2">{coachProfile.sessionDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default CoachProfile;
