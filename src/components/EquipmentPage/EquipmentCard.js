import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoneyBill, FaRunning } from 'react-icons/fa';

const EquipmentCard = ({ equipment }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/equipment-booking', {
      state: {
        image: equipment.image,
        equipmentName: equipment.equipmentName,
        sportName: equipment.sportName,
        rentPrice: equipment.rentPrice,
      },
    });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md transform transition duration-300 hover:shadow-xl hover:scale-105">
      <img src={equipment.image} alt={equipment.equipmentName} className="w-full h-40 object-cover rounded-lg mb-4" />
      <h3 className="text-xl font-bold text-gray-800 mb-2">{equipment.equipmentName}</h3>
      <div className="flex items-center text-gray-600 mb-2">
        <FaRunning className="mr-2 text-sky-600" />
        <p className="text-lg font-normal">{`Sport: ${equipment.sportName}`}</p>
      </div>
      <div className="flex items-center text-gray-600 mb-4">
      <FaMoneyBill className="mr-2 text-green-500" />
        <p className="text-base">{`Rent Per Day: Rs. ${equipment.rentPrice}/=`}</p>
      </div>
      <button
        onClick={handleBookNow}
        className="bg-teal-700 text-white w-full py-2 rounded-lg hover:bg-teal-800 transition duration-300"
      >
        Book Now
      </button>
    </div>
  );
};

export default EquipmentCard;
