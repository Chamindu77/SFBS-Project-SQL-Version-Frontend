// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import Navbar from '../Layout/Navbar';
// import Footer from '../Layout/Footer';
// import { renderRatingStars } from '../Shared/renderStars'; // Import the renderRatingStars function

// const SessionBookingPage = () => {
//   const location = useLocation();
//   const { booking } = location.state || {};

//   if (!booking) {
//     return <p>No booking details available.</p>;
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <div className="flex-grow p-6">
//         <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-12">
//           <h2 className="text-3xl font-bold mb-4">Booking Details</h2>
          
//           <div className="flex items-center mb-4">
//             <img
//               src={booking.coachImage || 'https://via.placeholder.com/150'} 
//               alt={booking.coachName}
//               className="w-20 h-20 rounded-full mr-4 object-cover"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = 'https://via.placeholder.com/150';
//               }}
//             />
//             <div>
//               <h3 className="text-xl font-semibold">{booking.coachName}</h3>
//               <p className="text-gray-600">{booking.coachLevel}</p>
//               <p className="text-gray-600">{booking.coachingSport}</p>
//             </div>
//           </div>

//           <p className="text-lg font-medium mb-2">Session Type: {booking.sessionType}</p>
//           <p className="text-lg font-medium mb-2">Session Fee: Rs. {booking.sessionPrice}</p>
//           <div className="mb-4">
//             <h4 className="text-lg font-semibold">Date & Time</h4>
//             {booking.requestedTimeSlots.map(slot => (
//               <div key={slot._id} className="text-gray-700">
//                 {new Date(slot.date).toLocaleDateString()} - {slot.timeSlot}
//               </div>
//             ))}
//           </div>

//           <div className="mb-4">
//             <h4 className="text-lg font-semibold">Ratings</h4>
//             {renderRatingStars(booking.avgRating)} {/* Display the star rating */}
//           </div>

//           <button
//             className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-200"
//             onClick={() => alert('Proceed to Payment')} 
//           >
//             Proceed to Payment
//           </button>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default SessionBookingPage;
