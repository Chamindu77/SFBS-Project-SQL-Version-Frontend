import React, { useState } from 'react';
import { FaMoneyBill, FaRunning, FaInfoCircle } from 'react-icons/fa';
import EquipmentModal from './EquipmentModal';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EquipmentCard = ({ equipment, onDelete }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeactivateModalOpen, setDeactivateModalOpen] = useState(false);
  const [updatedEquipment, setUpdatedEquipment] = useState(equipment || {});
  const [deactivationReason, setDeactivationReason] = useState('');

  const handleEdit = () => {
    setModalOpen(true);
  };

  const handleSave = (updatedDetails) => {
    setUpdatedEquipment(updatedDetails); 
    setModalOpen(false); 
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this equipment?');
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`https://fbs-backend-node-sql.vercel.app/api/v1/equipment/${equipment.equipmentId}`, {
          headers: { 'x-auth-token': token }
        });
        toast.success('Equipment deleted successfully!');
        setTimeout(() => {
          onDelete(equipment._id);     
        }, 1000); 
        window.location.reload();
      } catch (err) {
        toast.error(`Error deleting equipment: ${err.message}`);
      }
    }
  };

  const handleToggleStatus = () => {
    if (updatedEquipment.isActive) {
      setDeactivateModalOpen(true); // Open deactivation reason modal
    } else {
      toggleStatus(); // Directly activate if already inactive
    }
  };

  const toggleStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `https://fbs-backend-node-sql.vercel.app/api/v1/equipment/toggle/${equipment.equipmentId}`,
        { deactivationReason },
        { headers: { 'x-auth-token': token } }
      );
      setUpdatedEquipment(response.data);
      setDeactivationReason(''); // Clear reason after toggle
      toast.success(updatedEquipment.isActive ? 'Equipment activated successfully!' : 'Equipment deactivated successfully!');
      setDeactivateModalOpen(false); // Close deactivation modal after success
    } catch (err) {
      toast.error(`Error toggling equipment status: ${err.message}`);
    }
  };

  const imageSrc = updatedEquipment?.image || '/path/to/default-image.jpg';

  return (
    <>
      <div className={`bg-white p-4 rounded-xl shadow-md transform transition duration-300 hover:shadow-xl hover:scale-105 ${updatedEquipment?.isActive ? '' : 'opacity-55'}`}>
        <img
          src={imageSrc}
          alt={updatedEquipment?.equipmentName || 'Equipment Image'}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />

        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-gray-800">{updatedEquipment?.equipmentName || 'Unknown Equipment'}</h3>
          <p className={`text-md font-bold ${updatedEquipment?.isActive ? 'text-teal-600' : 'text-red-600'}`}>
            {updatedEquipment?.isActive ? 'Active' : 'Inactive'}
          </p>
        </div>

        <div className="flex items-center text-gray-600 mb-2">
          <FaRunning className="mr-2 text-sky-600" />
          <p className="text-lg">Sport: {updatedEquipment?.sportName || 'N/A'}</p>
        </div>
        
        <div className="flex items-center justify-between text-gray-600 mb-4">
          <div className="flex items-center">
            <FaMoneyBill className="mr-2 text-green-500" />
            <p className="text-base">Rent Per Day: Rs. {updatedEquipment?.rentPrice || '0'}</p>
          </div>
          
          {updatedEquipment.deactivationReason && !updatedEquipment.isActive && (
            <div
              className="flex items-center text-red-500 cursor-pointer ml-4"
              onClick={() => toast.info(`Deactivation Reason: ${updatedEquipment.deactivationReason}`)}
            >
              <FaInfoCircle className="mr-1" />
              <p>View Reason</p>
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <button className="bg-teal-700 text-white flex-1 py-2 rounded-lg hover:bg-teal-800 transition duration-300" onClick={handleEdit}>
            Update
          </button>

          <button className={`${updatedEquipment?.isActive ? 'bg-slate-500' : 'bg-sky-800'} text-white flex-1 py-2 rounded-lg hover:${updatedEquipment?.isActive ? 'bg-gray-700' : 'bg-sky-900'} transition duration-300`} onClick={handleToggleStatus}>
            {updatedEquipment?.isActive ? 'Deactivate' : 'Activate'}
          </button>

          <button className="bg-red-500 text-white flex-1 py-2 rounded-lg hover:bg-red-700 transition duration-300" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <EquipmentModal 
        equipment={updatedEquipment}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      {isDeactivateModalOpen && (
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
                onClick={() => setDeactivateModalOpen(false)}
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

export default EquipmentCard;
