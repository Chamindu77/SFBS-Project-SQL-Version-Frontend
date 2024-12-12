// src/components/facilitybookingpage/UserDetails.js
import React from 'react';

const UserDetails = ({ userDetails, formik }) => (
  <div className="bg-gray-50 p-2 rounded-lg shadow-sm">
    <h3 className="text-lg font-medium text-gray-700 mb-2">User Details</h3>
    <div className="space-y-2">
      <div>
        <label className="block text-sm font-medium text-gray-600">Name</label>
        <input
          type="text"
          value={userDetails.name}
          readOnly
          className="w-60 p-2 border border-gray-300 rounded-lg bg-gray-100 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">Email</label>
        <input
          type="email"
          value={userDetails.email}
          readOnly
          className="w-60 p-2 border border-gray-300 rounded-lg bg-gray-100 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-60 p-2 border border-gray-300 rounded-lg text-sm"
          placeholder="Enter your phone number"
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <div className="text-red-500 text-xs mt-1">{formik.errors.phoneNumber}</div>
        ) : null}
      </div>
    </div>
  </div>
);

export default UserDetails;
