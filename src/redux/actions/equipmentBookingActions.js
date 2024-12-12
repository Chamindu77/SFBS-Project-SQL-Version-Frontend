import axios from 'axios';
import { toast } from 'react-toastify';
import { CREATE_EQUIPMENT_BOOKING_SUCCESS, CREATE_EQUIPMENT_BOOKING_FAIL } from './types';

// Create Equipment Booking
export const createEquipmentBooking = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    const res = await axios.post('http://localhost:5000/api/v1/equipment-booking/', formData, config);

    dispatch({
      type: CREATE_EQUIPMENT_BOOKING_SUCCESS,
      payload: res.data.equipmentBooking,
    });


    toast.success('Booking created successfully.');

    setTimeout(() => {
      navigate('/equipment');
    }, 2000); 

    
  } catch (err) {
    dispatch({
      type: CREATE_EQUIPMENT_BOOKING_FAIL,
      payload: err.response.data.msg,
    });
  }
};
