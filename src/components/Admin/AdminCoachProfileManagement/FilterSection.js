import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FilterSection = ({
  uniqueCoachingSports,
  uniqueCoachLevels,
  coachingSportFilter,
  coachLevelFilter,
  handleFilter,
  searchTerm,
  setSearchTerm
}) => {
  const [isOpen, setIsOpen] = useState({ coachingSport: false, coachLevel: false });

  const renderDropdown = (title, options, selectedValue, filterKey, allText) => (
    <div className="relative">
      <button
        className="flex items-center justify-between bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm w-48 transition-all duration-300 hover:shadow-md hover:border-gray-400 focus:outline-none"
        onClick={() => setIsOpen(prev => ({ ...prev, [filterKey]: !prev[filterKey] }))}
      >
        {/* If there's a selected value, display it. Otherwise, show the 'All' text */}
        <span>{selectedValue ? selectedValue : allText}</span>
        {isOpen[filterKey] ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isOpen[filterKey] && (
        <div className="absolute bg-white border border-gray-300 shadow-lg rounded-md mt-2 w-full max-h-48 overflow-y-auto z-10 transition-all duration-300">
          <ul>
            {/* "All" option */}
            <li
              className={`px-4 py-2 cursor-pointer transition-all duration-200 hover:bg-gray-200 ${selectedValue === '' ? 'bg-gray-100 font-bold' : ''}`}
              onClick={() => {
                setIsOpen(prev => ({ ...prev, [filterKey]: false }));
                // Clear the filter and set to empty string (show "All Sports" or "All Roles")
                handleFilter(
                  filterKey === 'coachingSport' ? '' : coachingSportFilter,
                  filterKey === 'coachLevel' ? '' : coachLevelFilter
                );
              }}
            >
              {allText}
            </li>
            {/* List of filter options */}
            {options.map((option, index) => (
              <li
                key={index}
                className={`px-4 py-2 cursor-pointer transition-all duration-200 hover:bg-gray-200 ${selectedValue === option ? 'bg-gray-100 font-bold' : ''}`}
                onClick={() => {
                  setIsOpen(prev => ({ ...prev, [filterKey]: false }));
                  // Set the selected value for the specific filter
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
      {/* Search Bar */}
      <input
        type="text"
        className="p-2 border border-gray-300 rounded-md w-1/6"
        placeholder="Search by Coach Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* Sport Filter Dropdown */}
      {renderDropdown('Select Sport', uniqueCoachingSports, coachingSportFilter, 'coachingSport', 'All Sports')}
      {/* Role Filter Dropdown */}
      {renderDropdown('Select Role', uniqueCoachLevels, coachLevelFilter, 'coachLevel', 'All Roles')}
    </div>
  );
};

export default FilterSection;
