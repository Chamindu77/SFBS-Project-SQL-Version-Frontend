import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CoachProfileForm = ({ coachData = {}, onCancel }) => {
  const navigate = useNavigate();

  const defaultData = {
    coachName: '',
    coachLevel: '',
    coachingSport: '',
    coachPrice: {
      individualSessionPrice: '',
      groupSessionPrice: ''
    },
    availableTimeSlots: [],
    experience: '',
    offerSessions: [],
    sessionDescription: '',
    coachImage: ''
  };

  const [formData, setFormData] = useState({ ...defaultData, ...coachData });
  const [initialData] = useState({ ...defaultData, ...coachData });
  const [imagePreview, setImagePreview] = useState(formData.coachImage || '');
  const [formModified, setFormModified] = useState(false);
  const [timeSlotsFromBackend, setTimeSlotsFromBackend] = useState([]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormModified(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, coachImage: file });
      setImagePreview(URL.createObjectURL(file));
      setFormModified(true);
    }
  };

  const handleImageDelete = () => {
    setFormData({ ...formData, coachImage: '' });
    setImagePreview('');
    setFormModified(true);
  };

  const handleSessionSelection = (session) => {
    const updatedSessions = [...formData.offerSessions];
    if (updatedSessions.includes(session)) {
      setFormData({
        ...formData,
        offerSessions: updatedSessions.filter((s) => s !== session),
        coachPrice: {
          ...formData.coachPrice,
          [session === "Individual Session" ? 'individualSessionPrice' : 'groupSessionPrice']: ''
        }
      });
    } else {
      setFormData({ ...formData, offerSessions: [...updatedSessions, session] });
    }
    setFormModified(true);
  };

  const handlePriceChange = (e, type) => {
    setFormData({
      ...formData,
      coachPrice: { ...formData.coachPrice, [type]: e.target.value }
    });
    setFormModified(true);
  };

  const handleTimeSlotChange = (index, field, value) => {
    const updatedSlots = [...formData.availableTimeSlots];
    updatedSlots[index][field] = value;
    setFormData({ ...formData, availableTimeSlots: updatedSlots });
    setFormModified(true);
  };

  useEffect(() => {
    const fetchCoachProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        let id = null;
        if (token) {
          const decodedToken = jwtDecode(token);
          id = decodedToken.id;
        }

        const response = await axios.get(`http://localhost:5000/api/v1/coach-profile/coach/${id}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });

        const data = response.data;
console.log("get response data",data);
        setFormData({
          CoachProfileId: data.coachProfileId,    
          coachName: data.coachName,
          coachLevel: data.coachLevel,
          coachingSport: data.coachingSport,
          coachPrice: {
            individualSessionPrice: data.coachPrice.individualSessionPrice || '',
            groupSessionPrice: data.coachPrice.groupSessionPrice || ''
          },
          availableTimeSlots: data.availableTimeSlots.map(slot => ({
            date: new Date(slot.date).toISOString().split('T')[0],
            timeSlot: slot.timeSlot
          })),
          experience: data.experience,
          offerSessions: data.offerSessions,
          sessionDescription: data.sessionDescription,
          coachImage: data.image
        });

        setTimeSlotsFromBackend(data.availableTimeSlots);

        if (data.image) {
          setImagePreview(data.image);
        }
      } catch (error) {
        console.error('Error fetching coach profile:', error);
        toast.error('Error fetching coach profile');
      }
    };

    fetchCoachProfile();
  }, []);

  const addTimeSlot = () => {
    const totalSlots = formData.availableTimeSlots.length + timeSlotsFromBackend.length;
    if (totalSlots >= 5) {
      toast.error('You can only add up to 5 time slots.');
      return;
    }

    setFormData({
      ...formData,
      availableTimeSlots: [
        ...formData.availableTimeSlots,
        { date: formatDate(tomorrow), timeSlot: timeSlots[0] }
      ]
    });
    setFormModified(true);
  };

  const removeTimeSlot = (index) => {
    const updatedSlots = formData.availableTimeSlots.filter((_, i) => i !== index);
    setFormData({ ...formData, availableTimeSlots: updatedSlots });
    setFormModified(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      //console.log("updateProfile",formData.CoachProfileId);
      const updateProfileResponse = await axios.put(
        `http://localhost:5000/api/v1/coach-profile/${formData.CoachProfileId}`,
        formData,
        { headers: { 'x-auth-token': token } }

      );
      
      console.log('Profile updated:', updateProfileResponse.data);
      

      if (formData.coachImage && typeof formData.coachImage !== 'string') {
        const formDataImage = new FormData();
        formDataImage.append('image', formData.coachImage);

        const imageUploadResponse = await axios.put(
          `http://localhost:5000/api/v1/coach-profile/update-image/${formData.CoachProfileId}`,
          formDataImage,
          {
            headers: {
              'x-auth-token': token,
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        console.log('Image uploaded:', imageUploadResponse.data);
      }

      toast.success('Profile updated successfully!');
       setFormModified(false);
      //  navigate('/');
    } catch (error) {
      console.error('Error updating profile:', error);
      //toast.error('Failed to update the profile.');
    }
  };

  const handleCancel = () => {
    setFormData({ ...initialData });
    setImagePreview(initialData.coachImage || '' || null);
    setFormModified(false);
    navigate('/');
  };
  
  return (
    <>
    {/* <ToastContainer /> */}
      <form
        onSubmit={handleFormSubmit}
        className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-xl space-y-4"
        style={{ maxHeight: '600px', overflowY: 'auto', marginTop: '10px', marginBottom: '10px' }}  
      >
        {/* Coach Profile Section */}
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
                onClick={handleImageDelete}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-md p-2 text-xs"
              >
                X
              </button>
            </div>
          ) : (
            <label className="w-40 h-44 flex items-center justify-center bg-gray-100 text-gray-600 border border-gray-300 rounded-xl cursor-pointer shadow-md">
              <span>Upload</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          )}

          <div className="flex-1">
            <label className="block text-lg font-semibold text-gray-800 mt-4 mb-1 ml-8">Coach Name</label>
            <input
              type="text"
              name="coachName"
              value={formData.coachName || ''}
              onChange={handleInputChange}
              className="w-4/5 p-2 ml-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter coach name"
            />

            <div className="mt-3">
              <label className="block text-md font-semibold text-gray-800 mb-1 ml-8">Coach Level</label>
              <select
                name="coachLevel"
                value={formData.coachLevel || ''}
                onChange={handleInputChange}
                className="w-4/5 p-2 ml-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              >
                <option value="" disabled>Select level</option>
                {coachLevels.map((level, index) => (
                  <option key={index} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mt-2 text-md ml-8 font-semibold text-gray-800 mb-1">Coaching Sport</label>
              <input
                type="text"
                name="coachingSport"
                value={formData.coachingSport || ''}
                onChange={handleInputChange}
                className="w-4/5 p-2 ml-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter sport"
              />
            </div>
          </div>
        </div>

        {/* Coach Experience */}
        <div>
          <label className="block text-md font-semibold text-gray-800 mb-1">Coach Experience</label>
          <textarea
            name="experience"
            value={formData.experience || ''}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Describe your experience"
          />
        </div>

        {/* Coaching Sessions */}
        <div>
          <label className="block text-md font-semibold text-gray-800 mb-2">Coaching Sessions</label>
          <div className="flex space-x-8">
            {/* Individual Session */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="individualSession"
                checked={formData.offerSessions.includes("Individual Session")}
                onChange={() => handleSessionSelection("Individual Session")}
                className="mr-2"
              />
              <label htmlFor="individualSession" className="text-gray-700">Individual Session</label>
              {formData.offerSessions.includes("Individual Session") && (
                <input
                  type="number"
                  name="individualSessionPrice"
                  value={formData.coachPrice.individualSessionPrice || ''}
                  onChange={(e) => handlePriceChange(e, 'individualSessionPrice')}
                  placeholder="Price"
                  className="ml-4 p-2 border border-gray-300 rounded-md w-24 focus:ring-2 focus:ring-indigo-500"
                />
              )}
            </div>

            {/* Group Session */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="groupSession"
                checked={formData.offerSessions.includes("Group Session")}
                onChange={() => handleSessionSelection("Group Session")}
                className="mr-2"
              />
              <label htmlFor="groupSession" className="text-gray-700">Group Session</label>
              {formData.offerSessions.includes("Group Session") && (
                <input
                  type="number"
                  name="groupSessionPrice"
                  value={formData.coachPrice.groupSessionPrice || ''}
                  onChange={(e) => handlePriceChange(e, 'groupSessionPrice')}
                  placeholder="Price"
                  className="ml-4 p-2 border border-gray-300 rounded-md w-24 focus:ring-2 focus:ring-indigo-500"
                />
              )}
            </div>
          </div>
        </div>

        {/* Session Description */}
        <div>
          <label className="block text-md font-semibold text-gray-800 mb-1">Session Description</label>
          <textarea
            name="sessionDescription"
            value={formData.sessionDescription || ''}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            placeholder="Describe the session"
          />
        </div>

        {/* Available Time Slots */}
        <div>
          <label className="block text-md font-semibold text-gray-800 mb-2">Available Time Slots</label>
          {formData.availableTimeSlots.map((slot, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 items-center mb-2">
              <input
                type="date"
                min={formatDate(tomorrow)}
                max={formatDate(next7Days)}
                value={slot.date}
                onChange={(e) => handleTimeSlotChange(index, 'date', e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
              <select
                value={slot.timeSlot}
                onChange={(e) => handleTimeSlotChange(index, 'timeSlot', e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              >
                {timeSlots.map((time, timeIndex) => (
                  <option key={timeIndex} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeTimeSlot(index)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addTimeSlot}
            className="block w-2/5 px-3 py-2 mt-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          >
            Add Time Slot
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-6">
          <button
            type="submit"
            className={`px-6 py-2 bg-teal-600 text-white rounded-md ${formModified ? 'hover:bg-teal-700' : 'opacity-50 cursor-not-allowed'}`}
            disabled={!formModified}
          >
            Update
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            onClick={handleCancel}
          >
            Reset
          </button>
        </div>
      </form>
      {/* <ToastContainer />   Toast Container for notifications */}
    </>
  );
};

export default CoachProfileForm;
