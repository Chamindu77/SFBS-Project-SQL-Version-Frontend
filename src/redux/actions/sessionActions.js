import axios from 'axios';
import { SESSION_REQUEST_SUCCESS, SESSION_REQUEST_FAILURE} from './types';
import { toast } from 'react-toastify';

// Create Session Request Action
export const createSessionRequest = (sessionData) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    await axios.post('http://localhost:5000/api/v1/session/request', sessionData, config);

    dispatch({
      type: SESSION_REQUEST_SUCCESS,
      payload: sessionData,
    });

    toast.success('Session request submitted successfully!');
  } catch (err) {
    console.error(err);
    dispatch({
      type: SESSION_REQUEST_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    toast.error('Failed to submit session request. Please try again.');
  }
};


