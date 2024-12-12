import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { register } from '../../redux/actions/authActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom'; 
import signUpImage from '../../assets/image-register3.jpg';
import Footer from '../Layout/Footer';
import DefNavbar from '../Layout/DefNavbar';

// Validation schema using Yup
const schema = yup.object().shape({
  firstName: yup.string().min(3, 'At least 3 characters').required('First Name is required'),
  lastName: yup.string().min(2, 'At least 2 characters').required('Last Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'At least 6 characters').required('Password is required'),
  role: yup.string().oneOf(['User', 'Coach'], 'Invalid role').required('Role is required'),
});

const Registration = ({ register }) => {
  const { register: formRegister, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    try {
      await register(`${data.firstName} ${data.lastName}`, data.email, data.password, data.role);

      // After registration, show success toast and delay navigation for 3 seconds to let the toast display
      toast.success('Registration successful!');

      setTimeout(() => {
        if (data.role === 'Coach') {
          // Navigate to coach registration details page for coaches
          navigate('/coach-register-details');
        } else {
          // Navigate to login page for regular users
          navigate('/login');
        }
      }, 3000); // 3 seconds delay to let the toast show
    } catch (err) {
      console.error('Error during registration:', err);
    }
  };

  return (
    <div>
      <DefNavbar />
      <ToastContainer />
      <div className="flex justify-center my-10 px-4">
        <div className="max-w-4xl w-full p-0 bg-white rounded-2xl shadow-lg border-2 border-teal-600">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6">
              <h2 className="text-2xl font-bold mb-5 text-center">Sign Up</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 relative">
                  <label className="block text-sm mb-1 font-normal">Role</label>
                  <select
                    name="role"
                    {...formRegister('role')}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-200 ${errors.role ? 'border-red-500' : ''}`}
                  >
                    <option value="" disabled selected hidden>Select Role</option>
                    <option value="User">User</option>
                    <option value="Coach">Coach</option>
                  </select>
                  {errors.role && <p className="absolute text-red-500 text-xs mt-0 ">{errors.role.message}</p>}
                </div>
                <div className="flex flex-col md:flex-row gap-4 mb-4 relative">
                  <div className="w-full relative">
                    <label className="block text-sm mb-1 font-normal">First Name</label>
                    <input
                      type="text"
                      {...formRegister('firstName')}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-200 ${errors.firstName ? 'border-red-500' : ''}`}
                      placeholder="First Name"
                    />
                    {errors.firstName && <p className="absolute text-red-500 text-xs mt-0 ">{errors.firstName.message}</p>}
                  </div>
                  <div className="w-full relative">
                    <label className="block text-sm mb-1 font-normal">Last Name</label>
                    <input
                      type="text"
                      {...formRegister('lastName')}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-200 ${errors.lastName ? 'border-red-500' : ''}`}
                      placeholder="Last Name"
                    />
                    {errors.lastName && <p className="absolute text-red-500 text-xs mt-0 ">{errors.lastName.message}</p>}
                  </div>
                </div>
                <div className="mb-4 relative">
                  <label className="block text-sm mb-1 font-normal">Email Address</label>
                  <input
                    type="email"
                    {...formRegister('email')}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-200 ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="Email Address"
                  />
                  {errors.email && <p className="absolute text-red-500 text-xs mt-0 ">{errors.email.message}</p>}
                </div>
                <div className="mb-4 relative">
                  <label className="block text-sm mb-1 font-normal">Password</label>
                  <input
                    type="password"
                    {...formRegister('password')}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-200 ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="Password"
                  />
                  {errors.password && <p className="absolute text-red-500 text-xs mt-0 ">{errors.password.message}</p>}
                </div>
                <button className="w-full bg-teal-600 text-white py-2 mt-2 rounded-md hover:bg-teal-700">
                  Sign Up
                </button>
                <p className="mt-4 text-center text-sm">
                  Already a user?{' '}
                  <Link to="/login" className="text-teal-600 hover:underline">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0">
              <img
                src={signUpImage}
                alt="Sign Up"
                className="object-cover rounded-tr-xl rounded-br-xl w-full h-48 md:h-full"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default connect(null, { register })(Registration);
