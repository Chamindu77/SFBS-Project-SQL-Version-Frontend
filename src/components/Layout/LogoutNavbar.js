import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { useNavigate, Link } from 'react-router-dom'; 
import logo from '../../assets/image-navbar.png';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; 

const LogoutNavbar = ({ logout }) => {
    const navigate = useNavigate();
    const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
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
    }, []);

    return (
        <nav className="bg-slate-100 p-2 border-b-2 border-gray-300 flex items-center justify-between">
            <div className="flex items-center">
                <img src={logo} alt="Dream Sport Logo" className="h-10 ml-10 mb-0" />
                <ul className="list-none flex gap-8 ml-10 p-0">
                    <li><Link to="/" className="text-gray-800 font-bold hover:text-custom-hover">Home</Link></li>
                    <li className="relative" ref={dropdownRef}>
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                        >
                            <span className="text-gray-800 font-bold">Services</span>
                            {isServicesDropdownOpen ? (
                                <FaChevronUp className="ml-1.5 mt-1.5 text-xs text-gray-800" />
                            ) : (
                                <FaChevronDown className="ml-1.5 mt-1.5 text-xs text-gray-800" />
                            )}
                        </div>
                        {isServicesDropdownOpen && (
                            <ul className="absolute left-0 mt-2 bg-white border rounded shadow-lg p-2 z-10">
                                <li><Link to="/sportcategory" className="block px-4 py-2 text-gray-800 hover:text-custom-hover hover:bg-gray-100">Facility</Link></li>
                                <li><Link to="/equipment" className="block px-4 py-2 text-gray-800 hover:text-custom-hover hover:bg-gray-100">Equipment</Link></li>
                                <li><Link to="/coach-page" className="block px-4 py-2 text-gray-800 hover:text-custom-hover hover:bg-gray-100">Coaches</Link></li>
                            </ul>
                        )}
                    </li>
                    <li><Link to="/session-request-details" className="text-gray-800 font-bold hover:text-custom-hover">My Sessions</Link></li>
                    <li><Link to="/about" className="text-gray-800 font-bold hover:text-custom-hover">About Us</Link></li>
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

export default connect(null, { logout })(LogoutNavbar);
