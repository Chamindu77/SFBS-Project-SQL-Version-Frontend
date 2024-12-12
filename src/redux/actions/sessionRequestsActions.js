// // src/redux/actions/sessionRequestsActions.js
// import axios from 'axios';
// import { FETCH_REQUESTS_SUCCESS, FETCH_REQUESTS_FAILURE, FETCH_REQUESTS_LOADING } from '../types';

// export const fetchSessionRequests = () => async (dispatch) => {
//   dispatch({ type: FETCH_REQUESTS_LOADING });

//   try {
//     const response = await axios.get('http://localhost:5000/api/v1/session/coach/requests', {
//       headers: {
//         // 'Content-Type': 'application/json',
//         'x-auth-token': localStorage.getItem('token'), // Assuming token is stored in localStorage
//       },
//     });

//     dispatch({
//       type: FETCH_REQUESTS_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: FETCH_REQUESTS_FAILURE,
//       payload: error.message,
//     });
//   }
// };
