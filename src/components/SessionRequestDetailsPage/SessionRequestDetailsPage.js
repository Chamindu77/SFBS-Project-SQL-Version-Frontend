import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Footer from '../Layout/Footer'
import { jwtDecode } from 'jwt-decode'
import BookingDetailsModal from './BookingDetailsModal'
import SessionTableRow from './SessionTableRow'
import LogoutNavbar from '../Layout/LogoutNavbar'

const SessionRequestDetailsPage = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // New state for filters
  const [statusFilter, setStatusFilter] = useState('All')
  const [bookingTypeFilter, setBookingTypeFilter] = useState('All')

  useEffect(() => {
    const fetchSessionRequests = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setError('No token found, please log in.')
          setLoading(false)
          return
        }

        const decodedToken = jwtDecode(token)
        const userId = decodedToken.id
        console.log(userId);
        const response = await axios.get(
          `https://fbs-backend-node-sql.vercel.app/api/v1/session/requests/${userId}`,
          {
            headers: { 'x-auth-token': token },
          }
        )

        // Sort the requests by 'createdAt' in descending order
        const sortedRequests = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )

        setRequests(sortedRequests)
        setLoading(false)
      } catch (err) {
        setError('Error fetching session details')
        setLoading(false)
      }
    }

    fetchSessionRequests()
  }, [])

  const handleBookNowClick = (booking) => {
    setSelectedBooking(booking)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedBooking(null)
  }

  // Filter requests based on both status and booking type
  const filteredRequests = requests.filter((request) => {
    const matchesStatus = statusFilter === 'All' || request.status === statusFilter
    const matchesBookingType = bookingTypeFilter === 'All' || request.sessionType === bookingTypeFilter
    return matchesStatus && matchesBookingType
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="flex flex-col min-h-screen">
      <LogoutNavbar />

      <div className="flex-grow p-6">
        <h2 className="text-2xl font-bold mb-2">My Session Bookings</h2>
        <p className="mb-6 text-gray-500">
          Manage and track all your upcoming session bookings.
        </p>

        {/* Filter Section */}
        <div className="flex space-x-4 mb-4">
          <div>
            <label htmlFor="statusFilter" className="font-semibold mr-2">
              Filter by Status:
            </label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1"
            >
              <option value="All">All</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Pending">Pending</option>
              <option value="Booked">Booked</option>
            </select>
          </div>

          {/* Booking Type Filter */}
          <div>
            <label htmlFor="bookingTypeFilter" className="font-semibold mr-2">
              Filter by Booking Type:
            </label>
            <select
              id="bookingTypeFilter"
              value={bookingTypeFilter}
              onChange={(e) => setBookingTypeFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1"
            >
              <option value="All">All</option>
              <option value="Individual Session">Individual Session</option>
              <option value="Group Session">Group Session</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-600">
                <th className="px-4 py-3">Coach Name</th>
                <th className="px-4 py-3">Sport Name</th>
                <th className="px-4 py-3">Booking Type</th>
                <th className="px-5 py-3">Date & Time</th>
                <th className="px-4 py-3">Session Fee</th>
                <th className="px-4 py-3">Court No.</th>
                <th className="px-7 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
                <th className="px-4 py-3">Ratings</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((booking, index) => (
                  <SessionTableRow
                    key={index}
                    booking={booking}
                    handleBookNowClick={handleBookNowClick}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <BookingDetailsModal booking={selectedBooking} onClose={handleCloseModal} />
      )}

      <Footer />
    </div>
  )
}

export default SessionRequestDetailsPage

