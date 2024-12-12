// src/components/facilitybookingpage/PaymentDetails.js
import React from 'react';

const PaymentDetails = ({ totalPayment, formik }) => (
  <div className="bg-gray-50 p-2 rounded-lg shadow-sm">
    <h3 className="text-lg font-medium text-gray-700 mb-2">Payment Details</h3>
    <p className="text-gray-700 mb-2">Total Payment: <span className="font-semibold text-red-700">Rs. {totalPayment}/=</span></p>
    <div>
      <h4 className="text-md font-semibold mb-0.5">Bank Details for Payment</h4>
      <p className="text-sm">Account Number : 12345678</p>
      <p className="text-sm">Bank Name : Bank of Ceylon</p>
      <p className="text-sm">I-Pay Phone Number : 077-1234567</p>
    </div>
    <div className="mt-4">
      <label className="block text-sm font-bold text-gray-600 mb-1">Upload Payment Receipt</label>
      <input
        type="file"
        name="paymentReceipt"
        accept=".jpeg,.png,.pdf"
        onChange={(event) => formik.setFieldValue('paymentReceipt', event.target.files[0])}
        className="w-full text-sm"
      />
      {formik.touched.paymentReceipt && formik.errors.paymentReceipt ? (
        <div className="text-red-500 text-xs mt-1">{formik.errors.paymentReceipt}</div>
      ) : null}
    </div>
  </div>
);

export default PaymentDetails;
