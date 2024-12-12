// src/components/facilitybookingpage/BookingDetails.js
import React from 'react';
import DatePicker from 'react-datepicker';
import { Tooltip } from 'react-tooltip';
import TimeSlotCheckbox from './TimeSlotCheckbox';
import CustomDateInput from './CustomDateInput';

const timeSlots = [
  "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00",
  "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00",
  "16:00 - 17:00", "17:00 - 18:00"
];

const BookingDetails = ({ bookingDate, setBookingDate, handleTimeSlotChange, selectedTimeSlots, availableSlots, formik }) => (
  <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
    <h3 className="text-lg font-medium text-gray-700 mb-2">Booking Details</h3>
    <div className="space-y-2">
      <div>
        <label className="block text-sm font-medium text-gray-600">Booking Date</label>
        {/* <DatePicker
          selected={bookingDate}
          onChange={(date) => {
            setBookingDate(date);
            formik.setFieldValue('bookingDate', date.toISOString().split("T")[0]);
          }}
          className="w-full p-2 border border-gray-50 rounded-lg text-sm"
          dateFormat="yyyy-MM-dd"
          minDate={new Date().setDate(new Date().getDate() + 1)}
          customInput={<CustomDateInput />}
        /> */}

        <DatePicker
          selected={bookingDate}
          onChange={(date) => {
            const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())); // Normalize to UTC
            setBookingDate(utcDate);
            formik.setFieldValue('bookingDate', utcDate.toISOString().split("T")[0]); // Pass only the date part
          }}
          className="w-full p-2 border border-gray-50 rounded-lg text-sm"
          dateFormat="yyyy-MM-dd"
          minDate={new Date().setDate(new Date().getDate() + 1)}
          customInput={<CustomDateInput />}
        />
        {formik.touched.bookingDate && formik.errors.bookingDate ? (
          <div className="text-red-500 text-xs mt-1">{formik.errors.bookingDate}</div>
        ) : null}
      </div>

      <div style={{ visibility: bookingDate ? 'visible' : 'hidden' }}>
        <label className="block text-sm font-medium text-gray-600">Time Slots</label>
        <Tooltip id="timeTooltip" place="top" effect="solid">
          Select the time slots you want to book. You can select multiple slots.
        </Tooltip>
        <div className="flex flex-wrap gap-2 mt-2">
          {timeSlots.map((slot, index) => (
            <TimeSlotCheckbox
              key={index}
              slot={slot}
              isChecked={selectedTimeSlots.includes(slot)}
              onChange={() => handleTimeSlotChange(slot)}
              disabled={!availableSlots.includes(slot)}
            />
          ))}
        </div>
        {formik.touched.selectedTimeSlots && formik.errors.selectedTimeSlots ? (
          <div className="text-red-500 text-xs mt-1">{formik.errors.selectedTimeSlots}</div>
        ) : null}
      </div>
    </div>
  </div>
);

export default BookingDetails;
