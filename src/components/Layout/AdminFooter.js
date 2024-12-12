import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';  // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS

const Footer = () => {
    const [email, setEmail] = useState('');

    // Function to handle form submission and show toast
    const handleSubscribe = (e) => {
        e.preventDefault();  // Prevent page reload
        if (email) {
            toast.success('Subscribed successfully!');  // Show success toast
            setEmail('');  // Reset email field after submission
        } else {
            toast.error('Please enter a valid email address!');  // Show error if email is empty
        }
    };

    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-slate-200">Dreamsport Services</h3>
                        <ul className="space-y-2">
                            <li className=" text-slate-300">Facility Booking </li>
                            <li className=" text-slate-300">Equipment Booking</li>
                            <li className=" text-slate-300">Session Booking</li>
                            <li className=" text-slate-300">Coaches Booking</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-slate-200">Admin Pages</h3>
                        <ul className="space-y-2">
                            <li><Link to="/user-managment" className="hover:underline text-slate-300">Users Management</Link></li>
                            <li><Link to="/Coaches-managment" className="hover:underline text-slate-300">Coaches Management</Link></li>
                            <li><Link to="/facility-managment" className="hover:underline text-slate-300">Facility Management</Link></li>
                            <li><Link to="/equipment-managment" className="hover:underline text-slate-300">Equipment Management</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg text-slate-200 font-semibold mb-3">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="text-slate-300">Galle, Sri Lanka</li>
                            <li><a href="mailto:info@dreamsport.com" className='text-slate-300'>info@dreamsport.com</a></li>
                            <li className="text-slate-300">077 123 4567</li>
                            <li className="text-slate-300">077 123 4567</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-1 text-slate-200">Subscribe</h3>
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center mb-4 mt-2">
                            <input 
                                type="email" 
                                placeholder="Enter your email address" 
                                className="px-4 py-2 sm:mb-0 sm:mr-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 text-gray-800 w-full sm:w-auto"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  // Update email state
                            />
                            <button 
                                type="submit" 
                                className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800 w-full sm:w-auto"
                            >
                                Subscribe
                            </button>
                        </form>
                        <h3 className="text-lg font-semibold mt-4 text-slate-200">Follow Us</h3>
                        <div className="flex space-x-4 text-xl mt-2">
                            <a href="https://www.facebook.com" className="hover:text-teal-500">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://twitter.com" className="hover:text-teal-500">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="https://www.google.com" className="hover:text-teal-500">
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="https://www.instagram.com" className="hover:text-teal-500">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://www.linkedin.com" className="hover:text-teal-500">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-6 text-center">
                    <p className="text-sm text-slate-200">&copy; 2024 Dream Sport. All rights reserved.</p>
                </div>
            </div>

            {/* ToastContainer to show toast notifications */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </footer>
    );
};

export default Footer;
