// src/redux/reducers/facilityReducer.js
import { FETCH_AVAILABLE_FACILITIES_SUCCESS, FETCH_AVAILABLE_FACILITIES_FAIL } from '../actions/types';

const initialState = {
  availableFacilities: [],
};

function facilityReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_AVAILABLE_FACILITIES_SUCCESS:
      return {
        ...state,
        availableFacilities: payload,
      };
    case FETCH_AVAILABLE_FACILITIES_FAIL:
      return {
        ...state,
        availableFacilities: [],
      };
    default:
      return state;
  }
}

export default facilityReducer;
