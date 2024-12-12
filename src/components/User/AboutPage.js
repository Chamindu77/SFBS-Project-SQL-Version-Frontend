import React, { useEffect } from 'react'
import Navbar from '../Layout/Navbar'
import LogoutNavbar from '../Layout/LogoutNavbar'
import Footer from '../Layout/Footer'
import backgroundImage from '../../assets/about2.jpg'
import teamImage from '../../assets/team.jpg'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { jwtDecode } from 'jwt-decode';
import CoachNavbar from '../Layout/CoachNavbar';
import CoachLogoutNavbar from '../Layout/CoachLogoutNavbar';
import DefNavbar from '../Layout/DefNavbar';


const AboutPage = () => {
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
        AOS.init({ duration: 1000, once: true })
    }, [])

    return (
        <div>
            {/* Navbar based on role */}
            {role === 'User' && (isLoggedIn ? <LogoutNavbar /> : <Navbar />)}
            {role === 'Coach' && (isLoggedIn ? <CoachLogoutNavbar /> : <CoachNavbar />)}
            {!role && <DefNavbar />} {/* Default Navbar if no role is found */}
            <div className="font-sans ">
                {/* Hero Section */}
                <div className="relative h-screen bg-slate-100 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
                    <div className="relative bg-top  flex flex-col justify-center items-center h-full text-center text-white px-4" data-aos="fade-in">
                        <h1 className="text-6xl text-sky-400 font-bold mb-4">
                            About Dream Sport
                        </h1>
                        <p className="text-xl text-slate-200 max-w-2xl">
                            We provide top-notch sports facilities and coaching, empowering athletes of all levels to achieve their goals. Our platform makes it easy to book the perfect venue, gear, and support for your next game.
                        </p>
                    </div>
                </div>

                {/* Company Mission Section */}
                <div className="py-16 px-8 md:px-16 lg:px-32 bg-slate-200">
                    <div className="text-center mb-12 " data-aos="fade-up">
                        <h2 className="text-5xl font-bold text-gray-900">Our <spam className="text-yellow-600">Mission</spam></h2>
                        <p className="text-lg text-black max-w-3xl mx-auto mt-4 leading-relaxed">
                            Our mission is to make sports and fitness more accessible by providing world-class facilities and expert coaching for everyone. Whether you are a seasoned athlete or just starting out, Dream Sport is committed to helping you perform at your best.
                        </p>
                    </div>

                    {/* Three Pillars of Service */}
                    <div className="flex flex-col lg:flex-row lg:space-x-12 items-center justify-center ">
                        <div className="lg:w-1/3 mb-12 lg:mb-0" data-aos="fade-up" data-aos-delay="100">
                            <h3 className="text-2xl font-bold text-black mb-4">Top-Quality <spam className="text-yellow-600">Facilities</spam></h3>
                            <p className="text-gray-600 leading-relaxed">
                                We offer premium sports facilities equipped with the latest gear and maintained to the highest standards, ensuring that you have the best environment to train, play, and compete.
                            </p>
                        </div>
                        <div className="lg:w-1/3 mb-12 lg:mb-0" data-aos="fade-up" data-aos-delay="200">
                            <h3 className="text-2xl font-bold text-black mb-4">Expert <spam className="text-yellow-600">Coaching</spam></h3>
                            <p className="text-gray-600 leading-relaxed">
                                Our certified coaches bring years of experience to guide athletes of all levels. Whether you are looking to improve your technique or train for a competition, we have the right support for you.
                            </p>
                        </div>
                        <div className="lg:w-1/3 mb-12 lg:mb-0" data-aos="fade-up" data-aos-delay="300">
                            <h3 className="text-2xl font-bold text-black mb-4">Easy <spam className="text-yellow-600">Booking & Rentals</spam></h3>
                            <p className="text-gray-600 leading-relaxed">
                                We make booking easy. Our intuitive platform allows you to reserve sports facilities, rent gear, and schedule coaching sessions with just a few clicks. Start your adventure today.                            </p>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="py-16 px-8 md:px-16 lg:px-32 bg-white">
                    <div className="flex flex-col lg:flex-row lg:space-x-12 items-center">
                        {/* Team Image */}
                        <div className="lg:w-1/2 mb-12 lg:mb-0" data-aos="fade-right">
                            <div className="overflow-hidden shadow-xl rounded-lg transform hover:scale-105 transition duration-500 ease-in-out">
                                <img
                                    src={teamImage}
                                    alt="Our Team"
                                    className="w-full h-auto object-cover rounded-lg"
                                    style={{ aspectRatio: '3 / 2' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
                            </div>
                        </div>

                        {/* Team Description */}
                        <div className="lg:w-1/2 text-left" data-aos="fade-left">
                            <h3 className="text-4xl font-bold text-gray-900 mb-6">Meet Our <spam className="text-yellow-600">Team</spam></h3>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                At Dream Sport, our team is passionate about sports and fitness. Comprised of experienced professionals, coaches, and enthusiasts, we work together to provide the best possible experience for our users. Our team is here to help you achieve your goals and unlock your full potential.
                            </p>
                            <a
                                href="/team"
                                className="inline-block bg-blue-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
                            >
                                Learn More About Us
                            </a>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="bg-white py-16 px-8 md:px-16 lg:px-32">
                    <div className="text-center mb-12" data-aos="fade-up">
                        <h2 className="text-4xl flex-center font-bold text-gray-900 mb-2">Our Core <spam className="text-yellow-600">Values</spam></h2>
                        <p className="text-xl flex-center max-w-fit mx-auto">
                            We are dedicated to delivering top-quality service, fostering inclusivity,
                        </p>
                        <p className="text-xl flex-center max-w-fit mx-auto">
                            and maintaining integrity in every interaction.
                        </p>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: 'Excellence', description: 'We strive for excellence in every aspect of our service, from facilities to customer support.' },
                            { title: 'Inclusivity', description: 'We believe sports are for everyone, and we aim to make our services accessible to people of all backgrounds and skill levels.' },
                            { title: 'Integrity', description: 'We are committed to transparency and honesty in all our interactions and transactions.' }
                        ].map((value, index) => (
                            <div key={index} className="bg-white shadow-md hover:shadow-lg rounded-lg p-8 transition duration-300 hover:scale-105" data-aos="fade-up" data-aos-delay={index * 100}>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call-to-Action Section */}
                <div className="bg-slate-200 py-16 px-8 md:px-16 lg:px-32 text-center text-black">
                    <h2 className="text-4xl font-bold mb-4" data-aos="fade-up">Ready to Elevate  <spam className="text-yellow-600">Your Game?</spam></h2>
                    <p className="text-lg max-w-3xl mx-auto mb-8" data-aos="fade-up">
                        Join Dream Sport today and take your performance to the next level. Whether you're booking a facility, renting equipment, or signing up for coaching sessions, we're here to help you succeed.
                    </p>
                    <a
                        href="/"
                        className="bg-teal-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-teal-700 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-gray-400"
                        data-aos="fade-up"
                    >
                        Get Started Now
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AboutPage

