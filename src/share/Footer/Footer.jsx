import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaReact } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Company Info */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <div className="text-blue-500 text-3xl">
                            <FaReact />
                        </div>
                        <span className="font-bold text-2xl">CoreDenz</span>
                    </div>
                    <p className="text-gray-400">
                        Your one-stop shop for the latest and greatest products. Shop with confidence and enjoy fast delivery!
                    </p>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                            <FaFacebook className="text-xl" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                            <FaTwitter className="text-xl" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors">
                            <FaInstagram className="text-xl" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                            <FaLinkedin className="text-xl" />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="/shop" className="text-gray-400 hover:text-white transition-colors">Shop</a></li>
                        <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                        <li><a href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                        <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                        <li><a href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Customer Service</h4>
                    <ul className="space-y-2">
                        <li><a href="/returns" className="text-gray-400 hover:text-white transition-colors">Returns Policy</a></li>
                        <li><a href="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
                        <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                        <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                        <li><a href="/account" className="text-gray-400 hover:text-white transition-colors">My Account</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Contact Us</h4>
                    <div className="space-y-3 text-gray-400">
                        <div className="flex items-start space-x-3">
                            <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                            <span>123 Business Ave, Suite 456, San Francisco, CA 94107</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaPhone />
                            <a href="tel:+1234567890" className="hover:text-white transition-colors">+1 (234) 567-890</a>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaEnvelope />
                            <a href="mailto:info@coredenz.com" className="hover:text-white transition-colors">info@coredenz.com</a>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaClock />
                            <span>Mon-Fri: 9AM - 5PM</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Coredenz. All rights reserved.</p>
                
            </div>
        </footer>
    );
};

export default Footer;