import React, { useState } from 'react';
import { FaBars, FaTimes, FaFacebook, FaTwitter, FaInstagram, FaPhone, FaReact } from 'react-icons/fa';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Laptops', href: '/laptops' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
];

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <FaReact className="text-blue-500 text-3xl" />
                    <span className="font-bold text-xl text-gray-800">CoreDenz</span>
                </div>

                {/* Nav Menu - Desktop */}
                <nav className="hidden md:flex space-x-8">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-gray-700 hover:text-blue-500 font-medium transition-colors"
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>

                {/* Right Side */}
                <div className="hidden md:flex items-center space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="text-gray-500 hover:text-blue-600 text-xl" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="text-gray-500 hover:text-blue-400 text-xl" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="text-gray-500 hover:text-pink-500 text-xl" />
                    </a>
                    <a href="tel:+1234567890" className="flex items-center text-gray-700 hover:text-blue-500 font-medium">
                        <FaPhone className="mr-1" /> <span className="hidden lg:inline">01316265634</span>
                    </a>
                </div>

                {/* Hamburger - Mobile */}
                <button
                    className="md:hidden text-gray-700 text-2xl focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Close Button */}
                <div className="flex justify-end p-4">
                    <button
                        className="text-gray-700 text-2xl focus:outline-none"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <FaTimes />
                    </button>
                </div>
                
                {/* Menu Content */}
                <nav className="flex flex-col space-y-4 px-6 pb-4">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-gray-700 hover:text-blue-500 font-medium transition-colors py-2"
                            onClick={() => setMenuOpen(false)}
                        >
                            {item.name}
                        </a>
                    ))}
                    <div className="flex items-center space-x-4 mt-8">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="text-gray-500 hover:text-blue-600 text-xl" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="text-gray-500 hover:text-blue-400 text-xl" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-gray-500 hover:text-pink-500 text-xl" />
                        </a>
                        <a href="tel:+1234567890" className="flex items-center text-gray-700 hover:text-blue-500 font-medium">
                            <FaPhone className="mr-1" /> <span>+1 234 567 890</span>
                        </a>
                    </div>
                </nav>
            </div>

            {/* Overlay */}
            {menuOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setMenuOpen(false)}
                />
            )}
        </header>
    );
};

export default Header;