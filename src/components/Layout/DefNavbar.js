import React, {  useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use Link for navigation
import logo from '../../assets/image-navbar.png';
//import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const DefNavbar = () => {
    //const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            //setIsServicesDropdownOpen(false);
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
                    <li>
                        <Link to="/" className="text-gray-800 font-bold hover:text-custom-hover">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="text-gray-800 font-bold hover:text-custom-hover">
                            About Us
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => navigate('/login')}
                    className="py-1 px-2 rounded-full border border-custom-hover bg-white text-black font-bold hover:bg-custom-hover hover:text-slate-100"
                >
                    Login
                </button>
                <button
                    onClick={() => navigate('/register')}
                    className="py-1 mr-10 px-2 rounded-full border border-custom-hover bg-white text-black font-bold hover:bg-custom-hover hover:text-slate-100"
                >
                    Sign Up
                </button>
            </div>
        </nav>
    );
};

export default DefNavbar;

