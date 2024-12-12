import { FETCH_COACH_PROFILES, FETCH_COACH_PROFILE_BY_ID } from '../actions/types';

const initialState = {
  coaches: [],
  selectedCoach: null,  
};

export default function coachReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COACH_PROFILES:
      return {
        ...state,
        coaches: action.payload,
      };
    case FETCH_COACH_PROFILE_BY_ID:  
      return {
        ...state,
        selectedCoach: action.payload,
      };
    default:
      return state;
  }
}

