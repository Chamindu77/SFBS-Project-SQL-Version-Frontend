
// import React, { useState, useEffect, useRef } from 'react';
// import { connect } from 'react-redux';
// import { logout } from '../../redux/actions/authActions';
// import { useNavigate, Link } from 'react-router-dom';
// import logo from '../../assets/image-navbar.png';
// import { FaChevronDown, FaChevronUp, FaUserCircle } from 'react-icons/fa';
// import CoachProfileForm from '../CoachDetails/CoachProfileDetails';
// import Modal from '../CoachDetails/Modal';  // Import the Modal component

// const LogoutNavbar = ({ logout }) => {
//     const navigate = useNavigate();
//     const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
//     const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//     const [isCoachProfileModalOpen, setIsCoachProfileModalOpen] = useState(false); // State for modal
//     const dropdownRef = useRef(null);
//     const profileDropdownRef = useRef(null);

//     const handleLogout = () => {
//         logout();
//         navigate('/login');
//     };

//     const handleClickOutside = (event) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//             setIsServicesDropdownOpen(false);
//         }
//         if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
//             setIsProfileDropdownOpen(false);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     return (
//         <>
//             <nav className="bg-slate-100 p-2 border-b-2 border-gray-300 flex items-center justify-between">
//                 <div className="flex items-center">
//                     <img src={logo} alt="Dream Sport Logo" className="h-10 ml-10 mb-0" />
//                     <ul className="list-none flex gap-8 ml-10 p-0">
//                         <li><Link to="/" className="text-gray-800 font-bold hover:text-custom-hover">Home</Link></li>
//                         <li className="relative" ref={dropdownRef}>
//                             <div
//                                 className="flex items-center cursor-pointer"
//                                 onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
//                             >
//                                 <span className="text-gray-800 font-bold">Session</span>
//                                 {isServicesDropdownOpen ? (
//                                     <FaChevronUp className="ml-1.5 mt-1.5 text-xs text-gray-800" />
//                                 ) : (
//                                     <FaChevronDown className="ml-1.5 mt-1.5 text-xs text-gray-800" />
//                                 )}
//                             </div>
//                             {isServicesDropdownOpen && (
//                                 <ul className="absolute left-0 mt-2 bg-white border rounded shadow-lg p-2 z-10">
//                                     <li><Link to="/coach-view-request" className="block px-4 py-2 text-gray-800 hover:text-custom-hover hover:bg-gray-100">Request</Link></li>
//                                     <li><Link to="/coach-view-booked-request" className="block px-4 py-2 text-gray-800 hover:text-custom-hover hover:bg-gray-100">Booked</Link></li>
//                                 </ul>
//                             )}
//                         </li>
//                         <li><Link to="/sportcategory" className="text-gray-800 font-bold hover:text-custom-hover">Facility</Link></li>
//                         <li><Link to="/equipment" className="text-gray-800 font-bold hover:text-custom-hover">Equipment</Link></li>
//                         <li><Link to="/about" className="text-gray-800 font-bold hover:text-custom-hover">About Us</Link></li>
//                     </ul>
//                 </div>
//                 <div className="flex gap-4 items-center">
//                     {/* <div className="relative" ref={profileDropdownRef}>
//                         <button
//                             onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
//                             className="flex items-center px-2 py-1 rounded-full hover:bg-gray-200"
//                         >
//                             <FaUserCircle className="text-3xl text-black" />
//                         </button>
//                         {isProfileDropdownOpen && (
//                             <ul className="absolute right-0 mt-2 bg-white border rounded shadow-lg p-2 z-10">
//                                 <li><Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">View Profile</Link></li>
//                                 <li>
//                                     <button
//                                         className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
//                                         onClick={() => setIsCoachProfileModalOpen(true)} // Open Modal
//                                     >
//                                         Settings
//                                     </button>
//                                 </li>
//                             </ul>
//                         )}
//                     </div> */}

//                     <div className="flex gap-4 items-center">
//                         {/* User Profile Icon Button that triggers the Settings Modal */}
//                         <button
//                             onClick={() => setIsCoachProfileModalOpen(true)} // Open the settings modal on click
//                             className="flex items-center px-2 py-1 rounded-full hover:bg-gray-200"
//                         >
//                             <FaUserCircle className="text-3xl text-black" />
//                         </button>
//                     </div>


//                     <button
//                         onClick={handleLogout}
//                         className="py-1 px-2 mr-10 rounded-full border border-custom-hover bg-white text-black font-bold hover:bg-custom-hover hover:text-slate-100"
//                     >
//                         Logout
//                     </button>
//                 </div>
//             </nav>

//             {/* Modal for CoachProfileForm */}
//             <Modal isVisible={isCoachProfileModalOpen} onClose={() => setIsCoachProfileModalOpen(false)}>
//                 <CoachProfileForm onUpdate={(data) => console.log('Updated Data:', data)} onCancel={() => setIsCoachProfileModalOpen(false)} />
//             </Modal>
//         </>
//     );
// };

// export default connect(null, { logout })(LogoutNavbar);


import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/image-navbar.png';
import { FaChevronDown, FaChevronUp, FaUserCircle } from 'react-icons/fa';
import CoachProfileForm from '../CoachDetails/CoachProfileDetails';
import Modal from '../CoachDetails/Modal';  // Import the Modal component

const LogoutNavbar = ({ logout }) => {
    const navigate = useNavigate();
    const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
    const [isCoachProfileModalOpen, setIsCoachProfileModalOpen] = useState(false); // State for modal
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
        <>
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
                                <span className="text-gray-800 font-bold">Session</span>
                                {isServicesDropdownOpen ? (
                                    <FaChevronUp className="ml-1.5 mt-1.5 text-xs text-gray-800" />
                                ) : (
                                    <FaChevronDown className="ml-1.5 mt-1.5 text-xs text-gray-800" />
                                )}
                            </div>
                            {isServicesDropdownOpen && (
                                <ul className="absolute left-0 mt-2 bg-white border rounded shadow-lg p-2 z-10">
                                    <li><Link to="/coach-view-request" className="block px-4 py-2 text-gray-800 hover:text-custom-hover hover:bg-gray-100">Request</Link></li>
                                    <li><Link to="/coach-view-booked-request" className="block px-4 py-2 text-gray-800 hover:text-custom-hover hover:bg-gray-100">Booked</Link></li>
                                </ul>
                            )}
                        </li>
                        <li><Link to="/sportcategory" className="text-gray-800 font-bold hover:text-custom-hover">Facility</Link></li>
                        <li><Link to="/equipment" className="text-gray-800 font-bold hover:text-custom-hover">Equipment</Link></li>
                        <li><Link to="/about" className="text-gray-800 font-bold hover:text-custom-hover">About Us</Link></li>
                    </ul>
                </div>
                <div className="flex gap-4 items-center">
                    {/* User Profile Icon Button that triggers the Settings Modal */}
                    <button
                        onClick={() => setIsCoachProfileModalOpen(true)} // Open the settings modal on click
                        className="flex items-center px-2 py-1 rounded-full hover:bg-gray-200"
                    >
                        <FaUserCircle className="text-3xl text-neutral-600" />
                    </button>

                    <button
                        onClick={handleLogout}
                        className="py-1 px-2 mr-10 rounded-full border border-custom-hover bg-white text-black font-bold hover:bg-custom-hover hover:text-slate-100"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Modal for CoachProfileForm */}
            <Modal isVisible={isCoachProfileModalOpen} onClose={() => setIsCoachProfileModalOpen(false)}>
                <CoachProfileForm onUpdate={(data) => console.log('Updated Data:', data)} onCancel={() => setIsCoachProfileModalOpen(false)} />
            </Modal>
        </>
    );
};

export default connect(null, { logout })(LogoutNavbar);
