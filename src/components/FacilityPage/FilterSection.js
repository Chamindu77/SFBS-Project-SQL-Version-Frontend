import React, { useState } from 'react';
import { FaChevronUp, FaChevronDown, /*FaFilter,*/ FaRedo } from 'react-icons/fa';

const FilterSection = ({ availableFacilities, selectedSport, onFilter, onReset }) => {
  const [indoorOpen, setIndoorOpen] = useState(true);
  const [outdoorOpen, setOutdoorOpen] = useState(false);
  const [aquaticOpen, setAquaticOpen] = useState(false);

  const getUniqueSportNames = (category) => {
    const sports = availableFacilities
      .filter(facility => facility.sportCategory === category)
      .map(facility => facility.sportName);
    return [...new Set(sports)];
  };

  const renderUniqueSports = (sports, category) => {
    return sports.map((sportName, index) => (
      <li
        key={index}
        className={`flex items-center mb-2 cursor-pointer ${selectedSport === sportName ? 'font-bold' : ''}`}
        onClick={() => onFilter(sportName)}
      >
        <span className="ml-8">{sportName}</span>
      </li>
    ));
  };

  return (
    <div className="w-1/4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Filter with Categories</h2>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2 cursor-pointer bg-gray-100 px-4 py-2 rounded-full" onClick={() => setIndoorOpen(!indoorOpen)}>
          <h3 className="font-semibold text-lg">Indoor Games</h3>
          <div className="flex items-center">
            <span className="font-bold mr-2">{getUniqueSportNames('Indoor Games').length}</span>
            {indoorOpen ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
        {indoorOpen && (
          <ul>
            {renderUniqueSports(getUniqueSportNames('Indoor Games'), 'Indoor Games')}
          </ul>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2 cursor-pointer bg-gray-100 px-4 py-2 rounded-full" onClick={() => setOutdoorOpen(!outdoorOpen)}>
          <h3 className="font-semibold text-lg">Outdoor Games</h3>
          <div className="flex items-center">
            <span className="font-bold mr-2">{getUniqueSportNames('Outdoor Games').length}</span>
            {outdoorOpen ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
        {outdoorOpen && (
          <ul>
            {renderUniqueSports(getUniqueSportNames('Outdoor Games'), 'Outdoor Games')}
          </ul>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2 cursor-pointer bg-gray-100 px-4 py-2 rounded-full" onClick={() => setAquaticOpen(!aquaticOpen)}>
          <h3 className="font-semibold text-lg">Aquatic Sports</h3>
          <div className="flex items-center">
            <span className="font-bold mr-2">{getUniqueSportNames('Aquatic Sports').length}</span>
            {aquaticOpen ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
        {aquaticOpen && (
          <ul>
            {renderUniqueSports(getUniqueSportNames('Aquatic Sports'), 'Aquatic Sports')}
          </ul>
        )}
      </div>

      <div className="flex flex-col items-center space-y-4 mt-6">
        {/* <button
          className="flex items-center bg-teal-700 text-white font-bold px-3.5 py-2 rounded-lg hover:bg-teal-800 transition duration-300 shadow-md"
          onClick={() => onFilter(selectedSport)}
        >
          <FaFilter className="mr-2" />
          Filter
        </button> */}
        <button
          className="flex items-center bg-red-400 text-white font-bold px-3.5 py-2 rounded-lg hover:bg-red-500 transition duration-300 shadow-md"
          onClick={onReset}
        >
          <FaRedo className="mr-2" />
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
