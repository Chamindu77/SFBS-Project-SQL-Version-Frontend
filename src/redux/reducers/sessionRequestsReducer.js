// // src/redux/reducers/sessionRequestsReducer.js
// import { FETCH_REQUESTS_SUCCESS, FETCH_REQUESTS_FAILURE, FETCH_REQUESTS_LOADING } from '../types';

// const initialState = {
//   loading: false,
//   requests: [],
//   error: null,
// };

// const sessionRequestsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_REQUESTS_LOADING:
//       return {
//         ...state,
//         loading: true,
//       };
//     case FETCH_REQUESTS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         requests: action.payload,
//       };
//     case FETCH_REQUESTS_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default sessionRequestsReducer;
