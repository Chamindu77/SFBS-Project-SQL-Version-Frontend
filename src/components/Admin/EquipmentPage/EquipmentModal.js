import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const EquipmentModal = ({ equipment, isOpen, onClose, onSave }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(equipment?.image || '');

  // Validation schema for Equipment Modal
  const validationSchema = Yup.object().shape({
    equipmentName: Yup.string().required('This field is required'),
    sportName: Yup.string().required('This field is required'),
    rentPrice: Yup.number().required('This field is required'),
    image: Yup.mixed()
      .required('Image is required')
      .test('fileSize', 'File size is too large', (value) => !value || (value && value.size <= 2 * 1024 * 1024)) // 2MB max
      .test('fileType', 'Unsupported file format', (value) =>
        !value || (value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type))
      ),
  });

  const handleImageUpload = (e, setFieldValue) => {
    const file = e.target.files[0];
    setImageFile(file);
    setFieldValue('image', file); // Update Formik field value for 'image'

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('equipmentName', values.equipmentName);
    formData.append('sportName', values.sportName);
    formData.append('rentPrice', values.rentPrice);
    if (imageFile) formData.append('image', imageFile);

    try {
      const token = localStorage.getItem('token');
      let response;
      if (equipment?.equipmentId) {
        // Update existing equipment
        response = await axios.put(`https://fbs-backend-node-sql.vercel.app/api/v1/equipment/${equipment.equipmentId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data', 'x-auth-token': token },
        });
        toast.success('Equipment updated successfully!');
      } else {
        // Create new equipment
        response = await axios.post('https://fbs-backend-node-sql.vercel.app/api/v1/equipment', formData, {
          headers: { 'Content-Type': 'multipart/form-data', 'x-auth-token': token },
        });
        toast.success('Equipment created successfully!');
      }

      onSave(response.data);
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error(`Error saving equipment: ${error.message}`);
    }

    setSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full max-h-screen">
        <h2 className="text-lg font-bold mb-2">
          {equipment?.equipmentName ? 'Update Equipment Details' : 'Add New Equipment'}
        </h2>

        <Formik
          initialValues={{
            equipmentName: equipment?.equipmentName || '',
            sportName: equipment?.sportName || '',
            rentPrice: equipment?.rentPrice || '',
            image: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="space-y-2">
              {/* Equipment Name */}
              <div className="mb-2">
                <div className="flex items-center">
                  <label className="text-gray-700 w-1/3">Equipment Name:</label>
                  <div className="w-2/3">
                    <Field
                      type="text"
                      name="equipmentName"
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                    <ErrorMessage name="equipmentName" component="div" className="text-red-600 text-xs mt-1" />
                  </div>
                </div>
              </div>

              {/* Sport Name */}
              <div className="mb-2">
                <div className="flex items-center">
                  <label className="text-gray-700 w-1/3">Sport Name:</label>
                  <div className="w-2/3">
                    <Field
                      type="text"
                      name="sportName"
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                    <ErrorMessage name="sportName" component="div" className="text-red-600 text-xs mt-1" />
                  </div>
                </div>
              </div>

              {/* Rent Price */}
              <div className="mb-2">
                <div className="flex items-center">
                  <label className="text-gray-700 w-1/3">Rent Price (Rs):</label>
                  <div className="w-1/3">
                    <Field
                      type="number"
                      name="rentPrice"
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                    <ErrorMessage name="rentPrice" component="div" className="text-red-600 text-xs mt-1" />
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="mb-2">
                <div className="flex items-center">
                  <label className="text-gray-700 w-1/3">Upload Image:</label>
                  <div className="w-2/3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, setFieldValue)}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                    <ErrorMessage name="image" component="div" className="text-red-600 text-xs mt-1" />
                  </div>
                </div>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mb-2">
                  <label className="block text-gray-700 mb-1">Image Preview</label>
                  <img src={imagePreview} alt="Selected equipment" className="w-full h-32 object-cover rounded-lg" />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  className="bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-700"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-700 text-white py-2 px-3 rounded-lg hover:bg-teal-800"
                  disabled={isSubmitting}
                >
                  {equipment?.equipmentName ? 'Save Changes' : 'Create Equipment'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EquipmentModal;
