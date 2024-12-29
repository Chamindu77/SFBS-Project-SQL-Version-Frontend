import React from 'react';

const SessionRequestForm = ({
  userData,
  userPhone,
  handlePhoneChange,
  selectedSessionType,
  handleSessionTypeChange,
  selectedTimeSlot,
  handleTimeSlotChange,
  coach,
  handleSubmit,
}) => {
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={userData.name}
        className="w-full px-4 py-2 border rounded-md"
        readOnly
      />

      <input
        type="email"
        placeholder="Email Address"
        value={userData.email}
        className="w-full px-4 py-2 border rounded-md"
        readOnly
      />

      <input
        type="tel"
        placeholder="Phone Number"
        value={userPhone}
        onChange={handlePhoneChange}
        className="w-full px-4 py-2 border rounded-md"
        required
      />

      <select
        className="w-full px-4 py-2 border rounded-md"
        value={selectedSessionType}
        onChange={handleSessionTypeChange}
        required
      >
        <option value="">Select Session</option>
        {coach.offerSessions.map((session, index) => (
          <option key={index} value={session}>
            {session}
          </option>
        ))}
      </select>

      <select
        className="w-full px-4 py-2 border rounded-md"
        value={`${selectedTimeSlot.date}|${selectedTimeSlot.timeSlot}`}
        onChange={handleTimeSlotChange}
        required
      >
        <option value="">Select Time Slot</option>
        {coach.availableTimeSlots.map((slot) => (
          <option key={`${slot.date}-${slot.timeSlot}`} value={`${slot.date}|${slot.timeSlot}`}>
            {new Date(slot.date).toLocaleDateString()} - {slot.timeSlot}
          </option>
        ))}
      </select>

      <div className="flex items-center space-x-2">
        <input type="checkbox" required />
        <p className="text-sm text-gray-600">
          By clicking 'Send Request', I agree to the Terms of Use and Privacy Policy.
        </p>
      </div>

      <button
        type="submit"
        className="bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-800"
      >
        Send Request →
      </button>
    </form>
  );
};

export default SessionRequestForm;
