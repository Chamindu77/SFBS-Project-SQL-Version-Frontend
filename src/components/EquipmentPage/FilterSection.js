import React from 'react';
import { FaRedo } from 'react-icons/fa';

const FilterSection = ({ availableEquipment, selectedSport, onFilter, onReset }) => {
  const renderUniqueSports = () => {
    const sportsWithCount = availableEquipment.reduce((acc, equipment) => {
      const sport = equipment.sportName;
      if (acc[sport]) {
        acc[sport]++;
      } else {
        acc[sport] = 1;
      }
      return acc;
    }, {});

    return Object.entries(sportsWithCount).map(([sportName, count], index) => (
      <li
        key={index}
        className={`flex items-center justify-between mb-2 cursor-pointer py-2 px-4 rounded-lg transition duration-300 ${
          selectedSport === sportName ? 'font-bold bg-gray-200 text-gray-800' : 'font-normal bg-gray-100 text-gray-800'
        }`}
        onClick={() => onFilter(sportName)}
      >
        <span className="text-lg font-semibold">{sportName}</span>
        <span className="text-lg font-semibold">{count}</span>
      </li>
    ));
  };

  return (
    <div className="w-1/4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Filter by Sport</h2>
      <ul>
        {renderUniqueSports()}
      </ul>
      <div className="flex flex-col items-center space-y-4 mt-6">
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
