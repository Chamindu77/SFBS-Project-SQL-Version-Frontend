import axios from 'axios';
import { FETCH_AVAILABLE_EQUIPMENT_SUCCESS, FETCH_AVAILABLE_EQUIPMENT_FAIL } from './types';
import { toast } from 'react-toastify';

export const fetchAvailableEquipment = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/api/v1/equipment/available', {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    });


    dispatch({
      type: FETCH_AVAILABLE_EQUIPMENT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {

    dispatch({
      type: FETCH_AVAILABLE_EQUIPMENT_FAIL,
    });
    toast.error('Failed to load available equipment.');
  }
};
