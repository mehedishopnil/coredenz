import React, { useState, useContext } from 'react';
import { FaBars, FaTimes, FaFacebook, FaTwitter, FaInstagram, FaPhone, FaReact, FaUser, FaSignOutAlt, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router';
import { AuthContext } from '../../provider/AuthProvider/AuthProvider';
import logo from '../../assets/images/CoreDenz-logo.png';
import { FaX } from 'react-icons/fa6';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Laptops', href: '/laptops' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
];

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, loading } = useContext(AuthContext);

    const handleLogout = () => {
        // Implement your logout logic here
        console.log('User logged out');
        setMenuOpen(false);
    };

    return (
        <header className="w-full bg-[#03045E]  shadow-md fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
                {/* Logo */}
                <Link to="/">
                <div className="flex items-center space-x-2">
                    <img src={logo} alt="CoreDenz Logo" className="w-32 md:w-52" />
                    
                </div>
                </Link>

                {/* Nav Menu - Desktop */}
                <nav className="hidden md:flex space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className="text-gray-100 hover:text-blue-500 font-medium transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Right Side - Desktop */}
                <div className="hidden md:flex items-center space-x-6">
                    {/* Social Icons */}
                    <div className="flex items-center space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="text-gray-100 hover:text-blue-600 text-xl" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaX className="text-gray-100 hover:text-blue-400 text-xl" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-gray-100 hover:text-pink-500 text-xl" />
                        </a>
                    </div>

                    {/* Phone Number */}
                    <a href="tel:+1234567890" className="flex items-center text-gray-100 hover:text-blue-500 font-medium">
                        <FaPhone className="mr-1" /> <span className="hidden lg:inline">01316265634</span>
                    </a>

                    {/* Auth Buttons */}
                    {!loading && (
                        <div className="flex items-center space-x-4 ml-2">
                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-100 font-medium flex items-center">
                                        <FaUser className="mr-1" /> {user.name || 'User'}
                                    </span>
                                    <button 
                                        onClick={handleLogout}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center transition-colors"
                                    >
                                        <FaSignOutAlt className="mr-1" /> Logout
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link 
                                        to="/sign-in" 
                                        className="text-gray-100 hover:text-blue-500 font-medium transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    <Link 
                                        to="/sign-up" 
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Hamburger - Mobile */}
                <button
                    className="md:hidden text-gray-100 text-2xl focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden fixed top-0 right-0 h-full w-64 bg-[#03045E] shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Close Button */}
                <div className="flex justify-end p-4">
                    <button
                        className="text-gray-100 text-2xl focus:outline-none"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <FaTimes />
                    </button>
                </div>
                
                {/* Menu Content */}
                <nav className="flex flex-col space-y-4 px-6 pb-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className="text-gray-100 hover:text-blue-500 font-medium transition-colors py-2"
                            onClick={() => setMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}

                    {/* Mobile Auth Buttons */}
                    {!loading && (
                        <div className="pt-4 border-t border-gray-200 mt-4">
                            {user ? (
                                <div className="flex flex-col space-y-4">
                                    <div className="flex items-center text-gray-100 font-medium">
                                        <FaUser className="mr-2" /> {user.name || 'User'}
                                    </div>
                                    <button 
                                        onClick={handleLogout}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors"
                                    >
                                        <FaSignOutAlt className="mr-2" /> Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col space-y-3">
                                    <Link 
                                        to="/sign-in" 
                                        className="text-center text-gray-100 hover:text-blue-500 font-medium transition-colors py-2 border border-gray-300 rounded-md"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                    <Link 
                                        to="/sign-up" 
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-center transition-colors"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Mobile Social Icons */}
                    <div className="flex items-center justify-center space-x-4 mt-8">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="text-gray-100 hover:text-blue-600 text-xl" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaX className="text-gray-100 hover:text-blue-400 text-xl" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-gray-100 hover:text-pink-500 text-xl" />
                        </a>
                    </div>

                    {/* Here I need mobile, whatsapp and email (with icons) */}
                    {/* Mobile Phone Number */}
                    <a href="tel:8801316265634" className="flex items-center justify-center text-gray-100 hover:text-blue-500 font-medium mt-4">
                        <FaPhone className="mr-2" /> 01316265634
                    </a>

                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/8801316265634"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center text-gray-100 hover:text-green-500 font-medium mt-4"
                    >
                        <FaWhatsapp className="mr-2" /> 01316265634
                    </a>

                    {/* Email */}
                    <a
                        href="mailto:mehedihasanshopnil.jr@gmail.com"
                        className="flex items-center justify-center text-[12px] text-gray-100 hover:text-yellow-400 font-medium mt-4"
                    >
                        <FaEnvelope className="mr-2" /> mehedihasanshopnil.jr@gmail.com
                    </a>
                </nav>
            </div>

            {/* Overlay */}
            {menuOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-60 z-30 md:hidden"
                    onClick={() => setMenuOpen(false)}
                />
            )}
        </header>
    );
};

export default Header;