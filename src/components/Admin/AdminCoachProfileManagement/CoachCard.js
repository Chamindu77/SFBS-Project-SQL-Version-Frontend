import React, { useState } from 'react';
import { FaPlay, FaPowerOff } from 'react-icons/fa';
import { renderRatingStars } from '../../Shared/renderStars';
import Modal from './Modal'; 
import CoachProfilePage from './CoachProfile/CoachProfilePage'; 

const CoachCard = ({ coach, isActive, handleToggleStatus }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
//console.log(coach)
  const handleViewProfile = () => {
    setIsModalOpen(true);  
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);  
  };

  const handleToggleStatusApi = async (coachUserId, status) => {
    try {
      const token = localStorage.getItem('token');
      console.log(coachUserId)
      const response = await fetch(`http://localhost:5000/api/v1/coach-profile/toggle/${coachUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ isActive: status }),
      });

      if (response.ok) {
        const updatedCoach = await response.json();
        handleToggleStatus(updatedCoach.userId, updatedCoach.isActive);
      } else {
        console.error('Failed to toggle status');
      }
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

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
          </div>
          <div className="text-right">
            <div className="mt-2 flex space-x-2">
              <button
                className="bg-white text-teal-600 font-semibold py-2 px-4 border border-teal-500 rounded-lg hover:bg-teal-700 hover:text-white"
                onClick={handleViewProfile}  
              >
                View Profile
              </button>
              {isActive ? (
                <button
                  className="bg-sky-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-sky-900 flex items-center"
                  onClick={() => handleToggleStatusApi(coach.userId, false)}  // Deactivate coach
                >
                  <FaPowerOff className="mr-2" /> Deactivate
                </button>
              ) : (
                <button
                  className="bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-800 flex items-center"
                  onClick={() => handleToggleStatusApi(coach.userId, true)}  // Activate coach
                >
                  <FaPlay className="mr-2" /> Activate
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CoachProfilePage 
          coachId={coach.coachProfileId}  
          coachUserId={coach.userId}  
        />  
      </Modal>
    </div>
  );
};

export default CoachCard;
