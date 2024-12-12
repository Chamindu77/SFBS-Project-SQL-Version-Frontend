import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCoachProfiles } from '../../redux/actions/coachActions';
import LogoutNavbar from '../Layout/LogoutNavbar';
import MessiHero from '../../assets/image-hero-sportcategorypage.jpg';
import Footer from '../Layout/Footer';
import CoachCard from './CoachCard'; 
import FilterSection from './FilterSection'; 

const CoachPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const coaches = useSelector(state => state.coaches.coaches);
  const [filteredCoaches, setFilteredCoaches] = useState(coaches);
  const [coachingSportFilter, setCoachingSportFilter] = useState('');
  const [coachLevelFilter, setCoachLevelFilter] = useState('');

  useEffect(() => {
    dispatch(fetchCoachProfiles());
  }, [dispatch]);

  useEffect(() => {
    setFilteredCoaches(
      coaches.filter(coach =>
        coach.isActive === true &&  // Ensure the coach is active
        (coachingSportFilter ? coach.coachingSport === coachingSportFilter : true) &&
        (coachLevelFilter ? coach.coachLevel === coachLevelFilter : true)
      )
    );
  }, [coaches, coachingSportFilter, coachLevelFilter]);

  const handleFilter = (coachingSport, coachLevel) => {
    setCoachingSportFilter(coachingSport);
    setCoachLevelFilter(coachLevel);
  };

  const handleReset = () => {
    setCoachingSportFilter('');
    setCoachLevelFilter('');
    setFilteredCoaches(coaches.filter(coach => coach.isActive === true)); // Ensure only active coaches are displayed on reset
  };

  const uniqueCoachingSports = useMemo(() => [...new Set(coaches.map(coach => coach.coachingSport))], [coaches]);
  const uniqueCoachLevels = useMemo(() => [...new Set(coaches.map(coach => coach.coachLevel))], [coaches]);

  return (
    <div>
      <LogoutNavbar />
      <div className="bg-gray-100 min-h-screen p-6">
        {/* Hero Section */}
        <div
          className="relative bg-cover bg-center text-white p-24 rounded-lg shadow-md mb-8"
          style={{ backgroundImage: `url(${MessiHero})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
          <div className="relative z-10 animate-blurToFocus">
            <h1 className="text-5xl font-bold mb-4">
              Select Your <span className="text-green-400">Coach</span> and Start Your <span className="text-green-400">Training</span>
            </h1>
            <p className="text-2xl">
              Choose Your Preferred Coach, Then Proceed To Book Your Sessions.
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <FilterSection 
          uniqueCoachingSports={uniqueCoachingSports} 
          uniqueCoachLevels={uniqueCoachLevels} 
          coachingSportFilter={coachingSportFilter} 
          coachLevelFilter={coachLevelFilter} 
          handleFilter={handleFilter} 
          handleReset={handleReset} 
        />

        {/* Coaches Section */}
        <div className="bg-gray-100 py-8">
          <div className="max-w-6xl mx-auto">
            {filteredCoaches.length > 0 ? (
              filteredCoaches.map((coach, index) => (
                <CoachCard 
                  key={index} 
                  coach={coach} 
                  handleViewProfile={navigate} 
                  handleCoachBooking={navigate} 
                />
              ))
            ) : (
              <div className="text-center text-gray-700">
                <p>No Coaches Available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CoachPage;
