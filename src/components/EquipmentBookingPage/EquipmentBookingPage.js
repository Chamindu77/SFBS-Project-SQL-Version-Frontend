import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { createEquipmentBooking } from '../../redux/actions/equipmentBookingActions'; 
import LogoutNavbar from '../Layout/LogoutNavbar';
import Footer from '../Layout/Footer';
import { FaCalendarAlt } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import CoachLogoutNavbar from '../Layout/CoachLogoutNavbar';
import Navbar from '../Layout/Navbar';
import CoachNavbar from '../Layout/CoachNavbar';
import DefNavbar from '../Layout/DefNavbar';

const EquipmentBookingPage = ({ createEquipmentBooking }) => {
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  let role = null;
  if (isLoggedIn && token) {
    try {
      const decodedToken = jwtDecode(token);
      role = decodedToken.role;
    } catch (error) {
      console.error('Error decoding token', error);
    }
  }


  const location = useLocation();
  const navigate = useNavigate();
  const { image, sportName, equipmentName, rentPrice } = location.state || {};
  const [userDetails, setUserDetails] = useState({ name: '', email: '' });
  const [bookingDate, setBookingDate] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(rentPrice);
  const [loading, setLoading] = useState(false); // New state for tracking loading

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

  const CustomDateInput = ({ value, onClick }) => (
    <div className="flex items-center">
      <input
        type="text"
        value={value}
        onClick={onClick}
        readOnly
        className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white cursor-pointer"
        placeholder="Select a date"
      />
      <FaCalendarAlt onClick={onClick} className="ml-2 text-gray-500 cursor-pointer" />
    </div>
  );

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      paymentReceipt: null,
      bookingDate: '',
      quantity: 1,
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
      quantity: Yup.number()
        .min(1, 'Quantity must be at least 1')
        .required('Quantity is required'),
    }),

    onSubmit: async (values, { setErrors }) => {
      const formData = new FormData();
      
      const token = localStorage.getItem('token');
      let userId = null;
    
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          userId = decodedToken.id; 
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    
      formData.append('userId', userId); 
      formData.append('userName', userDetails.name);
      formData.append('userEmail', userDetails.email);
      formData.append('userPhoneNumber', values.phoneNumber);
      formData.append('sportName', sportName);
      formData.append('equipmentName', equipmentName);
      formData.append('equipmentPrice', rentPrice);
      formData.append('dateTime', bookingDate.toISOString());
      formData.append('quantity', values.quantity);
      formData.append('totalPrice', rentPrice * values.quantity);
      formData.append('receipt', values.paymentReceipt);
    
      setLoading(true); 
    
      try {
        await createEquipmentBooking(formData, navigate);
      } catch (err) {
        setLoading(false); 
        if (err.response && err.response.status === 400) {
          setErrors({ general: err.response.data.msg });
        } else {
          console.error('Error creating booking:', err);
        }
      }
    },
    
  });

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    setQuantity(value);
    setTotalPrice(value * rentPrice);
    formik.setFieldValue('quantity', value);
  };

  if (!equipmentName) {
    return <div>No equipment selected.</div>;
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
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{equipmentName}</h2>
              <p className="text-base text-gray-900">Sport: {sportName}</p>
              <p className="text-sm text-gray-700">Rent Per Day: Rs. {rentPrice}/=</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Booking Details</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Booking Date</label>
                  <DatePicker
                    selected={bookingDate}
                    onChange={(date) => {
                      setBookingDate(date);
                      formik.setFieldValue('bookingDate', date.toISOString().split("T")[0]);
                    }}
                    className="w-full p-2 border border-gray-50 rounded-lg text-sm"
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date().setDate(new Date().getDate() + 1)}
                    customInput={<CustomDateInput />}
                  />
                  {formik.touched.bookingDate && formik.errors.bookingDate ? (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.bookingDate}</div>
                  ) : null}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 p-2 border border-gray-300 rounded-lg text-sm"
                    min="1"
                  />
                  {formik.touched.quantity && formik.errors.quantity ? (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.quantity}</div>
                  ) : null}
                </div>
                <p className="text-gray-700 mt-2">Total Price: <span className="font-semibold text-red-700">Rs. {totalPrice}/=</span></p>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <form onSubmit={formik.handleSubmit} className="space-y-8">
              <div className="bg-gray-50 p-2 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-700 mb-2">User Details</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Name</label>
                    <input
                      type="text"
                      value={userDetails.name}
                      readOnly
                      className="w-60 p-2 border border-gray-300 rounded-lg bg-gray-100 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <input
                      type="email"
                      value={userDetails.email}
                      readOnly
                      className="w-60 p-2 border border-gray-300 rounded-lg bg-gray-100 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-60 p-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Enter your phone number"
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                      <div className="text-red-500 text-xs mt-1">{formik.errors.phoneNumber}</div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Payment Details</h3>
                <p className="text-sm">Account Number : 12345678</p>
                <p className="text-sm">Bank Name : Bank of Ceylon</p>
                <p className="text-sm">I-Pay Phone Number : 077-1234567</p>
                <div className="mt-4">
                  <label className="block text-sm font-bold text-gray-600 mb-1">Upload Payment Receipt</label>
                  <input
                    type="file"
                    name="paymentReceipt"
                    accept=".jpeg,.png,.pdf"
                    onChange={(event) => formik.setFieldValue('paymentReceipt', event.target.files[0])}
                    className="w-full text-sm"
                  />
                  {formik.touched.paymentReceipt && formik.errors.paymentReceipt ? (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.paymentReceipt}</div>
                  ) : null}
                </div>
              </div>
              {formik.errors.general && <div className="text-red-500 text-sm mt-2">{formik.errors.general}</div>}
              <div className="flex justify-items-start space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => navigate('/equipment')}
                  className="bg-gray-400 text-white py-2 px-4 ml-2 rounded-lg text-sm font-semibold hover:bg-gray-500 transition duration-300 focus:ring-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading} 
                  className={`py-2 px-4 rounded-lg text-sm font-semibold transition duration-300 ${
                    loading
                      ? 'bg-red-500 text-white cursor-not-allowed'
                      : 'bg-teal-700 hover:bg-teal-800 text-white'
                  }`}
                >
                  {loading ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapDispatchToProps = {
  createEquipmentBooking,
};

export default connect(null, mapDispatchToProps)(EquipmentBookingPage);

