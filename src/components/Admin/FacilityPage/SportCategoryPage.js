
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminFooter from '../../Layout/AdminFooter';
import AdminNavbar from '../../Layout/AdminNavbar';
import SportsList from './SportsList';
import FacilityModal from './FacilityModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SportCategoryPage = () => {
  const [availableFacilities, setAvailableFacilities] = useState([]);
  const [filteredSports, setFilteredSports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newFacility] = useState({
    sportName: '',
    sportCategory: 'Indoor Games',
    courtNumber: '',
    courtPrice: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFacilities = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/v1/facilities', {
          headers: { 'x-auth-token': token },
        });
        setAvailableFacilities(response.data);
        setFilteredSports(response.data); 
        setLoading(false);
      } catch (err) {
        setError('Error fetching facilities');
        setLoading(false);
      }
    };
    fetchFacilities();
  }, []);

  
  const handleAddNewFacility = () => {
    setIsAddingNew(true);
    setModalOpen(true);
  };

 
  const handleSave = (facilityDetails) => {
    if (isAddingNew) {
      console.log('New Facility Added:', facilityDetails);
    } else {
      console.log('Facility Updated:', facilityDetails);
    }
    setModalOpen(false);
    setIsAddingNew(false);
  };

  
  useEffect(() => {
    let filtered = availableFacilities;

    
    if (searchTerm) {
      filtered = filtered.filter(facility =>
        facility.sportName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(facility => facility.sportCategory === selectedCategory);
    }

    console.log('Filtered Facilities:', filtered); 
    setFilteredSports(filtered);
  }, [searchTerm, selectedCategory, availableFacilities]); 

  return (
    <div>
      <AdminNavbar />
      <div className="bg-slate-50 min-h-screen p-6">
        <h1 className="text-3xl font-bold ml-28 mt-4 text-teal-700">Facility Management</h1>

        {loading ? (
          <p>Loading facilities...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <div className="flex justify-between items-center ml-28 mt-6 mb-4">
              <input
                type="text"
                placeholder="Search sports by name..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-1/3 p-2 border border-gray-300 rounded-lg shadow-md"
              />
              <div className="flex space-x-4 mr-32">
                {['All', 'Indoor Games', 'Outdoor Games', 'Aquatic Sports'].map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-semibold ${
                      selectedCategory === category
                        ? 'bg-teal-700 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="ml-28 mt-4">
              <button
                className="bg-sky-700 text-white py-2 px-4 rounded-lg hover:bg-sky-800 transition duration-300"
                onClick={handleAddNewFacility}
              >
                Add New Facility
              </button>
            </div>

            <div className="flex">
             
              <SportsList availableFacilities={filteredSports} />
            </div>
          </>
        )}
      </div>
      <AdminFooter />

      <ToastContainer />

      {isModalOpen && (
        <FacilityModal
          facility={isAddingNew ? newFacility : null}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default SportCategoryPage;
