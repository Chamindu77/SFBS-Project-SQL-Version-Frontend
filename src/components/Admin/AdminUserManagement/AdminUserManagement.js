import React, { useEffect, useState, useCallback } from 'react';
import { FaPlay, FaPowerOff } from 'react-icons/fa';
import axios from 'axios';
import AdminFooter from '../../Layout/AdminFooter';
import AdminNavbar from '../../Layout/AdminNavbar';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [futureBookings, setFutureBookings] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [askDeactivate, setAskDeactivate] = useState(false);
  const [, setDeactivationMessage] = useState('');
  const [futureEquipmentBookings, setFutureEquipmentBookings] = useState([]);
  const [futureSessionBookings, setFutureSessionBookings] = useState([]);



  const token = localStorage.getItem('token');

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/user/all', {
        headers: { 'x-auth-token': token },
      });
      setRequests(res.data);
    } catch (err) {
      console.error('Error fetching users:', err.message);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const toggleStatus = async (userId) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/user/toggle/${userId}`,
        {},
        { headers: { 'x-auth-token': token } }
      );
      setRequests((prevRequests) =>
        prevRequests.map((user) =>
          user.userId === userId ? { ...user, isActive: res.data.isActive } : user
        )
      );
    } catch (err) {
      console.error('Error toggling user status:', err.message);
    }
  };



  const handleDeactivateClick = async (userId) => {
    try {
      // Fetch future bookings for all categories
      const facilityRes = await axios.get(`http://localhost:5000/api/v1/facility-booking/user/${userId}/future`, {
        headers: { 'x-auth-token': token },
      }).catch((error) => {
        if (error.response && error.response.status === 404) {
          // Handle 404 error when no future bookings are found (do not treat it as an error)
          return { data: [] }; // Return an empty array if no bookings found
        }
        throw error; // Rethrow other errors
      });

      const equipmentRes = await axios.get(`http://localhost:5000/api/v1/equipment-booking/user/${userId}/future`, {
        headers: { 'x-auth-token': token },
      }).catch((error) => {
        if (error.response && error.response.status === 404) {
          // Handle 404 error when no future bookings are found (do not treat it as an error)
          return { data: [] }; // Return an empty array if no bookings found
        }
        throw error; // Rethrow other errors
      });

      const sessionRes = await axios.get(`http://localhost:5000/api/v1/session/user/${userId}/future`, {
        headers: { 'x-auth-token': token },
      }).catch((error) => {
        if (error.response && error.response.status === 404) {
          // Handle 404 error when no future bookings are found (do not treat it as an error)
          return { data: [] }; // Return an empty array if no bookings found
        }
        throw error; // Rethrow other errors
      });

      // Check if any bookings exist in any of the categories
      const hasFutureBookings = facilityRes.data.length > 0 || equipmentRes.data.length > 0 || sessionRes.data.length > 0;

      if (hasFutureBookings) {
        // If there are future bookings, set the state to display them
        setFutureBookings(facilityRes.data);
        setFutureEquipmentBookings(equipmentRes.data);
        setFutureSessionBookings(sessionRes.data);
        setSelectedUserId(userId);
        setShowPopup(true);
      } else {
        // If no future bookings exist, deactivate the user directly
        await toggleStatus(userId);
        setDeactivationMessage('User has been deactivated successfully as there are no future bookings.');
      }
    } catch (err) {
      console.error('Error fetching future bookings:', err.message);
      setDeactivationMessage('An error occurred while checking for future bookings.');
    }
  };


  const cancelAllBookings = async () => {
    try {
      // Delete future facility bookings
      await axios.delete(`http://localhost:5000/api/v1/facility-booking/user/${selectedUserId}/future`, {
        headers: { 'x-auth-token': token },
      }).catch((error) => {
        if (error.response && error.response.status === 404) {
          // Handle 404 error when no future facility bookings are found (do not treat it as an error)
          console.log('No future facility bookings found for this user.');
          return; // Exit gracefully if no future bookings exist
        }
        throw error; // Rethrow other errors
      });

      // Delete future equipment bookings
      await axios.delete(`http://localhost:5000/api/v1/equipment-booking/user/${selectedUserId}/future`, {
        headers: { 'x-auth-token': token },
      }).catch((error) => {
        if (error.response && error.response.status === 404) {
          // Handle 404 error when no future equipment bookings are found (do not treat it as an error)
          console.log('No future equipment bookings found for this user.');
          return; // Exit gracefully if no future bookings exist
        }
        throw error; // Rethrow other errors
      });

      // Delete future session bookings
      await axios.delete(`http://localhost:5000/api/v1/session/user/${selectedUserId}/future`, {
        headers: { 'x-auth-token': token },
      }).catch((error) => {
        if (error.response && error.response.status === 404) {
          // Handle 404 error when no future session bookings are found (do not treat it as an error)
          console.log('No future session bookings found for this user.');
          return; // Exit gracefully if no future bookings exist
        }
        throw error; // Rethrow other errors
      });

      // Clear state after cancellations
      setFutureBookings([]);
      setFutureEquipmentBookings([]);
      setFutureSessionBookings([]);
      setAskDeactivate(true); // Proceed to deactivation step

    } catch (err) {
      console.error('Error canceling future bookings:', err.message);
    }
  };



  const filteredRequests = requests.filter((request) => {
    const status = request.isActive ? 'Active User' : 'Deactive User';
    const isStatusMatch = filter === 'All' || status === filter;
    const isSearchMatch = request.name.toLowerCase().includes(search.toLowerCase());
    const isUserRole = request.role === 'User';

    return isStatusMatch && isSearchMatch && isUserRole;
  });

  return (
    <div>
      <AdminNavbar />
      <div className="p-8 pt-4 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-teal-700">User Management</h1>
        {/* {deactivationMessage && (
          <p className="text-green-600 font-semibold mb-4">{deactivationMessage}</p>
        )} */}

        <div className="mb-4 flex space-x-4">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md w-1/6"
            placeholder="Search by Full Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="p-2 border border-gray-300 rounded-md"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active User">Active User</option>
            <option value="Deactive User">Deactive User</option>
          </select>
        </div>

        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full max-w-6xl mx-auto bg-white border border-gray-300 rounded-xl shadow-lg">
            <thead>
              <tr className="bg-teal-700 text-white">
                <th className="text-left py-3 px-4 font-semibold text-base w-1/6 pl-8">User Id</th>
                <th className="text-left py-3 px-4 font-semibold text-base w-1/5">Full Name</th>
                <th className="text-left py-3 px-4 font-semibold text-base w-1/4">Email Address</th>
                <th className="text-left py-3 px-4 font-semibold text-base w-1/6">Role</th>
                <th className="text-left py-3 px-6 font-semibold text-base w-1/6">Status</th>
                <th className="text-left py-3 px-12 font-semibold text-base w-1/6 pr-8">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request._id} className="border-t border-gray-200 hover:bg-gray-100 transition duration-300">
                  <td className="py-4 px-4 whitespace-nowrap pl-8">{request.userId}</td>
                  <td className="py-4 px-4">{request.name}</td>
                  <td className="py-4 px-4">{request.email}</td>
                  <td className="py-4 px-4">{request.role}</td>
                  <td className={`py-4 px-4 font-semibold ${request.isActive ? 'text-blue-700' : 'text-red-600'}`}>
                    {request.isActive ? 'Active User' : 'Deactive User'}
                  </td>
                  <td className="py-4 px-4 flex space-x-2 pr-8">
                    {request.isActive ? (
                      <button
                        className="flex justify-center items-center bg-sky-800 text-white text-xs px-4 py-2 rounded-2xl w-32 shadow-md hover:bg-sky-700"
                        onClick={() => handleDeactivateClick(request.userId)}
                      >
                        <FaPowerOff className="mr-2" /> DEACTIVATE
                      </button>
                    ) : (
                      <button
                        className="flex justify-center items-center bg-teal-600 text-white text-xs px-4 py-2 rounded-2xl w-32 shadow-md hover:bg-teal-500"
                        onClick={() => toggleStatus(request.userId)}
                      >
                        <FaPlay className="mr-2" /> ACTIVATE
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-xl shadow-lg w-[90%] max-w-6xl">
              <h2 className="text-2xl font-bold mb-6 text-teal-700">Future Bookings</h2>
              {/* Facility Bookings Table */}
              <div className="overflow-x-auto mb-6">
                <h3 className="text-lg font-semibold mb-2 text-teal-600">Facility Bookings</h3>

                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-teal-700 text-white">
                        <th className="border px-4 py-2 text-left">Sport Name</th>
                        <th className="border px-4 py-2 text-left">Court Number</th>
                        <th className="border px-4 py-2 text-left">Court Price</th>
                        <th className="border px-4 py-2 text-left">Date</th>
                        <th className="border px-4 py-2 text-left">Time Slots</th>
                        <th className="border px-4 py-2 text-left">User Phone Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {futureBookings.map((booking) => (
                        <tr key={booking.bookingId} className="hover:bg-gray-100">
                          <td className="border px-4 py-2">{booking.sportName}</td>
                          <td className="border px-4 py-2">{booking.courtNumber}</td>
                          <td className="border px-4 py-2">{booking.courtPrice}</td>
                          <td className="border px-4 py-2">{new Date(booking.date).toLocaleDateString()}</td>
                          <td className="border px-4 py-2">{booking.timeSlots.join(', ')}</td>
                          <td className="border px-4 py-2">{booking.userPhoneNumber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Equipment Bookings Table */}
              <div className="overflow-x-auto mb-6">
                <h3 className="text-lg font-semibold mb-2 text-teal-600">Equipment Bookings</h3>
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-teal-700 text-white">
                      <th className="border px-4 py-2 text-left">Sport Name</th>
                      <th className="border px-4 py-2 text-left">Equipment Name</th>
                      <th className="border px-4 py-2 text-left">Booking Date</th>
                      <th className="border px-4 py-2 text-left">Quantity</th>
                      <th className="border px-4 py-2 text-left">Price</th>
                      <th className="border px-4 py-2 text-left">Phone Number</th>

                    </tr>
                  </thead>
                  <tbody>
                    {futureEquipmentBookings.map((booking) => (
                      <tr key={booking.bookingId} className="hover:bg-gray-100">
                        <td className="border px-4 py-2">{booking.sportName}</td>
                        <td className="border px-4 py-2">{booking.equipmentName}</td>
                        <td className="border px-4 py-2">{new Date(booking.dateTime).toLocaleDateString()}</td>
                        <td className="border px-4 py-2">{booking.quantity}</td>
                        <td className="border px-4 py-2">{booking.equipmentPrice}</td>
                        <td className="border px-4 py-2">{booking.userPhoneNumber}</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Session Bookings Table */}
              <div className="overflow-x-auto">
              <h3 className="text-lg font-semibold mb-2 text-teal-600">Session Bookings</h3>
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-teal-700 text-white">
                      <th className="border px-4 py-2 text-left">Sport</th>
                      <th className="border px-4 py-2 text-left">Session Type</th>
                      <th className="border px-4 py-2 text-left">Court</th>
                      <th className="border px-4 py-2 text-left">Coach </th>
                      <th className="border px-4 py-2 text-left">Date</th>
                      <th className="border px-4 py-2 text-left">Time Slot</th>
                      <th className="border px-4 py-2 text-left"> Fee</th>
                      <th className="border px-4 py-2 text-left"> Phone Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {futureSessionBookings.map((booking) => (
                      <tr key={booking.sessionId} className="hover:bg-gray-100">
                        <td className="border px-4 py-2">{booking.sportName}</td>
                        <td className="border px-4 py-2">{booking.sessionType}</td>
                        <td className="border px-4 py-2">{booking.courtNo}</td>
                        <td className="border px-4 py-2">{booking.coachName}</td>
                        {/* Iterate over the bookedTimeSlots to display multiple time slots if any */}
                        {booking.bookedTimeSlots.map((slot, index) => (
                          <React.Fragment key={index}>
                            <td className="border px-4 py-2">{slot.date}</td>
                            <td className="border px-4 py-2">{slot.timeSlot}</td>
                          </React.Fragment>
                        ))}
                        <td className="border px-4 py-2">{booking.sessionFee}</td>
                        <td className="border px-4 py-2">{booking.userPhone}</td>


                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-6">
                {!askDeactivate ? (
                  <button
                    className="bg-red-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-500"
                    onClick={cancelAllBookings}
                  >
                    Delete All Future Bookings
                  </button>
                ) : (
                  <button
                    className="bg-teal-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-teal-500"
                    onClick={() => {
                      toggleStatus(selectedUserId);
                      setShowPopup(false);
                    }}
                  >
                    Deactivate
                  </button>
                )}
                <button
                  className="bg-gray-600 text-white px-6 py-3 ml-4 rounded-md shadow-md hover:bg-gray-500"
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}


      </div>
      <AdminFooter />
    </div>
  );
};

export default Requests;
