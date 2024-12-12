import React, { useState } from 'react';
import { renderRatingStars } from '../Shared/renderStars';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';

const BookingDetailsModal = ({ booking, onClose }) => {
    const [receiptFile, setReceiptFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [validationError, setValidationError] = useState('');

    const receiptFileSchema = yup.object().shape({
        receipt: yup
            .mixed()
            .required('Please upload a receipt.')
            .test('fileSize', 'File size is too large', (value) => {
                return value && value.size <= 5 * 1024 * 1024; 
            })
            .test('fileType', 'Unsupported file format', (value) => {
                return (
                    value &&
                    ['application/pdf', 'image/jpeg', 'image/png'].includes(value.type)
                );
            }),
    });

    const handleReceiptChange = (e) => {
        setReceiptFile(e.target.files[0]);
        setValidationError('');
    };

    const validateReceiptFile = async () => {
        try {
            await receiptFileSchema.validate({ receipt: receiptFile });
            setValidationError('');
            return true;
        } catch (err) {
            setValidationError(err.message);
            return false;
        }
    };
    console.log(booking.id);
    const handleReceiptSubmit = async () => {
        const isValid = await validateReceiptFile();
        if (!isValid) return;

        if (!booking?.id) {
            toast.error('Booking ID is missing!');
            return;
        }

        const formData = new FormData();
        formData.append('receipt', receiptFile);

        try {
            setIsSubmitting(true);

            const response = await fetch(`http://localhost:5000/api/v1/session/upload-receipt/${booking.id}`, {
                method: 'POST',
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                     
                },
                body: formData,
            });

            const data = await response.text();

            if (response.ok) {
                toast.success(`Receipt submitted successfully!`);
            } else {
                toast.error(`Failed to submit receipt: ${data}`);
            }
        } catch (error) {
            console.error('Error submitting receipt:', error);
            toast.error('An error occurred while submitting the receipt.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBookingSubmit = async () => {
        if (!booking?.id) {
            toast.error('Booking ID is missing!');
            return;
        }
    
        try {
            setIsBooking(true);
    
            // Book the session
            const response = await fetch('http://localhost:5000/api/v1/session/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify({ sessionRequestId: booking.id }),
            });
    
            const data = await response.json();
    
            if (response.ok && data) {
                
                toast.success('Session booked successfully!');
    
                // After successful booking, update the status to "Booked"
                const statusResponse = await fetch(`http://localhost:5000/api/v1/session/respond/${booking.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('token'),
                    },
                    body: JSON.stringify({ status: 'Booked' }),
                });
    
                if (statusResponse.ok) {
                    
                    
                } else {
                    toast.error('Failed to update booking status.');
                }
    
                setTimeout(() => {
                    onClose();
                    window.location.reload(); 
                }, 2000); 
            } else {
                // toast.error(`Please Upload a Receipt`);
                const errorMessage = data?.msg || data?.message || 'An unknown error occurred.';
                toast.error(`${errorMessage}`);
            }
    
        } catch (error) {
            console.error('Error booking session:', error);
            toast.error('An error occurred while booking the session.');
        } finally {
            setIsBooking(false);
        }
    };
    
    
    

    if (!booking) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-2xl p-4 w-full max-w-xl relative">
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h2 className="text-3xl font-semibold text-gray-900 text-center mb-2">Booking Details</h2>

                <div className="space-y-2">
                    <div className="lg:flex lg:justify-between lg:items-start space-y-6 lg:space-y-0">
                        <div className="flex flex-col mt-2 items-center text-center">
                            <img
                                src={booking.coachImage || 'https://via.placeholder.com/150'}
                                alt={booking.coachName}
                                className="w-44 h-44 rounded-full border-4 border-gray-200 object-cover"
                            />
                            <div className="flex-1 lg:pl-08 text-center">
                                <h3 className="text-2xl font-semibold text-gray-800">{booking.coachName}</h3>
                                <p className="text-lg mt-0 text-teal-600">{booking.coachLevel}</p>
                                <p className="text-base text-gray-500">{booking.sportName}</p>
                                <div className="flex ml-8 mt-2">
                                    {renderRatingStars(booking.avgRating)}
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 lg:pl-12">
                            <div className="mt-4 space-y-2">
                                <p className="text-base text-gray-700">{booking.userName || 'N/A'}</p>
                                <p className="text-base text-gray-700">{booking.userEmail || 'N/A'}</p>
                                <p className="text-base text-gray-700">{booking.userPhone || 'N/A'}</p>
                            </div>
                            <div className="space-y-2 mt-2 text-gray-700">
                                <p className="text-base text-gray-700">{booking.sessionType}</p>
                                <p className="text-base text-gray-700">Rs. {booking.sessionFee}/=</p>
                                {/* <p className="text-base text-gray-700">{booking.courtNo}/=</p> */}
                                <div className="text-normal text-gray-500 space-y-1">
                                    {booking.requestedTimeSlots.map(slot => (
                                        <p key={slot._id}>
                                            {new Date(slot.date).toLocaleDateString()} - {slot.timeSlot}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-lg flex-1">
                                <h4 className="text-base font-semibold text-gray-800 mt-4 mb-2">Submit Payment Receipt</h4>

                                <input
                                    type="file"
                                    accept="image/*,.pdf"
                                    onChange={handleReceiptChange}
                                    className="block w-full text-sm text-gray-600 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 focus:outline-none"
                                />

                                {validationError && (
                                    <p className="text-red-600 text-xs ">{validationError}</p>
                                )}

                                <button
                                    className={`mt-4 max-w-36 px-4 py-2 text-sm font-medium rounded-lg transition duration-200 focus:outline-none ${isSubmitting ? 'bg-gray-400' : 'bg-teal-700 hover:bg-teal-900'} text-white`}
                                    onClick={handleReceiptSubmit}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Receipt'}
                                </button>

                                <button
                                    className={`mt-4 ml-4 max-w-36 px-4 py-2 text-sm font-medium rounded-lg transition duration-200 focus:outline-none ${isBooking ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-700'} text-white`}
                                    onClick={handleBookingSubmit}
                                    disabled={isBooking}
                                >
                                    {isBooking ? 'Booking...' : 'Book Now'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetailsModal;