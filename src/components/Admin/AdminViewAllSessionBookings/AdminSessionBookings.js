import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../../Layout/AdminNavbar';
import AdminFooter from '../../Layout/AdminFooter';


const AdminSessionBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found, please login again.');
                return;
            }

            try {
                const res = await axios.get('http://localhost:5000/api/v1/session/bookings', {
                    headers: { 'x-auth-token': token },
                });
                setBookings(res.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching session bookings.');
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <AdminNavbar />
            <div className="flex-grow pl-4 pr-4 pt-4 pb-10 md:pl-16 md:pr-10 max-w-full mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-teal-700">Session Bookings</h1>
                {error && <p className="text-red-600 mb-2">{error}</p>}

                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr className="text-center text-lg font-medium bg-teal-700 text-white">
                                <th className="border px-6 py-2">User Name</th>
                                <th className="border px-6 py-2">Sport</th>
                                <th className="border px-6 py-2">Session Type</th>
                                <th className="border px-6 py-2">Booked Date & Time</th>
                                <th className="border px-6 py-2">Coach</th>
                                <th className="border px-6 py-2">Session Fee</th>
                                <th className="border px-6 py-2">Court No</th>
                                <th className="border px-6 py-2">Receipt</th>
                                <th className="border px-6 py-2">QR Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, index) => (
                                <tr key={index} className="bg-white hover:bg-gray-50">
                                    <td className="border px-6 py-4 text-center text-base">{booking.userName}</td>
                                    <td className="border px-6 py-4 text-center text-base">{booking.sportName}</td>
                                    <td className="border px-6 py-4 text-center text-base">{booking.sessionType}</td>
                                    <td className="border px-6 py-4 text-center text-base">
                                        {booking.bookedTimeSlots.map((slot, i) => (
                                            <div key={i}>
                                                <span>{slot.date} - {slot.timeSlot}</span>
                                            </div>
                                        ))}
                                    </td>
                                    <td className="border px-6 py-4 text-center text-base">{booking.coachName}</td>
                                    <td className="border px-6 py-4 text-center text-base">Rs. {booking.sessionFee}/=</td>
                                    <td className="border px-6 py-4 text-center text-base">{booking.courtNo}</td>
                                    <td className="border px-6 py-4 text-center text-base">
                                        <a
                                            href={booking.receipt}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            View
                                        </a>
                                    </td>
                                    <td className="border px-6 py-4 text-center text-base">
                                        <img
                                            src={booking.qrCodeUrl}
                                            alt="QR Code"
                                            className="w-24 h-24 mx-auto"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <AdminFooter />
        </div>
    );
};


export default AdminSessionBookings;
