// src/components/facilitybookingpage/TimeSlotCheckbox.js
import React from 'react';

const TimeSlotCheckbox = ({ slot, isChecked, onChange, disabled }) => (
  <div className="flex items-center text-sm">
    <input
      type="checkbox"
      id={slot}
      value={slot}
      checked={isChecked}
      onChange={onChange}
      className="mr-2"
      disabled={disabled}
    />
    <label htmlFor={slot} className="text-sm">{slot}</label>
  </div>
);

export default TimeSlotCheckbox;
