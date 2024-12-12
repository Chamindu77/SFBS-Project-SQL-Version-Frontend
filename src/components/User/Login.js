// Login.js

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import loginImage from "../../assets/image-login.jpg";
import googleLogo from "../../assets/google-logo.png";
import Footer from "../Layout/Footer";
import DefNavbar from '../Layout/DefNavbar';

// Validation schema using Yup
const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'At least 6 characters').required('Password is required')
});

// Modal Component for Role Selection
const RoleSelectionModal = ({ isOpen, onClose, onSelectRole }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-4 shadow-lg">
        <h3 className="text-center font-bold mb-4">Select Your Role</h3>
        <button
          onClick={() => onSelectRole('User')}
          className="w-full mb-2 bg-teal-600 text-white rounded-md px-3 py-2 hover:bg-teal-700"
        >
          User
        </button>
        <button
          onClick={() => onSelectRole('Coach')}
          className="w-full bg-teal-600 text-white rounded-md px-3 py-2 hover:bg-teal-700"
        >
          Coach
        </button>
        <button
          onClick={onClose}
          className="mt-3 w-full bg-gray-300 text-gray-700 rounded-md px-3 py-2 hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const Login = ({ login }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // State to manage modal visibility and role
  const [isModalOpen, setModalOpen] = useState(false);
  const [role, setRole] = useState('User'); 

  const onSubmit = (data) => {
    login(data.email, data.password, role);  
  };

  const googleLogin = () => {
    setModalOpen(true);  
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setModalOpen(false);
    // Continue Google login with selected role
    window.open(`http://localhost:5000/api/v1/auth/google?role=${selectedRole}`, '_self');
  };

  return (
    <div>
      <DefNavbar />
      <ToastContainer />
      <RoleSelectionModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSelectRole={handleRoleSelect}
      />
      <div className="flex justify-center my-6 px-4">
        <div className="max-w-3xl w-full max-h-[80vh] overflow-auto p-0 bg-white rounded-xl shadow-lg border-2 border-teal-600">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img
                src={loginImage}
                alt="Login"
                className="object-cover rounded-tl-xl rounded-bl-xl w-full h-[200px] md:h-full"
              />
            </div>
            <div className="md:w-1/2 p-4 flex flex-col justify-center">
              <h2 className="text-xl font-bold mb-3 text-center">Login</h2>
              <p className="text-center mb-3 text-sm">Please login to continue</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 relative">
                  <label className="block text-sm mb-1 font-normal">Email Address</label>
                  <input
                    type="email"
                    {...register("email")}
                    className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-slate-200`}
                    placeholder="Email Address"
                  />
                  {errors.email && (
                    <p className="absolute text-red-500 text-xs mt-0">{errors.email.message}</p>
                  )}
                </div>
                <div className="mb-4 relative">
                  <label className="block text-sm mb-1 font-normal">Password</label>
                  <input
                    type="password"
                    {...register("password")}
                    className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-slate-200`}
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="absolute text-red-500 text-xs mt-0">{errors.password.message}</p>
                  )}
                </div>
                <button type="submit" className="w-full mb-2 bg-teal-600 text-white rounded-md px-3 py-2 hover:bg-teal-700 transition duration-200">
                  Login
                </button>
              </form>
              <button onClick={googleLogin} className="flex justify-center items-center w-full bg-white text-teal-600 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-100 transition duration-200">
                <img src={googleLogo} alt="Google Logo" className="mr-2 w-5 h-5" />
                Sign in with Google
              </button>
              <div>
                <p className="mt-3 text-center text-sm">
                  New User?{' '}
                  <Link to="/register" className="text-teal-600 hover:underline">
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default connect(null, { login })(Login);
