// src/components/facilitybookingpage/CustomDateInput.js
import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const CustomDateInput = ({ value, onClick }) => (
  <div className="flex items-center">
    <input
      type="text"
      value={value}
      onClick={onClick}
      readOnly
      className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white cursor-pointer"
      placeholder="Select a date"
    />
    <FaCalendarAlt onClick={onClick} className="ml-2 text-gray-500 cursor-pointer" />
  </div>
);

export default CustomDateInput;
