import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAvailableEquipment } from '../../redux/actions/equipmentActions';
import Footer from '../Layout/Footer';
import LogoutNavbar from '../Layout/LogoutNavbar';
import FilterSection from './FilterSection';
import EquipmentList from './EquipmentList';
import MessiHero from '../../assets/image-hero-sportcategorypage.jpg';
import { jwtDecode } from 'jwt-decode';
import CoachLogoutNavbar from '../Layout/CoachLogoutNavbar';
import Navbar from '../Layout/Navbar';
import CoachNavbar from '../Layout/CoachNavbar';
import DefNavbar from '../Layout/DefNavbar';


const EquipmentPage = ({ fetchAvailableEquipment, availableEquipment  }) => {
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  let role = null;
  if (isLoggedIn && token) {
    try {
      const decodedToken = jwtDecode(token);
      role = decodedToken.role;
    } catch (error) {
      console.error('Error decoding token', error);
    }
  }

  const [selectedSport, setSelectedSport] = useState(null);
  const [filteredEquipment, setFilteredEquipment] = useState([]);

  useEffect(() => {
    fetchAvailableEquipment();
  }, [fetchAvailableEquipment]);

  useEffect(() => {
    if (availableEquipment.length > 0) {
      setFilteredEquipment(availableEquipment);
    }
  }, [availableEquipment]);

  const handleFilter = (sportName) => {
    setSelectedSport(sportName);  
    if (sportName) {
      const filtered = availableEquipment.filter(equipment => equipment.sportName === sportName);
      setFilteredEquipment(filtered);
    } else {
      setFilteredEquipment(availableEquipment);
    }
  };

  const handleReset = () => {
    setSelectedSport(null);
    setFilteredEquipment(availableEquipment);
  };

  if (availableEquipment.length === 0) {
    return (
      <div className="text-center py-20">
        <p>Loading equipment...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Navbar based on role */}
      {role === 'User' && (isLoggedIn ? <LogoutNavbar /> : <Navbar />)}
      {role === 'Coach' && (isLoggedIn ? <CoachLogoutNavbar /> : <CoachNavbar />)}
      {!role && <DefNavbar />} {/* Default Navbar if no role is found */}

      <div className="bg-gray-100 min-h-screen p-6">
        <div
          className="relative bg-cover bg-center text-white p-24 rounded-lg shadow-md mb-8"
          style={{ backgroundImage: `url(${MessiHero})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
          <div className="relative z-10 animate-blurToFocus">
            <h1 className="text-5xl font-bold mb-4">
              Select Your <span className="text-green-400">Equipment</span> and Start Your <span className="text-green-400">Booking</span>
            </h1>
            <p className="text-2xl">
              Choose Your Preferred Equipment, Then Proceed To Book It.
            </p>
          </div>
        </div>

        <div className="flex">
          <FilterSection
            availableEquipment={availableEquipment}
            selectedSport={selectedSport}  
            onFilter={handleFilter}        
            onReset={handleReset}          
          />
          <EquipmentList
            filteredEquipment={filteredEquipment}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  availableEquipment: state.equipment.availableEquipment,
});

export default connect(mapStateToProps, { fetchAvailableEquipment })(EquipmentPage);
