import axios from 'axios';
import { FETCH_COACH_PROFILES, FETCH_COACH_PROFILE_BY_ID } from './types';

export const fetchCoachProfiles = () => async (dispatch, getState) => {
  try {
    const token = getState().auth.token; 
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    const res = await axios.get('http://localhost:5000/api/v1/coach-profile/all', config);

    dispatch({
      type: FETCH_COACH_PROFILES,
      payload: res.data, 
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchCoachProfileById = (id) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    const res = await axios.get(`http://localhost:5000/api/v1/coach-profile/${id}`, config);

    dispatch({
      type: FETCH_COACH_PROFILE_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};


