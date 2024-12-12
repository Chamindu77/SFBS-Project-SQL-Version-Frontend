import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import { toast } from 'react-toastify';


// Register User
export const register = (name, email, password, role) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password, role });

  try {
    const res = await axios.post('http://localhost:5000/api/v1/auth/register', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data, 
    });

    localStorage.setItem('token', res.data.token);

    // Trigger the success toast message
    //toast.success('Registration successful!');
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
    });

    if (err.response && err.response.data.msg === 'User already exists') {
      toast.error('Email already exists. Please use a different email.');
    } else {
      toast.error('Registration failed. Please try again.');
    }
  }
};


// // Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('http://localhost:5000/api/v1/auth/login', body, config);

    // Decode the JWT token to get user details
    const decoded = jwtDecode(res.data.token);

    // Dispatch login success action with token and user data
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { 
        token: res.data.token,
        user: decoded,
      },
    });

    // Store the token in localStorage
    localStorage.setItem('token', res.data.token);

    toast.success('Login successful!');

    setTimeout(() => {
      if (decoded.role === 'Admin') {
        window.location.href = '/user-managment'; // Redirect Admin to the user management page
      } else {
        window.location.href = '/'; // Redirect others to the homepage
      }
    }, 2000);
    console.log(decoded.role);
  } catch (err) {

    dispatch({
      type: LOGIN_FAIL,
    });

    // Check if there is a specific error message from the backend
    if (err.response && err.response.data.msg) {
      if (err.response.data.msg === 'User not found') {
        toast.error('User not found. Please check your email and try again.');
      } else if (err.response.data.msg === 'Invalid Password') {
        toast.error('Invalid Password. Please check your password and try again.');
      } else if (err.response.data.msg === 'Account is deactivated') {
        toast.error('Your account is deactivated. Please contact support.');
      // } else if (err.response.data.msg === 'Role mismatch') {
      //   toast.error('Role mismatch. Please check your role selection and try again.');
      } else {
        toast.error(err.response.data.msg);
      }
    } else {
      // Generic error message if no specific error message is returned
      toast.error('Login failed. Please check your credentials and try again.');
    }
  }
};


// Logout User
export const logout = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};


