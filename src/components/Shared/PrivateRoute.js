// // src/components/PrivateRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { connect } from 'react-redux';

// const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => (
//   <Route
//     {...rest}
//     element={
//       !isAuthenticated && !loading ? (
//         <Navigate to="/login" />
//       ) : (
//         <Component {...rest} />
//       )
//     }
//   />
// );

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

// export default connect(mapStateToProps)(PrivateRoute);
