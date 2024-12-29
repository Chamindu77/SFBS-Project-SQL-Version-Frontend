import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Modal = ({ isOpen, onClose, onConfirm, selectedRequest }) => {
    const [showPreviousCourtsModal, setShowPreviousCourtsModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [courtNo, setCourtNo] = useState(); 

    const handleNoClick = () => {
        setShowPreviousCourtsModal(true); 
    };
    console.log(selectedRequest);
    const handlePreviousCourtAccept = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.put(
                `https://fbs-backend-node-sql.vercel.app/api/v1/session/respond/${selectedRequest.sessionRequestId}`,
                {
                    status: 'Accepted',
                    courtNo: courtNo, 
                },
                {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                toast.success('Request accepted successfully!');
                setShowPreviousCourtsModal(false);
                onClose();
                window.location.reload();

            }
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
            console.error('Error accepting court:', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePreviousCourtCancel = () => {
        setShowPreviousCourtsModal(false);
        onClose(); 
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Main Modal */}
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                    <h3 className="text-lg font-semibold mb-4">Do you want to select a court?</h3>
                    <div className="flex justify-end space-x-4">
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                            onClick={handleNoClick}
                        >
                            No
                        </button>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                            onClick={onConfirm}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal for Selecting a Previously Booked Court */}
            {showPreviousCourtsModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h3 className="text-lg font-semibold mb-4">Select Your Previous Booked Court</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Select Court Number</label>
                            <select
                                id="previousCourt"
                                className="mt-1 block w-md py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none"
                                value={courtNo} 
                                onChange={(e) => setCourtNo(e.target.value)} 
                            >
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                            </select>
                        </div>

                        {error && <p className="text-red-500">{error}</p>}

                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                                onClick={handlePreviousCourtCancel}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-200"
                                onClick={handlePreviousCourtAccept} 
                                disabled={loading}
                            >
                                {loading ? 'Requesting...' : 'Request Accept'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
