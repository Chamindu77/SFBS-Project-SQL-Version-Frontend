
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import facilityReducer from './facilityReducer';
import equipmentReducer from './equipmentReducer';  
import userReducer from './userReducer';
import facilityBookingReducer from './facilityBookingReducer';
import equipmentBookingReducer from './equipmentBookingReducer';
import coachReducer from './coachReducer';
import reviewReducer from './reviewReducer';
// import sessionRequestsReducer from './reducers/sessionRequestsReducer';





export default combineReducers({
  auth: authReducer,
  facility: facilityReducer,
  equipment: equipmentReducer,
  user: userReducer,
  facilityBooking: facilityBookingReducer,
  equipmentBooking: equipmentBookingReducer,
  coaches: coachReducer,
  reviews: reviewReducer,
  // sessionRequests: sessionRequestsReducer

});

