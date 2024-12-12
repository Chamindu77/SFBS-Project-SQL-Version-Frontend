import {
    CREATE_FACILITY_BOOKING_SUCCESS,
    CREATE_FACILITY_BOOKING_FAIL,
    FETCH_AVAILABLE_SLOTS_SUCCESS,
    FETCH_AVAILABLE_SLOTS_FAIL
  } from '../actions/types';
  
  const initialState = {
    booking: null,
    availableSlots: [],
    error: null,
  };
  
  function facilityBookingReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_FACILITY_BOOKING_SUCCESS:
        return {
          ...state,
          booking: payload,
          error: null,
        };
      case CREATE_FACILITY_BOOKING_FAIL:
        return {
          ...state,
          booking: null,
          error: payload,
        };
      case FETCH_AVAILABLE_SLOTS_SUCCESS:
        return {
          ...state,
          availableSlots: payload,
          error: null,
        };
      case FETCH_AVAILABLE_SLOTS_FAIL:
        return {
          ...state,
          availableSlots: [],
          error: payload,
        };
      default:
        return state;
    }
  }
  
  export default facilityBookingReducer;
  