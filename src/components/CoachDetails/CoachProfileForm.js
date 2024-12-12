import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';  
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';

// Define Yup validation schema
const validationSchema = Yup.object().shape({
  coachName: Yup.string().required('Coach Name is required'),
  coachLevel: Yup.string().required('Coach Level is required'),
  coachingSport: Yup.string().required('Coaching Sport is required'),
  experience: Yup.string().required('Experience is required'),
  offerSessions: Yup.array().min(1, 'At least one session must be selected'),
  sessionDescription: Yup.string().required('Session Description is required'),
  availableTimeSlots: Yup.array()
    .of(
      Yup.object().shape({
        date: Yup.string().required('Date is required'),
        timeSlot: Yup.string().required('Time slot is required'),
      })
    )
    .min(1, 'At least one time slot must be provided'),
});

const RegisterCoachProfileForm = ({ onCancel }) => {
  const defaultData = {
    coachName: '',
    coachLevel: '',
    coachingSport: '',
    coachPrice: {
      individualSessionPrice: '',
      groupSessionPrice: '',
    },
    availableTimeSlots: [],
    experience: '',
    offerSessions: [],
    sessionDescription: '',
    coachImage: '',
  };

  const [imagePreview, setImagePreview] = useState('');
  const [formModified, setFormModified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const coachLevels = ['Professional Level', 'Intermediate Level', 'Beginner Level'];
  const timeSlots = [
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM"
  ];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const next7Days = new Date(tomorrow);
  next7Days.setDate(tomorrow.getDate() + 7);

  const formatDate = (date) => date.toISOString().split('T')[0];

  const handleImageUpload = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue('coachImage', file);
      setImagePreview(URL.createObjectURL(file));
      setFormModified(true);
    }
  };

  const handleImageDelete = (setFieldValue) => {
    setImagePreview('');
    setFieldValue('coachImage', '');
    setFormModified(true);
  };

  const addTimeSlot = (availableTimeSlots, setFieldValue) => {
    if (availableTimeSlots.length >= 5) {
      toast.error('You can only add up to 5 time slots.');
      return;
    }
    setFieldValue('availableTimeSlots', [
      ...availableTimeSlots,
      { date: formatDate(tomorrow), timeSlot: timeSlots[0] }
    ]);
    setFormModified(true);
  };

  const removeTimeSlot = (index, availableTimeSlots, setFieldValue) => {
    const updatedSlots = availableTimeSlots.filter((_, i) => i !== index);
    setFieldValue('availableTimeSlots', updatedSlots);
    setFormModified(true);
  };

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    setErrorMessage('');

    try {
      const token = localStorage.getItem('token');

      const createProfileResponse = await axios.post(
        'http://localhost:5000/api/v1/coach-profile/',
        {
          coachName: values.coachName,
          coachLevel: values.coachLevel,
          coachingSport: values.coachingSport,
          coachPrice: values.coachPrice,
          availableTimeSlots: values.availableTimeSlots,
          experience: values.experience,
          offerSessions: values.offerSessions,
          sessionDescription: values.sessionDescription
        },
        { headers: { 'x-auth-token': token } }
      );

      const coachProfileId = createProfileResponse.data._id;
      console.log('Coach Profile ID:', coachProfileId);

      if (values.coachImage && typeof values.coachImage !== 'string') {
        const formDataImage = new FormData();
        formDataImage.append('image', values.coachImage);

        await axios.post(
          `http://localhost:5000/api/v1/coach-profile/upload-image`,
          formDataImage,
          {
            headers: {
              'x-auth-token': token,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }
      setTimeout(() => {
        toast.success('Profile uploaded successfully!');
        setFormModified(false);
        resetForm();
        navigate('/');
      }, 3000);


    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit the form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = (resetForm) => {
    resetForm();
    setImagePreview('');
    setFormModified(false);
    if (onCancel) onCancel();
  };

  return (
    <div>
      <Navbar />
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
      <Formik
        initialValues={defaultData}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, setFieldValue, resetForm, isSubmitting }) => (
          <Form className="max-w-3xl w-full bg-white rounded-lg shadow-xl p-4 px-8 space-y-4 flex flex-col justify-between">
            <div className="flex items-center space-x-4">
              {imagePreview ? (
                <div className="relative mt-1">
                  <img
                    src={imagePreview}
                    alt="Coach Profile"
                    className="w-40 h-44 rounded-xl object-cover shadow-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageDelete(setFieldValue)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-md p-2 text-xs"
                  >
                    X
                  </button>
                </div>
              ) : (
                <label className="w-40 h-44 flex items-center justify-center bg-gray-100 text-gray-600 border border-gray-300 rounded-xl cursor-pointer shadow-md">
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, setFieldValue)}
                  />
                </label>
              )}

              <div className="flex-1">
                <label className="block text-lg font-semibold text-gray-800 mt-4 mb-1 ml-8">Coach Name</label>
                <Field
                  type="text"
                  name="coachName"
                  className="w-4/5 p-2 ml-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter coach name"
                  onChange={(e) => {
                    setFieldValue("coachName", e.target.value);
                    setFormModified(true);
                  }}
                />
                <ErrorMessage name="coachName" component="div" className="text-red-500 ml-8 text-xs" />

                <div className="mt-3">
                  <label className="block text-md font-semibold text-gray-800 mb-1 ml-8">Coach Level</label>
                  <Field
                    as="select"
                    name="coachLevel"
                    className="w-4/5 p-2 ml-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) => {
                      setFieldValue("coachLevel", e.target.value);
                      setFormModified(true);
                    }}
                  >
                    <option value="" disabled>Select level</option>
                    {coachLevels.map((level, index) => (
                      <option key={index} value={level}>
                        {level}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="coachLevel" component="div" className="text-red-500 ml-8 text-xs" />
                </div>

                <div>
                  <label className="block mt-2 text-md ml-8 font-semibold text-gray-800 mb-1">Coaching Sport</label>
                  <Field
                    type="text"
                    name="coachingSport"
                    className="w-4/5 p-2 ml-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter sport"
                    onChange={(e) => {
                      setFieldValue("coachingSport", e.target.value);
                      setFormModified(true);
                    }}
                  />
                  <ErrorMessage name="coachingSport" component="div" className="text-red-500 ml-8 text-xs" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-md font-semibold text-gray-800 mb-1">Coach Experience</label>
              <Field
                as="textarea"
                name="experience"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Describe your experience"
                onChange={(e) => {
                  setFieldValue("experience", e.target.value);
                  setFormModified(true);
                }}
              />
              <ErrorMessage name="experience" component="div" className="text-red-500 text-xs" />
            </div>

            <div>
              <label className="block text-md font-semibold text-gray-800 mb-2">Coaching Sessions</label>
              <div className="flex space-x-8">
                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="offerSessions"
                    value="Individual Session"
                    className="mr-2"
                    onClick={() => setFormModified(true)}
                  />
                  <label className="text-gray-700">Individual Session</label>
                  {values.offerSessions.includes("Individual Session") && (
                    <Field
                      type="number"
                      name="coachPrice.individualSessionPrice"
                      placeholder="Price"
                      className="ml-4 p-2 border border-gray-300 rounded-md w-24 focus:ring-2 focus:ring-indigo-500"
                    />
                  )}
                </div>

                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="offerSessions"
                    value="Group Session"
                    className="mr-2"
                    onClick={() => setFormModified(true)}
                  />
                  <label className="text-gray-700">Group Session</label>
                  {values.offerSessions.includes("Group Session") && (
                    <Field
                      type="number"
                      name="coachPrice.groupSessionPrice"
                      placeholder="Price"
                      className="ml-4 p-2 border border-gray-300 rounded-md w-24 focus:ring-2 focus:ring-indigo-500"
                    />
                  )}
                </div>
              </div>
              <ErrorMessage name="offerSessions" component="div" className="text-red-500 text-xs" />
            </div>

            <div>
              <label className="block text-md font-semibold text-gray-800 mb-1">Session Description</label>
              <Field
                as="textarea"
                name="sessionDescription"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Describe the session"
                onChange={(e) => {
                  setFieldValue("sessionDescription", e.target.value);
                  setFormModified(true);
                }}
              />
              <ErrorMessage name="sessionDescription" component="div" className="text-red-500 text-xs" />
            </div>

            <div>
              <label className="block text-md font-semibold text-gray-800 mb-2">Available Time Slots</label>
              {values.availableTimeSlots.map((slot, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 items-center mb-2">
                  <Field
                    type="date"
                    name={`availableTimeSlots[${index}].date`}
                    min={formatDate(tomorrow)}
                    max={formatDate(next7Days)}
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    onChange={() => setFormModified(true)}
                  />
                  <Field
                    as="select"
                    name={`availableTimeSlots[${index}].timeSlot`}
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    onChange={() => setFormModified(true)}
                  >
                    {timeSlots.map((time, timeIndex) => (
                      <option key={timeIndex} value={time}>
                        {time}
                      </option>
                    ))}
                  </Field>
                  <button
                    type="button"
                    onClick={() => removeTimeSlot(index, values.availableTimeSlots, setFieldValue)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addTimeSlot(values.availableTimeSlots, setFieldValue)}
                className="block w-2/5 px-3 py-2 mt-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
              >
                Add Time Slot
              </button>
              <ErrorMessage name="availableTimeSlots" component="div" className="text-red-500 text-xs" />
            </div>

            <div className="flex justify-end space-x-6">
              <button
                type="submit"
                className={`px-6 py-2 bg-teal-600 text-white rounded-md ${isSubmitting || !formModified ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-700'}`}
                disabled={isSubmitting || !formModified}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                onClick={() => handleCancel(resetForm)}
              >
                Reset
              </button>
            </div>

            {errorMessage && <div className="text-red-500 text-xs">{errorMessage}</div>}
          </Form>
        )}
      </Formik>
      <ToastContainer />  {/*Add ToastContainer */}
    </div>
    <Footer/>
    </div>
  );
};

export default RegisterCoachProfileForm;
