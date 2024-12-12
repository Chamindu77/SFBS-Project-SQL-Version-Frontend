import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import LogoutNavbar from '../Layout/LogoutNavbar';
import backgroundImage from '../../assets/image-homepage.jpg';
import coachingImage from '../../assets/coaches.jpg';
import facilityImage from '../../assets/facility.jpg';
import equipmentImage from '../../assets/equipment.jpg';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import { FaRunning, FaBasketballBall, FaChalkboardTeacher } from 'react-icons/fa';
import AOS from 'aos';
import { jwtDecode } from 'jwt-decode';
import CoachNavbar from '../Layout/CoachNavbar';
import CoachLogoutNavbar from '../Layout/CoachLogoutNavbar';
import 'aos/dist/aos.css';
import DefNavbar from '../Layout/DefNavbar';


const HomePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  let role = null;
  if (isLoggedIn && token) {
    try {
      const decodedToken = jwtDecode(token);
      role = decodedToken.role;
    } catch (error) {
      console.error('Error decoding token', error);
    }
  }

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="font-sans">
      {/* Navbar based on role */}
      {role === 'User' && (isLoggedIn ? <LogoutNavbar /> : <Navbar />)}
      {role === 'Coach' && (isLoggedIn ? <CoachLogoutNavbar /> : <CoachNavbar />)}
      {!role && <DefNavbar />} 
      
      {/* Hero Section */}
      <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
        <div className="relative flex flex-col justify-center items-center h-full text-center text-white px-4 animate-fadeIn">
          <h2 className="text-2xl md:text-3xl uppercase mb-4 tracking-wider font-medium text-gray-200">Premium Sports Facilities</h2>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Dream Sport Facilities Booking
          </h1>
          {isLoggedIn ? (
            <button
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 text-white font-bold py-3 px-10 rounded-full shadow-md hover:shadow-lg transition duration-300 mt-4"
              onClick={() => navigate('/about')} // Navigate to 'explore' page
            >
              Dream Sport <FaRegArrowAltCircleRight className="inline ml-2" />
            </button>
          ) : (
            <button
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 text-white font-bold py-3 px-10 rounded-full shadow-md hover:shadow-lg transition duration-300 mt-4"
              onClick={() => navigate('/register')} // Navigate to 'register' page
            >
              Register Now <FaRegArrowAltCircleRight className="inline ml-2" />
            </button>
          )}
        </div>
      </div>

      {/* Our Services Section */}
      <div className="bg-gray-200 py-10 px-8 md:px-16 lg:px-32 text-center">
        <h2 className="text-3xl font-bold" data-aos="fade-up">Explore Our <span className='text-yellow-600'>Services</span></h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mt-2 mb-6" data-aos="fade-up">
          Fostering excellence and empowering sports growth through tailored services for athletes, coaches, and enthusiasts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Facility Booking Card */}
          <div className="bg-white shadow-md hover:shadow-lg rounded-lg p-8 transition duration-300 hover:scale-105" data-aos="fade-right">
            <FaRunning className="text-6xl text-teal-600 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold mb-2">Facility Booking</h3>
            <p className="text-gray-600 mb-4">Reserve world-class athletic venues effortlessly for your sports activities.</p>
            <button className="bg-teal-600 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-teal-800">
              Learn More
            </button>
          </div>

          {/* Sport Items Rental Card */}
          <div className="bg-white shadow-md hover:shadow-lg rounded-lg p-8 transition duration-300 hover:scale-105" data-aos="fade-up">
            <FaBasketballBall className="text-6xl text-teal-600 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold mb-2">Sport Items Rental</h3>
            <p className="text-gray-600 mb-4">Lease premium athletic gear tailored to your specific requirements.</p>
            <button className="bg-teal-600 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-teal-800">
              Learn More
            </button>
          </div>

          {/* Coaching Session Booking Card */}
          <div className="bg-white shadow-md hover:shadow-lg rounded-lg p-8 transition duration-300 hover:scale-105" data-aos="fade-left">
            <FaChalkboardTeacher className="text-6xl text-teal-600 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold mb-2">Coaching Session Booking</h3>
            <p className="text-gray-600 mb-4">Book sessions with expert coaches to elevate your game.</p>
            <button className="bg-teal-600 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-teal-800">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* New Service Section */}
      <div className="bg-white py-16 px-8 md:px-16 lg:px-32">
        {/* Section Title */}
        <div className="text-center mb-8" data-aos="fade-up">
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-gray-900">
            Elevate Your <span className="text-yellow-600">Performance</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Uplift your game with our featured coaches, personalized instruction, and expertise to achieve your goals.
          </p>
        </div>

        {/* Image and Text Content */}
        <div className="flex flex-col lg:flex-row lg:space-x-12 items-center">
          {/* Image Section */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 relative" data-aos="zoom-in">
            <div className="overflow-hidden shadow-xl rounded-lg transform hover:scale-105 transition duration-500 ease-in-out">
              <img
                src={coachingImage}
                alt="Coaching Session"
                className="w-full h-auto object-cover rounded-lg"
                style={{ aspectRatio: '3 / 2' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
            </div>
          </div>

          {/* Text Section */}
          <div className="lg:w-1/2 text-left" data-aos="fade-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Coaching Sessions: Unlock Your Potential
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Elevate your game with our tailored coaching sessions, offering the support and guidance you need to excel.
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>One-on-One personalized coaching sessions</li>
              <li>Small group coaching for teamwork and collaboration</li>
              <li>Comprehensive progress tracking to monitor improvements</li>
            </ul>
            {(role !== 'Coach' || null) ?
              <Link
                to="/coach-page"
                className="inline-block bg-blue-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-4"
                data-aos="fade-up"
              >
                Book Your Session Now
              </Link>
              :
              null
            }

          </div>
        </div>
      </div>

      {/* Facility Booking Section */}
      <div className="bg-slate-200 py-16 px-8 md:px-16 lg:px-32">
        {/* Section Title */}
        <div className="text-center mb-8" data-aos="fade-up">
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-gray-900">
            Featured <span className="text-yellow-600">Facilities</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mb-8">
            Elevate your game with our top-quality facilities, personalized recommendations, and expert insights to achieve your goals.
          </p>
        </div>

        {/* Image and Text Content (Reversed layout) */}
        <div className="flex flex-col lg:flex-row lg:space-x-12 items-center">
          {/* Text Section (Left side) */}
          <div className="lg:w-1/2 text-left mb-12 lg:mb-0" data-aos="fade-right">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Facility Booking: Reserve Your Spot
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Secure the perfect venue for your activities with our easy-to-use facility booking system.
            </p>
            <Link
              to="/sportcategory"
              className="inline-block bg-teal-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-teal-700 transition duration-300 ease-in-out focus:outline-none focus:ring-4"
              data-aos="fade-up"
            >
              Book Your Facility Now
            </Link> 
          </div>

          {/* Image Section (Right side) */}
          <div className="lg:w-1/2 relative" data-aos="zoom-in">
            <div className="overflow-hidden shadow-xl rounded-lg transform hover:scale-105 transition duration-500 ease-in-out">
              <img
                src={facilityImage} 
                alt="Facility Booking"
                className="w-full h-auto object-cover rounded-lg"
                style={{ aspectRatio: '3 / 2' }} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sports Gear Rental Section */}
      <div className="bg-gray-50 py-16 px-8 md:px-16 lg:px-32">
        {/* Section Title */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-gray-900">
            Featured<span className="text-yellow-600"> Equipment </span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mb-8">
            Uplift your game with our top-quality equipment, personalized recommendations, and expert insights to achieve your goals.
          </p>
        </div>

        {/* Image and Text Content */}
        <div className="flex flex-col lg:flex-row lg:space-x-12 items-center">
          {/* Image Section (Left side) */}
          <div className="lg:w-1/2 relative mb-12 lg:mb-0" data-aos="zoom-in">
            <div className="overflow-hidden shadow-xl rounded-lg transform hover:scale-105 transition duration-500 ease-in-out">
              <img
                src={equipmentImage} 
                alt="Sports Gear Rental"
                className="w-full h-auto object-cover rounded-lg"
                style={{ aspectRatio: '3 / 2' }} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
            </div>
          </div>

          {/* Text Section (Right side) */}
          <div className="lg:w-1/2 text-left" data-aos="fade-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Rent Your Sport Items, Play Your Game
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Unlock top-quality sports equipment at prices that won’t break the bank.
            </p>
            <Link
              to="/equipment"
              className="inline-block bg-yellow-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-yellow-700 transition duration-300 ease-in-out focus:outline-none focus:ring-4"
              data-aos="fade-up"
            >
              Reserve Your Gear Now
            </Link> 
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-slate-200 py-16 px-8 md:px-16 lg:px-32 text-center">
        <h2 className="text-3xl font-bold " data-aos="fade-up">Why <span className="text-yellow-600"> Choose Us </span></h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mt-2 mb-6" data-aos="fade-up"> Elevate your experience with our unmatched service, tailored solutions, and a commitment to helping you succeed in every step of your journey.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Expert Coaching', description: 'Top-tier coaching for all levels.', icon: '🏆' },
            { title: 'State-of-the-Art Facilities', description: 'High-end equipment and venues.', icon: '🏟️' },
            { title: 'Personalized Training', description: 'Customized training programs.', icon: '📋' }
          ].map((feature, index) => (
            <div key={index} className="bg-white shadow-md hover:shadow-xl rounded-lg p-8 transform transition duration-300 hover:-translate-y-2" data-aos="flip-up">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
