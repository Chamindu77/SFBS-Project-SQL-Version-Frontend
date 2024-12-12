import axios from 'axios';
import { FETCH_AVAILABLE_FACILITIES_SUCCESS, FETCH_AVAILABLE_FACILITIES_FAIL } from './types';
import { toast } from 'react-toastify';

export const fetchAvailableFacilities = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/api/v1/facilities/available', {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });

    dispatch({
      type: FETCH_AVAILABLE_FACILITIES_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_AVAILABLE_FACILITIES_FAIL,
    });
    toast.error('Failed to load available facilities.');
  }
};
