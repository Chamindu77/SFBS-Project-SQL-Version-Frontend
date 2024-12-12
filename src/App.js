import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from './components/User/HomePage';
import Registration from './components/User/Registration';
import Login from './components/User/Login';
import EquipmentPage from './components/EquipmentPage/EquipmentPage';
import SportCategoryPage from './components/FacilityPage/SportCategoryPage';
import ProtectedRoute from './components/Shared/ProtectedRoute';
import FacilityBookingPage from './components/FacilityBookingPage/FacilityBookingPage';
import EquipmentBookingPage from './components/EquipmentBookingPage/EquipmentBookingPage';
import CoachPage from './components/AllCoachProfiles/CoachPage';
import CoachProfile from './components/CoachProfile/CoachProfilePage';
import SessionRequestPage from './components/SessionRequestPage/SessionRequestPage';
import AboutPage from './components/User/AboutPage';
import SessionRequestDetailsPage from './components/SessionRequestDetailsPage/SessionRequestDetailsPage';
import CoachViewRequest from './components/CoachViewRequest/CoachViewRequest';
import CoachViewBookingRequest from './components/CoachViewBookingRequest/CoachViewBookingRequest';
import CoachDetails from './components/CoachDetails/CoachProfileDetails';
import RegisterCoachProfileForm from './components/CoachDetails/CoachProfileForm';
import UserManagment from './components/Admin/AdminUserManagement/AdminUserManagement';
import AdminCoachManagement from './components/Admin/AdminCoachProfileManagement/CoachPage';
import AdminCoachProfileManagement from './components/Admin/AdminCoachProfileManagement/CoachProfile/CoachProfilePage';
import FacilityManagement from './components/Admin/FacilityPage/SportCategoryPage';
import EquipmentManagement from './components/Admin/EquipmentPage/EquipmentPage';
import GoogleAuthRedirect from './components/User/GoogleAuthRedirect';
import AdminFacilityBookings from './components/Admin/AdminViewAllFacilityBookings/AdminFacilityBookings';
import AdminEquipmentBookings from './components/Admin/AdminViewAllEquipmentBookings/AdminEquipmentBookings';
import AdminSessionBookings from './components/Admin/AdminViewAllSessionBookings/AdminSessionBookings';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />

          <Route path="/auth/google/callback" element={<GoogleAuthRedirect />} />

          <Route path="/equipment" element={
            <ProtectedRoute>
              <EquipmentPage />
            </ProtectedRoute>
          }
          />
          <Route path="/sportcategory" element={
            <ProtectedRoute>
              <SportCategoryPage />
            </ProtectedRoute>
          }
          />
          <Route path="/facility-booking" element={
            <ProtectedRoute>
              <FacilityBookingPage />
            </ProtectedRoute>
          }
          />
          <Route path="/equipment-booking" element={
            <ProtectedRoute>
              <EquipmentBookingPage />
            </ProtectedRoute>
          }
          />
          <Route path="/coach-page" element={
            <ProtectedRoute>
              <CoachPage />
            </ProtectedRoute>
          }
          />
          <Route path="/coach-profile/:id" element={
            <ProtectedRoute>
              <CoachProfile />
            </ProtectedRoute>
          }
          />
          <Route path="/coach-booking/:coachId" element={
            <ProtectedRoute>
              <SessionRequestPage />
            </ProtectedRoute>
          }
          />

          <Route path="/session-request-details" element={
            <ProtectedRoute>
              <SessionRequestDetailsPage />
            </ProtectedRoute>
          }
          />

          <Route path="/about" element={
            <AboutPage />
          }
          />

          <Route path="/coach-view-request" element={

            <CoachViewRequest />

          }
          />

          <Route path="/coach-view-booked-request" element={

            <CoachViewBookingRequest />
          }
          />

          <Route path="/coach-details" element={

            <CoachDetails />
          }
          />

          <Route path="/coach-register-details" element={

            <RegisterCoachProfileForm />
          }
          />


          <Route path="/user-managment" element={

            <UserManagment />
          }
          />

          <Route path="/Coaches-managment" element={

            <AdminCoachManagement />
          }
          />
          <Route path="/coach-profile-managment/:id" element={

            <AdminCoachProfileManagement />

          }
          />

          <Route path="/facility-managment" element={

            <FacilityManagement />

          }
          />

          <Route path="/equipment-managment" element={

            <EquipmentManagement />

          }
          />

          <Route path="/admin/facility-bookings" element={
            <AdminFacilityBookings />
          }
          />

          <Route path="/admin/equipment-bookings" element={
            <AdminEquipmentBookings />
          }
          />

          <Route path="/admin/session-bookings" element={
            <AdminSessionBookings />
          }
          />


        </Routes>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </Router>
  );
};

export default App;
