
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import logo from '../../assets/image-navbar.png';

const AdminNavbar = ({ logout }) => {
    const navigate = useNavigate();
    const [setIsServicesDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); 

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsServicesDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    return (
        <nav className="bg-slate-100 p-2 border-b-2 border-gray-300 flex items-center justify-between">
            <div className="flex items-center">
                <img src={logo} alt="Dream Sport Logo" className="h-10 ml-10 mb-0" />
                <ul className="list-none flex gap-8 ml-10 p-0">
                    <li><Link to="/user-managment" className="text-gray-800 font-bold hover:text-custom-hover">Users</Link></li>
                    <li><Link to="/Coaches-managment" className="text-gray-800 font-bold hover:text-custom-hover">CoachProfiles</Link></li>
                    <li><Link to="/facility-managment" className="text-gray-800 font-bold hover:text-custom-hover">Facility</Link></li>
                    <li><Link to="/equipment-managment" className="text-gray-800 font-bold hover:text-custom-hover">Equipment</Link></li>
                    <li><Link to="/admin/facility-bookings" className="text-gray-800 font-bold hover:text-custom-hover">Facility Bookings</Link></li>
                    <li><Link to="/admin/equipment-bookings" className="text-gray-800 font-bold hover:text-custom-hover">equipment Bookings</Link></li>
                    <li><Link to="/admin/session-bookings" className="text-gray-800 font-bold hover:text-custom-hover">Session Bookings</Link></li>

                    {/* <li><Link to="/contact" className="text-gray-800 font-bold hover:text-custom-hover">Contact Us</Link></li> */}
                </ul>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={handleLogout}
                    className="py-1 mr-10 px-2 rounded-full border border-custom-hover bg-white text-black font-bold hover:bg-custom-hover hover:text-slate-100"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default connect(null, { logout })(AdminNavbar);
