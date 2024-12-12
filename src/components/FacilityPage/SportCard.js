import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaMoneyBill } from 'react-icons/fa';

const SportCard = ({ facility }) => {
  const navigate = useNavigate();

  const getFacilityLabel = (category) => {
    switch (category) {
      case 'Indoor Games':
        return 'Court No';
      case 'Outdoor Games':
        return 'Ground No';
      case 'Aquatic Sports':
        return 'Pool No';
      default:
        return 'Facility No';
    }
  };

  const handleBookNow = () => {
    navigate('/facility-booking', {
      state: {
        courtNumber: facility.courtNumber,
        sportName: facility.sportName,
        sportCategory: facility.sportCategory,
        courtPrice: facility.courtPrice,
        image: facility.image
      }
    });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md transform transition duration-300 hover:shadow-xl hover:scale-105">
      <img src={facility.image} alt={facility.sportName} className="w-full h-40 object-cover rounded-lg mb-4" />
      <h3 className="text-xl font-bold text-gray-800 mb-2">{facility.sportName}</h3>
      <div className="flex items-center text-gray-600 mb-2">
        <FaMapMarkerAlt className="mr-2 text-sky-600" />
        <p className="text-lg">{`${getFacilityLabel(facility.sportCategory)}: ${facility.courtNumber}`}</p>
      </div>
      <div className="flex items-center text-gray-600 mb-4">
        
        <FaMoneyBill className="mr-2 text-green-500" />
        <p className="text-base">{`Hourly Booking Fee : Rs. ${facility.courtPrice}`}</p>
      </div>
      <button
        className="bg-teal-700 text-white w-full py-2 rounded-lg hover:bg-teal-800 transition duration-300"
        onClick={handleBookNow}
      >
        Book Now
      </button>
    </div>
  );
};

export default SportCard;

