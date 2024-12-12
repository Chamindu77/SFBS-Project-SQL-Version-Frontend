// src/redux/reducers/equipmentBookingReducer.js
import {
    CREATE_EQUIPMENT_BOOKING_SUCCESS,
    CREATE_EQUIPMENT_BOOKING_FAIL,
  } from '../actions/types';
  
  const initialState = {
    booking: null,
    error: null,
  };
  
  const equipmentBookingReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_EQUIPMENT_BOOKING_SUCCESS:
        return {
          ...state,
          booking: payload,
          error: null,
        };
      case CREATE_EQUIPMENT_BOOKING_FAIL:
        return {
          ...state,
          error: payload,
        };
      default:
        return state;
    }
  };
  
  export default equipmentBookingReducer;
  