import React, { useState, useContext, useEffect } from "react";

import { Link, useLocation } from "react-router";
import { AuthContext } from "../../provider/AuthProvider/AuthProvider";
import logo from "../../assets/images/CoreDenz-logo.png";
import { FaX } from "react-icons/fa6";
import MobileNavMenu from "./MobileNavMenu";
import DesktopHeader from "./DesktopHeader";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },

  {
    name: "Services",
    href: "/services",
    subItems: [
      { name: "Development", href: "/services/development" },
      { name: "Graphic Design", href: "/services/graphic-design" },
    ],
  },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const { user, logOut, loading, cart } = useContext(AuthContext);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (user?.email) {
      setCartCount(cart.length);
    } else {
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      setCartCount(guestCart.length);
    }
  }, [user, cart]);

  const handleLogout = () => {
    //here the logout function
    logOut();
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

  const location = useLocation();
  const activePath = location.pathname;


  return (
    <header
      className={`w-full bg-[#03045E] shadow-md ${
        isFixed ? 'fixed top-0 left-0 z-50' : 'relative'
      } h-[72px] md:h-[80px]`}
    >
      {/* Desktop Navigation */}
      <DesktopHeader
        user={user}
        handleLogout={handleLogout}
        cart={cart}
        navItems={navItems}
        logo={logo}
        cartCount={cartCount}
        setMenuOpen={setMenuOpen}
        menuOpen={menuOpen}
        loading={loading}
        activePath={activePath}
      />

      {/* Mobile Menu */}
      <MobileNavMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        navItems={navItems}
        openSubmenu={openSubmenu}
        toggleSubmenu={toggleSubmenu}
        user={user}
        loading={loading}
        handleLogout={handleLogout}
      />

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
