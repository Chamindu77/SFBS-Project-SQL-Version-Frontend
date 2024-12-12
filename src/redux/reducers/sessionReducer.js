import { 
  SESSION_REQUEST_SUCCESS, 
  SESSION_REQUEST_FAILURE, 
  FETCH_SESSION_REQUESTS, 
  FETCH_SESSION_SUCCESS, 
  FETCH_SESSION_FAILURE, 
} from '../actions/types';

const initialState = {
  requests: [],            // For fetching session requests
  sessionRequest: null,     // For creating a session request
  loading: false,
  error: null,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetching session requests
    case FETCH_SESSION_REQUESTS:
      return { ...state, loading: true };
    case FETCH_SESSION_SUCCESS:
      return { ...state, loading: false, requests: action.payload };
    case FETCH_SESSION_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Creating a session request
    case SESSION_REQUEST_SUCCESS:
      return {
        ...state,
        sessionRequest: action.payload,
        error: null,
      };
    case SESSION_REQUEST_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default sessionReducer;



