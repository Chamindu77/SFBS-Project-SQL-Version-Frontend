import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const GoogleAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get('token');
      console.log('Token:', token);

      if (token) {
        localStorage.setItem('token', token);

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        const role = decodedToken.role;
        console.log('Decoded token role:', role);

        if (role === 'User') {
          navigate('/');
        }
        else {
          try {
            const response = await axios.get(`http://localhost:5000/api/v1/coach-profile/coach/${userId}`, {
              headers: { 'x-auth-token': token },
            });

            if (response.status === 200) {
              navigate('/');
            } else if (response.status === 404) {
              navigate('/coach-register-details');
            } else {
              console.error('Unexpected response status:', response.status);
              navigate('/login');
            }
          } catch (error) {
            if (error.response && error.response.status === 404) {
              navigate('/coach-register-details');
            } else {
              console.error('Failed to fetch coach profile:', error);
              navigate('/login');
            }
          }

        }

      } else {
        console.error('No token found in the URL');
        navigate('/login');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [navigate]);

  return <div>Redirecting...</div>;
};

export default GoogleAuthRedirect;
