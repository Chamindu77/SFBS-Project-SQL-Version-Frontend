import axios from 'axios';
import { toast } from 'react-toastify';
import {
  CREATE_FACILITY_BOOKING_SUCCESS,
  CREATE_FACILITY_BOOKING_FAIL,
  FETCH_AVAILABLE_SLOTS_SUCCESS,
  FETCH_AVAILABLE_SLOTS_FAIL
} from './types';


export const createFacilityBooking = (formData, navigate) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000/api/v1/facility-booking', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': localStorage.getItem('token'),  
      },
    });

    dispatch({
      type: CREATE_FACILITY_BOOKING_SUCCESS,
      payload: res.data,
    });

    toast.success('Booking created successfully.');

    setTimeout(() => {
      navigate('/sportcategory');
    }, 2000); 

  } catch (err) {
    dispatch({
      type: CREATE_FACILITY_BOOKING_FAIL,
    });
    toast.error('Failed to create booking. Please try again.');
  }
};



export const fetchAvailableSlots = (courtNumber, date, sportName) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000/api/v1/facility-booking/available-slots', {
      courtNumber,
      date,
      sportName
    }, {
      headers: {
        'x-auth-token': localStorage.getItem('token'),  
      },
    });

    dispatch({
      type: FETCH_AVAILABLE_SLOTS_SUCCESS,
      payload: res.data.availableSlots,
    });
  } catch (err) {
    dispatch({
      type: FETCH_AVAILABLE_SLOTS_FAIL,
    });
    toast.error('Failed to fetch available slots. Please try again.');
  }
};
