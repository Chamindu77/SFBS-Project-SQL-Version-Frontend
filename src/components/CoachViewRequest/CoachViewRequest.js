import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import getStatusColor from '../Shared/getStatusColor';
import Footer from '../Layout/Footer';
import Modal from './Modal';
import CourtSelectionModal from './CourtSelectionModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CoachLogoutNavbar from '../Layout/CoachLogoutNavbar';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

const TableComponent = () => {
    const [requests, setRequests] = useState([]);
    const [sessionFilter, setSessionFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [showCourtModal, setShowCourtModal] = useState(false);
    const [availableCourts, setAvailableCourts] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [userDetails, setUserDetails] = useState({ name: '', email: '', phone: '' });

    useEffect(() => {
        const fetchSessionRequests = async () => {
            try {
                const response = await axios.get('https://fbs-backend-node-sql.vercel.app/api/v1/session/coach/requests', {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                    },
                });
                setRequests(response.data);

                const token = localStorage.getItem('token');
                if (token) {
                    const decodedToken = jwtDecode(token);
                    setUserDetails((prevDetails) => ({
                        ...prevDetails,
                        name: decodedToken.name,
                        email: decodedToken.email,
                    }));
                }
            } catch (err) {
                console.error('Error fetching session requests:', err.message);
            }
        };

        fetchSessionRequests();
    }, []);

    const handleAcceptClick = (request) => {
        setSelectedRequest(request);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalConfirm = async () => {
        setShowModal(false);
        await fetchAvailableCourts(selectedRequest);
        setShowCourtModal(true);
    };

    const fetchAvailableCourts = async (request) => {
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

        try {
            const formattedTimeSlot = convertTimeSlotTo24HourFormat(request.requestedTimeSlots[0].timeSlot);

            const response = await axios.post('https://fbs-backend-node-sql.vercel.app/api/v1/facility-booking/available-facilities', {
                sportName: request.sportName,
                date: formatDate(request.requestedTimeSlots[0].date),
                timeSlot: formattedTimeSlot,
            }, {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                },
            });

            const availableFacilitiesData = response.data.availableFacilities.filter(facility => facility.isActive);
            setAvailableCourts(availableFacilitiesData);
        } catch (error) {
            console.error('Error fetching available courts:', error);
        }
    };

    const handleCourtSelect = (courtNumber, phone, receiptFile) => {
        toast.success('Court selected successfully!');
        setShowCourtModal(false);
    };

    const handleReject = async (request) => {
        try {
            const response = await axios.put(
                `https://fbs-backend-node-sql.vercel.app/api/v1/session/respond/${request.sessionRequestId}`,
                {
                    status: 'Rejected',
                },
                {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                toast.success('Request rejected successfully!');
                setRequests((prevRequests) =>
                    prevRequests.map((r) =>
                        r.sessionRequestId === request.sessionRequestId ? { ...r, status: 'Rejected' } : r
                    )
                );
            }
        } catch (error) {
            console.error('Error rejecting request:', error);
            toast.error('Failed to reject the request. Please try again.');
        }
    };

    // Filter out requests with "Booked" status and apply session and status filters
    const filteredRequests = requests
        .filter((request) => request.status !== 'Booked')
        .filter((request) => {
            const sessionMatch = sessionFilter === 'All' || request.sessionType === sessionFilter;
            const statusMatch = statusFilter === 'All' || request.status === statusFilter;
            return sessionMatch && statusMatch;
        })
        .sort((a, b) => new Date(b.requestedTimeSlots[0].date) - new Date(a.requestedTimeSlots[0].date)); // Sort by date (most recent first)

    return (
        <div className="flex flex-col min-h-screen">
            <CoachLogoutNavbar />
            <div className="p-4 flex-grow">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Requests</h2>
                    <p className="text-sm text-gray-500">Efficiently manage and respond to booking requests</p>
                </div>

                {/* Filters for Session and Status */}
                <div className="flex space-x-4 mb-4">
                    <div>
                        <label htmlFor="sessionFilter" className="block text-sm font-medium text-gray-700">
                            Filter by Session Type
                        </label>
                        <select
                            id="sessionFilter"
                            value={sessionFilter}
                            onChange={(e) => setSessionFilter(e.target.value)}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none"
                        >
                            <option value="All">All</option>
                            <option value="Group Session">Group Session</option>
                            <option value="Individual Session">Individual Session</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">
                            Filter by Status
                        </label>
                        <select
                            id="statusFilter"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none"
                        >
                            <option value="All">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 text-left">Player Name</th>
                                <th className="px-4 py-2 text-left">Date & Time</th>
                                <th className="px-4 py-2 text-left">Session</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Contact</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-16 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRequests.map((request) => (
                                <tr key={request._id} className="border-t hover:bg-gray-100 transition">
                                    <td className="px-4 py-2">{request.userName}</td>
                                    <td className="px-4 py-2">
                                        <div>{formatDate(request.requestedTimeSlots[0].date)}</div>
                                        <div className="text-sm text-gray-500">{request.requestedTimeSlots[0].timeSlot}</div>
                                    </td>
                                    <td className="px-4 py-2">{request.sessionType}</td>
                                    <td className="px-4 py-2">{request.userEmail}</td>
                                    <td className="px-4 py-2">{request.userPhone}</td>
                                    <td className={`px-4 py-2 ${getStatusColor(request.status)}`}>{request.status}</td>
                                    <td className="px-4 py-2">
                                        {request.status === 'Pending' ? (
                                            <div className="space-x-2">
                                                <button
                                                    onClick={() => handleAcceptClick(request)}
                                                    className="bg-teal-600 text-white px-4 py-1 rounded-lg mr-2 hover:bg-teal-700 transition-all duration-200"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleReject(request)}
                                                    className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition-all duration-200"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-x-2">
                                                <span className="px-4 py-1 text-gray-400 cursor-not-allowed">Accept</span>
                                                <span className="px-4 py-1 text-gray-400 cursor-not-allowed">Reject</span>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer */}
            <Footer />

            {/* Modal Component */}
            <Modal
                isOpen={showModal}
                selectedRequest={selectedRequest}
                onClose={handleModalClose}
                onConfirm={handleModalConfirm}
            />

            <CourtSelectionModal
                isOpen={showCourtModal}
                availableFacilities={availableCourts}
                userDetails={userDetails}
                selectedRequest={selectedRequest}
                onClose={() => setShowCourtModal(false)}
                onConfirm={handleCourtSelect}
            />
        </div>
    );
};

export default TableComponent;
