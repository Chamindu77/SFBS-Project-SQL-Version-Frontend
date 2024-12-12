import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaRedoAlt } from 'react-icons/fa';

const FilterSection = ({ uniqueCoachingSports, uniqueCoachLevels, coachingSportFilter, coachLevelFilter, handleFilter, handleReset }) => {
  const [isOpen, setIsOpen] = useState({ coachingSport: false, coachLevel: false });

  const renderDropdown = (title, options, selectedValue, setSelectedValue, filterKey) => (
    <div className="relative">
      <button
        className="flex items-center justify-between bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm w-48 transition-all duration-300 hover:shadow-md hover:border-gray-400 focus:outline-none"
        onClick={() => setIsOpen(prev => ({ ...prev, [filterKey]: !prev[filterKey] }))}
      >
        <span>{selectedValue || title}</span>
        {isOpen[filterKey] ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isOpen[filterKey] && (
        <div className="absolute bg-white border border-gray-300 shadow-lg rounded-md mt-2 w-full max-h-48 overflow-y-auto z-10 transition-all duration-300">
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                className={`px-4 py-2 cursor-pointer transition-all duration-200 hover:bg-gray-200 ${selectedValue === option ? 'bg-gray-100 font-bold' : ''}`}
                onClick={() => {
                  setSelectedValue(option);
                  setIsOpen(prev => ({ ...prev, [filterKey]: false }));
                  handleFilter(
                    filterKey === 'coachingSport' ? option : coachingSportFilter,
                    filterKey === 'coachLevel' ? option : coachLevelFilter
                  );
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex justify-center items-center space-x-4 mb-0">
      {renderDropdown('Select Sport', uniqueCoachingSports, coachingSportFilter, () => {}, 'coachingSport')}
      {renderDropdown('Select Role', uniqueCoachLevels, coachLevelFilter, () => {}, 'coachLevel')}
      <button
        className="flex items-center bg-red-400 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 transition-all duration-300 focus:outline-none"
        onClick={handleReset}
      >
        <FaRedoAlt className="mr-2" /> Reset
      </button>
    </div>
  );
};

export default FilterSection;
