import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; 
import { composeWithDevTools } from '@redux-devtools/extension'; 

import userReducer from './reducers/userReducer';
import facilityReducer from './reducers/facilityReducer';
import facilityBookingReducer from './reducers/facilityBookingReducer';
import equipmentReducer from './reducers/equipmentReducer';
import equipmentBookingReducer from './reducers/equipmentBookingReducer'; 
import coachReducer from './reducers/coachReducer'; 
import sessionReducer from './reducers/sessionReducer';
// import sessionRequestsReducer from './reducers/sessionRequestsReducer';



const rootReducer = combineReducers({
  user: userReducer,
  facility: facilityReducer, 
  facilityBooking: facilityBookingReducer, 
  equipment: equipmentReducer, 
  equipmentBooking: equipmentBookingReducer, 
  coaches: coachReducer,
  session: sessionReducer,
  // sessionRequests: sessionRequestsReducer,
});

const initialState = {}; 

const middleware = [thunk]; 

const store = createStore(
  rootReducer,
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware)) 
);

export default store;

