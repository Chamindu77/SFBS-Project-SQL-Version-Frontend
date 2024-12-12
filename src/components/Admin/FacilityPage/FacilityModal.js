import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FacilityModal = ({ facility, isOpen, onClose, onSave }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(facility?.image || '');

  // Validation schema for creating a facility (including image field)
  const validationSchema = Yup.object().shape({
    sportName: Yup.string().required('This field is required'),
    sportCategory: Yup.string().required('This field is required'),
    courtNumber: Yup.number().required('This field is required'),
    courtPrice: Yup.number().required('This field is required'),
    image: Yup.mixed()
      .required('Image is required')
      .test('fileSize', 'File size is too large', (value) => !value || (value && value.size <= 2 * 1024 * 1024))  // 2MB max
      .test('fileType', 'Unsupported file format', (value) =>
        !value || (value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type))
      ),
  });

  const handleImageUpload = (e, setFieldValue) => {
    const file = e.target.files[0];
    setImageFile(file);
    setFieldValue('image', file);  // Update the formik field value for 'image'

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('sportName', values.sportName);
    formData.append('sportCategory', values.sportCategory);
    formData.append('courtNumber', values.courtNumber);
    formData.append('courtPrice', values.courtPrice);
    if (imageFile) formData.append('image', imageFile);

    try {
      const token = localStorage.getItem('token');
      let response;
      if (facility?.facilityId) {
        // Update facility case
        response = await axios.put(
          `http://localhost:5000/api/v1/facilities/${facility.facilityId}`,
          formData,
          { headers: { 'x-auth-token': token, 'Content-Type': 'multipart/form-data' } }
        );
        toast.success('Facility updated successfully!');
      } else {
        // Create facility case
        response = await axios.post('http://localhost:5000/api/v1/facilities', formData, {
          headers: { 'x-auth-token': token, 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Facility created successfully!');
      }

      onSave(response.data);
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 2000);
    } catch (err) {
      toast.error(`Error saving facility: ${err.message}`);
    }

    setSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full max-h-screen">
        <h2 className="text-lg font-bold mb-2">
          {facility?.sportName ? 'Update Facility Details' : 'Add New Facility'}
        </h2>

        <Formik
          initialValues={{
            sportName: facility?.sportName || '',
            sportCategory: facility?.sportCategory || 'Indoor Games',
            courtNumber: facility?.courtNumber || '',
            courtPrice: facility?.courtPrice || '',
            image: null,
          }}
          validationSchema={!facility?._id ? validationSchema : null}  // Apply validation only if creating a new facility
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="space-y-2">
              {/* Sport Name */}
              <div className="mb-2">
                <div className="flex items-center">
                  <label className="text-gray-700 w-1/3">Sport Name:</label>
                  <div className="w-2/3">
                    <Field
                      type="text"
                      name="sportName"
                      className="w-full p-1 border border-gray-300 rounded"
                      required
                    />
                    <ErrorMessage name="sportName" component="div" className="text-red-600 text-xs mt-1" />
                  </div>
                </div>
              </div>


              {/* Sport Category */}
              <div className="flex items-center mb-2">
                <label className="text-gray-700 w-1/3">Category:</label>
                <Field as="select" name="sportCategory" className="w-2/3 p-1 border border-gray-300 rounded">
                  <option value="Indoor Games">Indoor Games</option>
                  <option value="Outdoor Games">Outdoor Games</option>
                  <option value="Aquatic Sports">Aquatic Sports</option>
                </Field>
                <ErrorMessage name="sportCategory" component="div" className="text-red-600" />
              </div>

              {/* Court Number */}
              <div className="mb-2">
                <div className="flex items-center">
                  <label className="text-gray-700 w-1/3">Court No:</label>
                  <div className="w-28">
                    <Field
                      type="number"
                      name="courtNumber"
                      className="w-full p-1 border border-gray-300 rounded"
                      required
                    />
                    <ErrorMessage name="courtNumber" component="div" className="text-red-600 text-xs mt-1" />
                  </div>
                </div>
              </div>


              {/* Hourly Booking Fee */}
              <div className="mb-2">
                <div className="flex items-center">
                  <label className="text-gray-700 w-1/3">Hourly Fee (Rs):</label>
                  <div className="w-1/4">
                    <Field
                      type="number"
                      name="courtPrice"
                      className="w-full p-1 border border-gray-300 rounded"
                      required
                    />
                    <ErrorMessage name="courtPrice" component="div" className="text-red-600 text-xs mt-1" />
                  </div>
                </div>
              </div>


              {/* Image Upload Section */}
              <div className="mb-2">
                <div className="flex items-center">
                  <label className="text-gray-700 w-1/3">Upload Image:</label>
                  <div className="w-2/3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, setFieldValue)}
                      className="w-full p-1 border border-gray-300 rounded mt-2"
                    />
                    <ErrorMessage name="image" component="div" className="text-red-600 text-xs " />
                  </div>
                </div>
              </div>


              {/* Image Preview */}
              {imagePreview && (
                <div className="mb-2">
                  <label className="block text-gray-700 mb-1">Image Preview</label>
                  <img src={imagePreview} alt="Selected facility" className="w-full h-32 object-cover rounded-lg" />
                </div>
              )}

              {/* Action buttons */}
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
                  {facility?.sportName ? 'Save Changes' : 'Create Facility'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FacilityModal;
