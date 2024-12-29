import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';


const CourtSelectionModal = ({ isOpen, availableFacilities, userDetails, selectedRequest, onClose }) => {
    const [phone, setPhone] = useState(userDetails.phone || '');
    const [receiptFile, setReceiptFile] = useState(null);
    const [selectedCourt, setSelectedCourt] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);

    if (!isOpen) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const convertTo24HourFormat = (time) => {
        const [timePart, modifier] = time.split(' ');
        let [hours, minutes] = timePart.split(':');

        if (modifier === 'PM' && hours !== '12') {
            hours = parseInt(hours, 10) + 12;
        } else if (modifier === 'AM' && hours === '12') {
            hours = '00';
        }

        return `${hours}:${minutes}`;
    };

    const convertTimeSlotTo24HourFormat = (timeSlot) => {
        const [startTime, endTime] = timeSlot.split(' - ');
        return `${convertTo24HourFormat(startTime)} - ${convertTo24HourFormat(endTime)}`;
    };

    const handleCourtSelect = (court) => {
        setSelectedCourt(court);
        setIsDropdownOpen(false);
    };

    const handleReceiptUpload = (event) => {
        setReceiptFile(event.target.files[0]);
    };

    const handleConfirmBooking = async () => {
        if (!selectedCourt || !phone || !receiptFile) {
            alert('Please select a court, provide a phone number, and upload a receipt.');
            return;
        }

        // Decode the token to get the userId
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Authentication token is missing!');
            return;
        }

        let userId;
        try {
            const decodedToken = jwtDecode(token);
            userId = decodedToken.id; 
        } catch (error) {
            console.error('Error decoding token:', error);
            toast.error('Invalid token. Please log in again.');
            return;
        }

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('userName', userDetails.name);
        formData.append('userEmail', userDetails.email);
        formData.append('userPhoneNumber', phone);
        formData.append('sportName', selectedRequest.sportName);
        formData.append('courtNumber', selectedCourt.courtNumber);
        formData.append('courtPrice', selectedCourt.courtPrice);
        formData.append('date', formatDate(selectedRequest.requestedTimeSlots[0].date));

        const formattedTimeSlot = convertTimeSlotTo24HourFormat(selectedRequest.requestedTimeSlots[0].timeSlot);
        formData.append('timeSlots', JSON.stringify([formattedTimeSlot]));

        formData.append('receipt', receiptFile);
        //console.log("formData", formData)

        try {
            const response = await axios.post('https://fbs-backend-node-sql.vercel.app/api/v1/facility-booking/', formData, {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                toast.success('Booking confirmed successfully!');
                setBookingConfirmed(true);
            }
        } catch (error) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
            } else {
                console.error('Error confirming the booking:', error);
            }
            toast.error('Failed to confirm booking.');
        }
    };

    const handleAcceptRequest = async () => {
        if (!selectedCourt) {
            toast.error('Please select a court before accepting the request.');
            return;
        }
        console.log('selectedRequest', selectedRequest)
        console.log('selectedCourt', selectedCourt)
        try {
            const response = await axios.put(
                `https://fbs-backend-node-sql.vercel.app/api/v1/session/respond/${selectedRequest.sessionRequestId}`,
                {
                    status: 'Accepted',
                    courtNo: selectedCourt.courtNumber,
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
                setSelectedCourt(null);
                setPhone('');
                setReceiptFile(null);
                setBookingConfirmed(false);
                onClose();
                window.location.reload();
            }
        } catch (error) {
            console.error('Error accepting the request:', error);
            toast.error('Failed to accept the request.');
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center transition-opacity duration-300 ease-in-out">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-3/4 max-w-md">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Book Your Court</h3>

                <div className="mb-4">
                    <p><strong>Name:</strong> {userDetails.name}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <div className="mt-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            id="phone"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mt-1 block w-xl py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none"
                            placeholder="Enter your phone number"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <p><strong>Booking Date:</strong> {formatDate(selectedRequest.requestedTimeSlots[0].date)}</p>
                    <p><strong>Time Slot:</strong> {selectedRequest.requestedTimeSlots[0].timeSlot}</p>
                </div>

                <div className="mb-4 relative">
                    <label htmlFor="courtSelect" className="block text-sm font-medium text-gray-700">Select Available Court</label>
                    <div
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none cursor-pointer"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        {selectedCourt ? (
                            <div className="flex items-center space-x-4">
                                <img
                                    src={selectedCourt.image}
                                    alt={`Court ${selectedCourt.courtNumber}`}
                                    className="w-10 h-10 rounded"
                                />
                                <span>{`Court ${selectedCourt.courtNumber} - Per Hour Rs. ${selectedCourt.courtPrice} /=`}</span>
                            </div>
                        ) : (
                            'Select a court'
                        )}
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                            {availableFacilities.length > 0 ? (
                                availableFacilities.map((court) => (
                                    <div
                                        key={court._id}
                                        className={`flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer ${court.isActive ? '' : 'text-gray-400 cursor-not-allowed'
                                            }`}
                                        onClick={() => handleCourtSelect(court)}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={court.image}
                                                alt={`Court ${court.courtNumber}`}
                                                className="w-10 h-10 rounded"
                                            />
                                            <span>Court {court.courtNumber} - Per Hour Rs. {court.courtPrice}/=</span>
                                        </div>
                                        {selectedCourt?.courtNumber === court.courtNumber && (
                                            <FaCheck className="text-green-500" />
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-2 text-gray-500">
                                    No courts available for the selected time slot.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="receipt" className="block text-sm font-medium text-gray-700">Upload Receipt</label>
                    <input
                        id="receipt"
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleReceiptUpload}
                        className="mt-1 "
                    />
                </div>

                <div className="flex justify-center mt-6">
                    {!bookingConfirmed ? (
                        <button
                            className={`bg-teal-600 text-white px-6 py-3 rounded-2xl mr-2 font-bold hover:bg-teal-700 transition duration-200 ${!selectedCourt || !phone || !receiptFile ? 'cursor-not-allowed opacity-50' : ''}`}
                            onClick={handleConfirmBooking}
                            disabled={!selectedCourt || !phone || !receiptFile}
                        >
                            Confirm Booking
                        </button>
                    ) : (
                        <button
                            className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition duration-200"
                            onClick={handleAcceptRequest}
                        >
                            Request Accept
                        </button>
                    )}
                    <button
                        className="bg-red-500 text-white px-6 py-3 rounded-2xl ml-2 hover:bg-red-600 transition duration-200"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourtSelectionModal;
