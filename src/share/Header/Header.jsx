import React, { useState, useContext } from "react";
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
} from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";
import logo from "../../assets/images/CoreDenz-logo.png";
import { FaX } from "react-icons/fa6";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  {
    name: "Services",
    href: "/services",
    subItems: [
      { name: "Development", href: "/services/development" },
      { name: "Graphic Design", href: "/services/graphic-design" },
    ],
  },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const { user, loading, cart } = useContext(AuthContext);

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("User logged out");
    setMenuOpen(false);
  };

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  // State to track if header should be fixed
  const [isFixed, setIsFixed] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full bg-[#03045E] shadow-md ${
        isFixed ? "fixed top-0 left-0 z-50" : "relative"
      } h-[72px] md:h-[80px]`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        <Link to="/">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="CoreDenz Logo" className="w-32 md:w-52" />
          </div>
        </Link>

        {/* Nav Menu - Desktop */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) =>
            item.name === "Services" ? (
              <div key={item.name} className="relative group">
                <button className="text-gray-100 hover:text-blue-500 font-medium transition-colors flex items-center focus:outline-none">
                  {item.name}
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-44 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-opacity z-20">
                  <Link
                    to="/services/development"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  >
                    Development
                  </Link>
                  <Link
                    to="/services/graphic-design"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  >
                    Graphic Design
                  </Link>
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-100 hover:text-blue-500 font-medium transition-colors"
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        {/* Right Side - Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative text-gray-100 hover:text-yellow-400"
          >
            <FaShoppingCart className="text-xl" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Social Icons */}
          <div className="flex items-center space-x-4">
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

          {/* Phone Number */}
          <a
            href="tel:+1234567890"
            className="flex items-center text-gray-100 hover:text-blue-500 font-medium"
          >
            <FaPhone className="mr-1" />{" "}
            <span className="hidden lg:inline">01316265634</span>
          </a>

          {/* Auth Buttons */}
          {!loading && (
            <div className="flex items-center space-x-4 ml-2">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-100 font-medium flex items-center">
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
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

        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Cart Icon - Mobile */}
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

          {/* User image */}
          <div className=" md:hidden">
            {user && (
              <img
                src={user.photoURL}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
            )}
          </div>

          {/* Hamburger - Mobile */}
          <div>
            <button
              className="md:hidden text-gray-100 text-2xl focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-[#03045E] shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
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
                    {openSubmenu === index ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>
                  {openSubmenu === index && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.subItems.map((subItem) => (
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
                    <FaUser className="mr-2" /> {user.name || "User"}
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
