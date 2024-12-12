import React from 'react';
import { renderRatingStars } from '../Shared/renderStars';

const CoachDetails = ({ coach }) => {
  return (
    <div className="w-full md:w-1/3 flex flex-col items-center md:items-start">
      <img
        className="h-56 w-52 object-cover rounded-lg"
        src={coach.image || 'default-image-path.jpg'}
        alt={coach.coachName}
      />
      <div className="mt-2 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-2">{coach.coachName}</h2>
        <p className="text-teal-600 font-semibold mb-0">{coach.coachLevel}</p>
        <p className="text-gray-700 mb-0">{coach.coachingSport}</p>

        <div className="flex items-center space-x-2">
          <div>{coach.avgRating ? renderRatingStars(coach.avgRating, '2em') : 'No Ratings'}</div>
        </div>

        {/* Updated Price Section */}
        <p className="text-teal-700 text-sm font-normal mt-2">
          Individual Session Price: Rs.{coach.coachPrice.individualSessionPrice}/=
        </p>
        <p className="text-teal-700 text-sm font-normal mt-2">
          Group Session Price: Rs.{coach.coachPrice.groupSessionPrice}/=
        </p>
      </div>

      <div className="mt-4 w-full">
        <h4 className="text-lg font-semibold">Offered Sessions:</h4>
        <ul className="list-disc list-inside text-gray-700 mt-0 space-y-1">
          {coach.offerSessions.map((session, index) => (
            <li key={index}>{session}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoachDetails;
