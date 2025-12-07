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
import { Link } from 'react-router';
import { FaX } from 'react-icons/fa6';

const DesktopHeader = ({
  user,
  handleLogout,
  cart,
  navItems,
  logo,
  cartCount,
  setMenuOpen,
  menuOpen,
  loading,
  activePath,
}) => {
  return (
    <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
      {/* Logo */}
      <Link to="/">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="CoreDenz Logo" className="w-32 md:w-52" />
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8">
        {navItems.map(item =>
          item.name === 'Services' ? (
            
            <div key={item.name} className="relative group">
              {/* Parent Button — Active Highlight */}
              <button
                className={`
                  font-medium flex items-center transition-all
                  ${
                    activePath.startsWith('/services')
                      ? 'text-blue-400'
                      : 'text-gray-100'
                  }
                  group-hover:text-blue-500
                `}
              >
                {item.name}
                <FaChevronDown className="ml-1 w-3 h-3" />
              </button>

              {/* Submenu */}
              <div
                className="
                absolute top-4 left-0 mt-2 w-48 bg-white rounded-md shadow-lg
                opacity-0 group-hover:opacity-100
                pointer-events-none group-hover:pointer-events-auto
                transition-all z-20
              "
              >
                {item.subItems.map(sub => (
                  <Link
                    key={sub.name}
                    to={sub.href}
                    className={`
                      block px-4 py-2 text-sm transition-colors
                      ${
                        activePath === sub.href
                          ? 'bg-blue-100 text-blue-700 font-semibold'
                          : 'text-gray-800 hover:bg-blue-100 hover:text-blue-700'
                      }
                    `}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={item.name}
              to={item.href}
              className={`
                font-medium transition-all
                ${
                  activePath === item.href
                    ? 'text-blue-400'
                    : 'text-gray-100 hover:text-blue-500'
                }
              `}
            >
              {item.name}
            </Link>
          )
        )}
      </nav>

      {/* Right Side Items */}
      <div className="hidden md:flex items-center space-x-6">
        {/* Cart */}
        <Link
          to="/cart"
          className="relative text-gray-100 hover:text-yellow-400"
        >
          <FaShoppingCart className="text-xl" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Social */}
        <div className="flex items-center space-x-4">
          <a href="https://facebook.com" target="_blank">
            <FaFacebook className="text-gray-100 hover:text-blue-600 text-xl" />
          </a>
          <a href="https://twitter.com" target="_blank">
            <FaX className="text-gray-100 hover:text-blue-400 text-xl" />
          </a>
          <a href="https://instagram.com" target="_blank">
            <FaInstagram className="text-gray-100 hover:text-pink-500 text-xl" />
          </a>
        </div>

        {/* Phone */}
        <a
          href="tel:+1234567890"
          className="flex items-center text-gray-100 hover:text-blue-500 font-medium"
        >
          <FaPhone className="mr-1" />
          <span className="hidden lg:inline">01316265634</span>
        </a>

        {/* Auth */}
        {!loading && (
          <div className="flex items-center space-x-4 ml-2">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile">
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                </Link>
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
                  className="text-gray-100 hover:text-blue-500 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      {/* Mobile only */}
      <div className="flex items-center space-x-4 md:space-x-6">
        <div>
          <Link
            to="/cart"
            className="relative md:hidden text-gray-100 hover:text-yellow-400"
          >
            <FaShoppingCart className="text-xl" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

        <div className="md:hidden">
          {user && (
            <img
              src={user.photoURL}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
          )}
        </div>

        <button
          className="md:hidden text-gray-100 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </div>
  );
};

export default DesktopHeader;
