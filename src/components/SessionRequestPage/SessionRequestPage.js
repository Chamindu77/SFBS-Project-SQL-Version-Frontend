// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { jwtDecode } from 'jwt-decode';
// import LogoutNavbar from '../Layout/LogoutNavbar';
// import Footer from '../Layout/Footer';
// import { fetchCoachProfileById } from '../../redux/actions/coachActions';
// import { createSessionRequest } from '../../redux/actions/sessionActions';
// import SessionRequestForm from './SessionRequestForm';
// import CoachDetails from './CoachDetails';

// const SessionRequestPage = () => {
//   const { coachId } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
//   const [selectedSessionType, setSelectedSessionType] = useState('');
//   const [userPhone, setUserPhone] = useState('');
//   const [userData, setUserData] = useState({ name: '', email: '' });
//   const dispatch = useDispatch();

//   const coach = useSelector((state) =>
//     state.coaches.coaches.find((c) => c._id === coachId) || state.coaches.selectedCoach
//   );

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decoded = jwtDecode(token);
//       setUserData({
//         name: decoded.name || '',
//         email: decoded.email || '',
//       });
//     }
//     console.log(coach);
//     if (!coach) {
//       dispatch(fetchCoachProfileById(coachId)).then(() => {
//         setLoading(false);
//       });
//     } else {
//       setLoading(false);
//     }
//   }, [coachId, coach, dispatch]);

//   const handleTimeSlotChange = (event) => {
//     setSelectedTimeSlot(event.target.value);
//   };

//   const handleSessionTypeChange = (event) => {
//     setSelectedSessionType(event.target.value);
//   };

//   const handlePhoneChange = (event) => {
//     setUserPhone(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const sessionData = {
//       userName: userData.name,
//       userEmail: userData.email,
//       userPhone,
//       sportName: coach.coachingSport,
//       sessionType: selectedSessionType,
//       coachProfileId: coachId,
//       requestedTimeSlots: [
//         {
//           date: new Date(coach.availableTimeSlots.find((slot) => slot._id === selectedTimeSlot).date),
//           timeSlot: coach.availableTimeSlots.find((slot) => slot._id === selectedTimeSlot).timeSlot,
//         },
//       ],
//     };

//     dispatch(createSessionRequest(sessionData)).then(() => {
//       // Navigate to coach profile page after successful request
//       navigate(`/session-request-details`);
//     });
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!coach) {
//     return <div>Coach not found</div>;
//   }

//   return (
//     <div>
//       <LogoutNavbar />
//       <div className="flex justify-center p-6 bg-gray-100 min-h-96">
//         <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl flex flex-col md:flex-row">
//           {/* Left Column - Coach Details */}
//           <CoachDetails coach={coach} />

//           {/* Right Column - Session Request Form */}
//           <div className="ml-12 w-96 md:w-3/3">
//             <div className="mt-4">
//               <div className="mt-0 w-full">
//                 <h4 className="text-lg font-semibold">Available Time Slots:</h4>
//                 <div className="bg-gray-50 rounded-lg p-2">
//                   <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
//                     {coach.availableTimeSlots.map((slot) => (
//                       <li key={slot._id}>
//                         {new Date(slot.date).toLocaleDateString()} - {slot.timeSlot}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               <h4 className="text-lg font-semibold mb-2 mt-4">Request For Availability</h4>
//               <SessionRequestForm
//                 userData={userData}
//                 userPhone={userPhone}
//                 handlePhoneChange={handlePhoneChange}
//                 selectedSessionType={selectedSessionType}
//                 handleSessionTypeChange={handleSessionTypeChange}
//                 selectedTimeSlot={selectedTimeSlot}
//                 handleTimeSlotChange={handleTimeSlotChange}
//                 coach={coach}
//                 handleSubmit={handleSubmit}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default SessionRequestPage;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {jwtDecode} from 'jwt-decode';
import LogoutNavbar from '../Layout/LogoutNavbar';
import Footer from '../Layout/Footer';
import { fetchCoachProfileById } from '../../redux/actions/coachActions';
import { createSessionRequest } from '../../redux/actions/sessionActions';
import SessionRequestForm from './SessionRequestForm';
import CoachDetails from './CoachDetails';

const SessionRequestPage = () => {
  const { coachId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState({});
  const [selectedSessionType, setSelectedSessionType] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userData, setUserData] = useState({ name: '', email: '' });

  const dispatch = useDispatch();
  const coach = useSelector((state) => state.coaches.selectedCoach);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserData({
        name: decoded.name || '',
        email: decoded.email || '',
      });
    }

    setLoading(true);
    dispatch(fetchCoachProfileById(coachId)).finally(() => setLoading(false));
  }, [dispatch, coachId]);

  const handleTimeSlotChange = (event) => {
    const [date, timeSlot] = event.target.value.split('|');
    setSelectedTimeSlot({ date, timeSlot });
  };

  const handleSessionTypeChange = (event) => {
    setSelectedSessionType(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setUserPhone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!coach || !selectedTimeSlot.date || !selectedSessionType) {
      alert('Please select all required fields.');
      return;
    }

    const timeSlotDetails = coach.availableTimeSlots.find(
      (slot) =>
        slot.date === selectedTimeSlot.date &&
        slot.timeSlot === selectedTimeSlot.timeSlot
    );

    if (!timeSlotDetails) {
      alert('Invalid time slot selected.');
      return;
    }

    const sessionData = {
      userName: userData.name,
      userEmail: userData.email,
      userPhone,
      sportName: coach.coachingSport,
      sessionType: selectedSessionType,
      coachProfileId: coachId,
      requestedTimeSlots: [timeSlotDetails],
    };

    dispatch(createSessionRequest(sessionData))
      .then(() => {
        navigate('/session-request-details');
      })
      .catch((err) => console.error(err));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!coach) {
    return <div>Coach not found</div>;
  }

  return (
    <div>
      <LogoutNavbar />
      <div className="flex justify-center p-6 bg-gray-100 min-h-96">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl flex flex-col md:flex-row">
          <CoachDetails coach={coach} />
          <div className="ml-12 w-96 md:w-3/3">
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Request For Availability</h4>
              <SessionRequestForm
                userData={userData}
                userPhone={userPhone}
                handlePhoneChange={handlePhoneChange}
                selectedSessionType={selectedSessionType}
                handleSessionTypeChange={handleSessionTypeChange}
                selectedTimeSlot={selectedTimeSlot}
                handleTimeSlotChange={handleTimeSlotChange}
                coach={coach}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SessionRequestPage;
