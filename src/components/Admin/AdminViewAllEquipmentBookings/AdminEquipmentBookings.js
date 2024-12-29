import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../../Layout/AdminNavbar';
import AdminFooter from '../../Layout/AdminFooter';
import { QRCodeCanvas } from 'qrcode.react'; // Import QRCodeCanvas

const AdminEquipmentBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [error, setError] = useState('');

    const [selectedSport, setSelectedSport] = useState(''); // Filter state for sport
    const [selectedEquipment, setSelectedEquipment] = useState(''); // Filter state for equipment

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem('token'); // Retrieve the token
            if (!token) {
                setError('No token found, please login again.');
                return;
            }

            try {
                const res = await axios.get('https://fbs-backend-node-sql.vercel.app/api/v1/equipment-booking', {
                    headers: { 'x-auth-token': token },
                });
                setBookings(res.data);
                setFilteredBookings(res.data); // Set all bookings initially
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching equipment bookings.');
            }
        };

        fetchBookings();
    }, []);

    // Filter function based on selected sport and equipment
    useEffect(() => {
        let filtered = bookings;

        if (selectedSport) {
            filtered = filtered.filter(booking => booking.sportName === selectedSport);
        }

        if (selectedEquipment) {
            filtered = filtered.filter(booking => booking.equipmentName === selectedEquipment);
        }

        setFilteredBookings(filtered);
    }, [selectedSport, selectedEquipment, bookings]); // Trigger filter when filters or data change

    // Get unique sports and equipment names for filtering
    const uniqueSports = [...new Set(bookings.map(booking => booking.sportName))];
    const uniqueEquipment = [...new Set(bookings.map(booking => booking.equipmentName))];

    return (
        <div>
            <AdminNavbar />
            <div className="pl-4 pr-4 pt-4 pb-10 md:pl-16 md:pr-10 max-w-full mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-teal-700">Equipment Bookings</h1>
                {error && <p className="text-red-600 mb-2">{error}</p>}

                {/* Filter Section */}
                <div className="mb-4 flex gap-4">
                    <select
                        className="border px-4 py-2 rounded-lg"
                        value={selectedSport}
                        onChange={(e) => setSelectedSport(e.target.value)}
                    >
                        <option value="">All Sports</option>
                        {uniqueSports.map((sport, index) => (
                            <option key={index} value={sport}>
                                {sport}
                            </option>
                        ))}
                    </select>

                    <select
                        className="border px-4 py-2 rounded-lg"
                        value={selectedEquipment}
                        onChange={(e) => setSelectedEquipment(e.target.value)}
                    >
                        <option value="">All Equipment</option>
                        {uniqueEquipment.map((equipment, index) => (
                            <option key={index} value={equipment}>
                                {equipment}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr className="text-center text-lg font-medium bg-teal-700 text-white">
                                <th className="border px-6 py-2">Name</th>
                                <th className="border px-6 py-2">Email</th>
                                <th className="border px-6 py-2">Phone</th>
                                <th className="border px-6 py-2">Sport</th>
                                <th className="border px-6 py-2">Equipment</th>
                                <th className="border px-6 py-2">Total</th>
                                <th className="border px-6 py-2">T.Price</th>
                                <th className="border px-6 py-2">Date</th>
                                <th className="border px-6 py-2">Receipt</th>
                                <th className="border px-6 py-2">QR Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map((booking, index) => (
                                <tr key={index} className="bg-white hover:bg-gray-50">
                                    <td className="border px-6 py-4 text-center text-base">{booking.userName}</td>
                                    <td className="border px-6 py-4 text-center text-base">{booking.userEmail}</td>
                                    <td className="border px-6 py-4 text-center text-base">{booking.userPhoneNumber}</td>
                                    <td className="border px-6 py-4 text-center text-base">{booking.sportName}</td>
                                    <td className="border px-6 py-4 text-center text-base">{booking.equipmentName}</td>
                                    <td className="border px-6 py-4 text-center text-base">{booking.quantity}</td>
                                    <td className="border px-6 py-4 text-center text-base">Rs. {booking.totalPrice}/=</td>
                                    <td className="border px-6 py-4 text-center text-base">
                                        {new Date(booking.dateTime).toLocaleDateString()}
                                    </td>
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
                                        <QRCodeCanvas
                                            value={`Booking Details: 
                                            Name: ${booking.userName}, 
                                            Email: ${booking.userEmail}, 
                                            Equipment: ${booking.equipmentName}, 
                                            Sport: ${booking.sportName}, 
                                            Quantity: ${booking.quantity}, 
                                            Total Price: Rs.${booking.totalPrice}`}
                                            size={96} // Adjust the QR code size
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

export default AdminEquipmentBookings;
