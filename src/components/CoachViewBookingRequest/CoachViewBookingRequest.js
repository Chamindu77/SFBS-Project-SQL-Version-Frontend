import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import getStatusColor from '../Shared/getStatusColor';
//import LogoutNavbar from '../Layout/LogoutNavbar';
import Footer from '../Layout/Footer';
import {jwtDecode} from 'jwt-decode';  
import CoachLogoutNavbar from '../Layout/CoachLogoutNavbar';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

const CoachViewBookingRequest = () => {
    const [requests, setRequests] = useState([]);
    const [sessionFilter, setSessionFilter] = useState('All');
    
    useEffect(() => {
        const fetchSessionRequests = async () => {
            try {
                const token = localStorage.getItem('token');
                let id = null;
                if (token) {
                    const decodedToken = jwtDecode(token);
                    id = decodedToken.id;
                }

                const response = await axios.get(`http://localhost:5000/api/v1/session/booking/coach/${id}`, {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                    },
                });
                setRequests(response.data);
            } catch (err) {
                console.error('Error fetching session requests:', err.message);
            }
        };

        fetchSessionRequests();
    }, []);

    const filteredRequests = requests.filter((request) => {
        const sessionMatch = sessionFilter === 'All' || request.sessionType === sessionFilter;
        //const statusMatch = statusFilter === 'All' || request.status === statusFilter;
        return sessionMatch ;
    });
console.log(requests)
    return (
        <div className="flex flex-col min-h-screen">
            <CoachLogoutNavbar />
            <div className="p-4 flex-grow">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Booked Sessions</h2>
                    <p className="text-sm text-gray-500">View and manage all your booked sessions here...</p>
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
                                <th className="px-4 py-2 text-left">Court</th>
                                <th className="px-4 py-2 text-left">Session Fee</th>
                                <th className="px-4 py-2 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRequests.map((request) => (
                                <tr key={request._id} className="border-t hover:bg-gray-100 transition">
                                    <td className="px-4 py-2">{request.userName}</td>
                                    <td className="px-4 py-2">
                                        {/* Safely access bookedTimeSlots */}
                                        {request.bookedTimeSlots && request.bookedTimeSlots.length > 0 ? (
                                            <>
                                                <div>{formatDate(request.bookedTimeSlots[0].date)}</div>
                                                <div className="text-sm text-gray-500">{request.bookedTimeSlots[0].timeSlot}</div>
                                            </>
                                        ) : (
                                            <div>N/A</div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">{request.sessionType}</td>
                                    <td className="px-4 py-2">{request.userEmail}</td>
                                    <td className="px-4 py-2">{request.userPhone}</td>
                                    <td className="px-4 py-2">Court {request.courtNo || 'Not Booked'}</td> {/* Updated to safely access courtNo */}
                                    <td className="px-4 py-2">Rs. {request.sessionFee} /=</td>
                                    <td className= "px-4 py-2 font-semibold text-red-600"> Booked </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default CoachViewBookingRequest;
