import React, { useState } from 'react';
import { FaMapMarkerAlt, FaMoneyBill, FaInfoCircle } from 'react-icons/fa';
import FacilityModal from './FacilityModal';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SportCard = ({ facility, onDelete }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeactivationPopupOpen, setDeactivationPopupOpen] = useState(false);
  const [updatedFacility, setUpdatedFacility] = useState(facility);
  const [deactivationReason, setDeactivationReason] = useState('');

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
    setModalOpen(true);
  };

  const handleSave = (updatedDetails) => {
    setUpdatedFacility(updatedDetails);
    setModalOpen(false);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this facility?');
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/v1/facilities/${facility.facilityId}`, {
          headers: { 'x-auth-token': token },
        });
        toast.success('Facility deleted successfully!');
        setTimeout(() => {
          onDelete(facility._id);
        }, 3000);
        window.location.reload();
      } catch (err) {
        toast.error(`Error deleting facility: ${err.message}`);
      }
    } else {
      toast.info('Deletion canceled');
    }
  };

  const handleToggleStatus = () => {
    if (updatedFacility.isActive) {
      setDeactivationPopupOpen(true); // Open deactivation popup for active facilities
    } else {
      toggleStatus(); // Directly activate if already inactive
    }
  };

  const toggleStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/v1/facilities/toggle/${facility.facilityId}`,
        { deactivationReason },
        { headers: { 'x-auth-token': token } }
      );
      setUpdatedFacility(response.data);
      setDeactivationReason(''); // Clear reason after toggle
      toast.success(response.data.isActive ? 'Facility activated successfully!' : 'Facility deactivated successfully!');
    } catch (err) {
      toast.error(`Error toggling facility status: ${err.message}`);
    }
    setDeactivationPopupOpen(false); // Close modal after toggling
  };

  return (
    <>
      <div className={`bg-white p-4 rounded-xl shadow-md transform transition duration-300 hover:shadow-xl hover:scale-105 ${updatedFacility.isActive ? '' : 'opacity-50'}`}>
        <img
          src={updatedFacility.image}
          alt={updatedFacility.sportName}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-gray-800">{updatedFacility.sportName}</h3>
          <p className={`text-md mr-2 font-bold ${updatedFacility.isActive ? 'text-teal-600' : 'text-red-600'}`}>
            {updatedFacility.isActive ? 'Active' : 'Inactive'}
          </p>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <FaMapMarkerAlt className="mr-2 text-sky-600" />
          <p className="text-lg">{`${getFacilityLabel(updatedFacility.sportCategory)}: ${updatedFacility.courtNumber}`}</p>
        </div>
        <div className="flex items-center text-gray-600 mb-4 justify-between">
          <div className="flex items-center">
            <FaMoneyBill className="mr-2 text-green-500" />
            <p className="text-base">{`Hourly Booking Fee: Rs.${updatedFacility.courtPrice}`}</p>
          </div>
          {!updatedFacility.isActive && updatedFacility.deactivationReason && (
            <div
              className="flex items-center text-red-500 cursor-pointer"
              onClick={() => toast.info(`Deactivation Reason: ${updatedFacility.deactivationReason}`)}
            >
              <FaInfoCircle className="mr-1" />
              <p>View Reason</p>
            </div>
          )}
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-teal-700 text-white flex-1 py-2 rounded-lg hover:bg-teal-800 transition duration-300"
            onClick={handleBookNow}
          >
            Update
          </button>
          <button
            className={`${updatedFacility.isActive ? 'bg-slate-500' : 'bg-sky-800'} text-white flex-1 py-2 rounded-lg hover:${updatedFacility.isActive ? 'bg-gray-700' : 'bg-sky-900'} transition duration-300`}
            onClick={handleToggleStatus}
          >
            {updatedFacility.isActive ? 'Deactivate' : 'Activate'}
          </button>
          <button
            className="bg-red-500 text-white flex-1 py-2 rounded-lg hover:bg-red-700 transition duration-300"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
      <FacilityModal
        facility={updatedFacility}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
      {isDeactivationPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-2">Reason for Deactivation</h3>
            <textarea
              value={deactivationReason}
              onChange={(e) => setDeactivationReason(e.target.value)}
              placeholder="Enter reason for deactivation"
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="bg-teal-700 text-white py-1 px-4 rounded-lg hover:bg-teal-800 transition duration-300"
                onClick={toggleStatus}
              >
                Submit
              </button>
              <button
                className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                onClick={() => setDeactivationPopupOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SportCard;
