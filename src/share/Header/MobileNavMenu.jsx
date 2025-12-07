import React from 'react';
import {
  FaBars,
  FaTimes,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaReact,
  FaUser,
  FaSignOutAlt,
  FaWhatsapp,
  FaEnvelope,
  FaChevronDown,
  FaChevronUp,
  FaShoppingCart,
} from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { Link } from 'react-router';


const MobileNavMenu = ({ menuOpen, setMenuOpen, navItems, openSubmenu, toggleSubmenu, user, loading, handleLogout }) => {
  
  
  return (
    <div
      className={`md:hidden fixed top-0 right-0 h-full w-64 bg-[#03045E] shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
        menuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
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
      {/* Menu Content */}
      <nav className="flex flex-col px-6 pb-4">
        {navItems.map((item, index) => (
          <div key={item.name} className="py-2">
            {item.subItems ? (
              <>
                <button
                  className="flex items-center justify-between w-full text-gray-100 hover:text-blue-500 font-medium transition-colors"
                  onClick={() => toggleSubmenu(index)}
                >
                  <span>{item.name}</span>
                  {openSubmenu === index ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {openSubmenu === index && (
                  <div className="ml-4 mt-2 space-y-2">
                    {item.subItems.map(subItem => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className="block py-1 text-gray-300 hover:text-blue-400 transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.href}
                className="block text-gray-100 hover:text-blue-500 font-medium transition-colors py-2"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            )}
          </div>
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
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-gray-100 hover:text-blue-600 text-xl" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaX className="text-gray-100 hover:text-blue-400 text-xl" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-gray-100 hover:text-pink-500 text-xl" />
          </a>
        </div>

        {/* Here I need mobile, whatsapp and email (with icons) */}
        {/* Mobile Phone Number */}
        <a
          href="tel:8801316265634"
          className="flex items-center justify-center text-gray-100 hover:text-blue-500 font-medium mt-4"
        >
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
  );
};

export default MobileNavMenu;