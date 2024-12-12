import React, { useState } from 'react'
import { renderRatingStars } from '../Shared/renderStars'
import getStatusColor from '../Shared/getStatusColor'
import { FaRegCommentDots } from 'react-icons/fa' 

const SessionTableRow = ({ booking, handleBookNowClick }) => {
  const [showMessagePopup, setShowMessagePopup] = useState(false)

  const handleToggleMessagePopup = () => {
    setShowMessagePopup(!showMessagePopup)
  }
  return (
    <tr className="border-t hover:bg-gray-50 text-sm text-gray-700 transition-all duration-200 relative">
      <td className="flex items-center px-4 py-3">
        <img
          src={booking.coachImage || 'https://via.placeholder.com/40'}
          alt={booking.coachName}
          className="w-10 h-10 rounded-full mr-4 object-cover"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = 'https://via.placeholder.com/40'
          }}
        />
        <div>
          <p className="font-medium">{booking.coachName}</p>
          <p className="text-teal-700 text-xs">{booking.coachLevel}</p>
        </div>
      </td>
      <td className="px-4 py-3">{booking.sportName}</td>
      <td className="px-4 py-3">{booking.sessionType}</td>
      <td className="px-4 py-3">
        {booking.requestedTimeSlots.map((slot) => (
          <div key={slot._id}>
            {new Date(slot.date).toLocaleDateString()} - {slot.timeSlot}
          </div>
        ))}
        <p className="text-gray-400 text-xs">
          Booked on: {new Date(booking.createdAt).toLocaleDateString()}
        </p>
      </td>
      <td className="px-4 py-3">Rs. {booking.sessionFee} /=</td>
      <td className="px-4 py-3">Court : {booking.courtNo || 'N/A'} </td>
      <td className="px-4 py-3 relative">
        <span className={`inline-block px-3 py-1 text-sm font-semibold ${getStatusColor(booking.status)}`}>
          {booking.status}
        </span>

        {/* Conditionally render message icon for 'Rejected' status */}
        {booking.status === 'Rejected' && (
          <div className="inline-block ml-2 relative">
            <FaRegCommentDots
              className="text-gray-500 cursor-pointer hover:text-gray-700 transition-transform transform hover:scale-110"
              onClick={handleToggleMessagePopup}
              size={18} 
            />
            {/* Enhanced Popup Message */}
            {showMessagePopup && (
              <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-lg p-4 text-sm text-gray-700 z-10 animate-fade-in">
                <p className="mb-2">We’re sorry, but the coach had to cancel your booking for an important reason. We apologize for any inconvenience this might cause.</p>
                <button
                  className="text-blue-500 hover:text-blue-700 transition-colors duration-200 mt-2"
                  onClick={handleToggleMessagePopup}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        )}
      </td>
      <td className="px-2 py-3">
        <div className="space-x-2">
          {booking.status === 'Accepted' ? (
            <button
              onClick={() => handleBookNowClick(booking)}
              className="no-underline px-2 py-2 text-sm font-semibold text-blue-500 hover:text-blue-700 transition-all duration-200"
            >
              Book Now
            </button>
          ) : (
            <span className="px-2 py-2 text-sm font-semibold text-gray-400 cursor-not-allowed">
              Book Now
            </span>
          )}
        </div>
      </td>
      <td className="px-4 py-3">{renderRatingStars(booking.avgRating)}</td>
    </tr>
  )
}

export default SessionTableRow

