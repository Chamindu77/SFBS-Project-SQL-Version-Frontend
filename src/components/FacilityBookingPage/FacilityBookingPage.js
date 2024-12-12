
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { createFacilityBooking, fetchAvailableSlots } from '../../redux/actions/facilityBookingActions';
import LogoutNavbar from '../Layout/LogoutNavbar';
import Footer from '../Layout/Footer';
import UserDetails from './UserDetails';
import BookingDetails from './BookingDetails';
import PaymentDetails from './PaymentDetails';
import CoachLogoutNavbar from '../Layout/CoachLogoutNavbar';
import Navbar from '../Layout/Navbar';
import CoachNavbar from '../Layout/CoachNavbar';
import DefNavbar from '../Layout/DefNavbar';

const FacilityBookingPage = ({ createFacilityBooking, fetchAvailableSlots, availableSlots }) => {

  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  let role = null;
  let userId = null;

  if (isLoggedIn && token) {
    try {
      const decodedToken = jwtDecode(token);
      role = decodedToken.role;
      userId = decodedToken.id;
    } catch (error) {
      console.error('Error decoding token', error);
    }
  }


  const location = useLocation();
  const navigate = useNavigate();
  const { courtNumber, sportName, sportCategory, courtPrice, image } = location.state || {};
  const [userDetails, setUserDetails] = useState({ name: '', email: '' });
  const [bookingDate, setBookingDate] = useState(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const { name, email } = decodedToken;
      setUserDetails({ name, email });
    } else {
      console.log('No token found');
    }
  }, []);

  useEffect(() => {
    if (courtNumber && bookingDate && sportName) {
      const formattedDate = bookingDate.toISOString().split("T")[0];
      fetchAvailableSlots(courtNumber, formattedDate, sportName);
    }
  }, [courtNumber, bookingDate, sportName, fetchAvailableSlots]);

  const handleTimeSlotChange = (slot) => {
    const updatedSlots = selectedTimeSlots.includes(slot)
      ? selectedTimeSlots.filter(s => s !== slot)
      : [...selectedTimeSlots, slot];
    setSelectedTimeSlots(updatedSlots);
    setTotalPayment(updatedSlots.length * courtPrice);
    formik.setFieldValue('selectedTimeSlots', updatedSlots);
  };

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      paymentReceipt: null,
      bookingDate: '',
      selectedTimeSlots: [],
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone number is required'),
      paymentReceipt: Yup.mixed()
        .required('Payment receipt is required')
        .test('fileSize', 'File too large', value => !value || (value && value.size <= 5 * 1024 * 1024))
        .test('fileType', 'Unsupported file type', value => !value || (value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type))),
      bookingDate: Yup.string()
        .required('Booking date is required')
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in the format YYYY-MM-DD'),
      selectedTimeSlots: Yup.array()
        .min(1, 'At least one time slot must be selected')
        .required('Time slot selection is required'),
    }),
    onSubmit: async (values, { setErrors }) => {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('userName', userDetails.name);
      formData.append('userEmail', userDetails.email);
      formData.append('userPhoneNumber', values.phoneNumber);
      formData.append('sportName', sportName);
      formData.append('courtNumber', courtNumber);
      formData.append('courtPrice', courtPrice);
      formData.append('date', bookingDate.toISOString());
      formData.append('timeSlots', JSON.stringify(selectedTimeSlots));
      formData.append('receipt', values.paymentReceipt);

      setIsSubmitting(true); 

      try {
        await createFacilityBooking(formData, navigate);
      } catch (err) {
        setIsSubmitting(false); 
        if (err.response && err.response.status === 400) {
          setErrors({ general: err.response.data.msg });
        } else {
          console.error('Error creating booking:', err);
        }
      }
    },
  });

  if (!courtNumber) {
    return <div>No facility selected.</div>;
  }

  return (
    <div>
      {/* Navbar based on role */}
      {role === 'User' && (isLoggedIn ? <LogoutNavbar /> : <Navbar />)}
      {role === 'Coach' && (isLoggedIn ? <CoachLogoutNavbar /> : <CoachNavbar />)}
      {!role && <DefNavbar />} {/* Default Navbar if no role is found */}
      
      <div className="min-h-min p-2 bg-gray-100 flex justify-center items-center">
        <div className="bg-white p-2 mb-2 rounded-lg shadow-lg w-1/2 items-center max-w-5xl flex">
          <div className="w-1/2 flex-shrink-0 pr-6">
            <img src={image} alt={sportName} className="w-full h-48 object-cover rounded-lg mt-2 mb-4" />
            <div className="text-center mb-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{sportName}</h2>
              <p className="text-base text-gray-900">{sportCategory} - Court No: {courtNumber}</p>
              <p className="text-sm text-gray-700">Rent Per Hour: Rs. {courtPrice}/=</p>
            </div>
            <BookingDetails
              bookingDate={bookingDate}
              setBookingDate={setBookingDate}
              handleTimeSlotChange={handleTimeSlotChange}
              selectedTimeSlots={selectedTimeSlots}
              availableSlots={availableSlots}
              formik={formik}
            />
          </div>
          <div className="w-1/2">
            <form onSubmit={formik.handleSubmit} className="space-y-8">
              <UserDetails userDetails={userDetails} formik={formik} />
              <PaymentDetails
                totalPayment={totalPayment}
                formik={formik}
              />
              {formik.errors.general && <div className="text-red-500 text-sm mt-2">{formik.errors.general}</div>}
              <div className="flex justify-items-start space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => navigate('/sportcategory')}
                  className="bg-gray-400 text-white py-2 px-4 ml-2 rounded-lg text-sm font-semibold hover:bg-gray-500 transition duration-300 focus:ring-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting} 
                  className={`py-2 px-4 rounded-lg text-sm font-semibold transition duration-300 ${
                    isSubmitting
                      ? 'bg-red-500 text-white cursor-not-allowed'
                      : 'bg-teal-700 hover:bg-teal-800 text-white'
                  }`}
                >
                  {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  availableSlots: state.facilityBooking.availableSlots,
});

export default connect(mapStateToProps, { createFacilityBooking, fetchAvailableSlots })(FacilityBookingPage);
