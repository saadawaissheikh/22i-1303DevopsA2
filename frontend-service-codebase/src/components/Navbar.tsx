import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Menu } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default to false

  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  let lastScrollY = useRef(0);

  const handleCreateEvent = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (isAuthenticated) {
      navigate("/create");
    } else {
      navigate("/signin");
    }
  };

  const handleExploreEvent = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (isAuthenticated) {
      navigate("/explore");
    } else {
      navigate("/signin");
    }
  };

  // ✅ Check authentication status on mount and listen for changes
  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    };

    handleAuthChange(); // Check on mount
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  // ✅ Handle scroll to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAuthenticated");

    setIsAuthenticated(false);
    window.dispatchEvent(new Event("authChange")); // Notify Navbar to update

    navigate("/signin");
  };

  return (
    <nav
      className={`bg-white shadow-md fixed w-full top-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                EventBookings
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => {navigate("/"); }}
              className="bg-white text-purple-900 px-2 py-2 rounded-lg font-semibold hover:bg-purple-700 hover:text-white transition duration-200"
            >
              Home
            </button>
            <button
              onClick={handleCreateEvent}
              className="bg-white text-purple-900 px-2 py-2 rounded-lg font-semibold hover:bg-purple-700 hover:text-white transition duration-200"
            >
              Create Event
            </button>
            <button
              onClick={handleExploreEvent}
              className="bg-white text-purple-900 w-30 px-2 py-2 rounded-lg font-semibold hover:bg-purple-700 hover:text-white transition duration-200"
            >
              Explore Events
            </button>
            <button
              onClick={() => {navigate("/pricing"); }}
              className="bg-white text-purple-900 px-2 py-2 rounded-lg font-semibold hover:bg-purple-700 hover:text-white transition duration-200"
            >
              Pricing
            </button>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/signin"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-200"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Navigation Menu */}
          <div className="md:hidden relative" ref={menuRef}>
            <button
              className="cursor-pointer focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-6 w-6 text-gray-600 hover:text-gray-900" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 border border-gray-200 z-[100]">
                <Link
                  to="/explore"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Explore Events
                </Link>
                <Link
                  to="/create"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Create Event
                </Link>
                <Link
                  to="/pricing"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </Link>
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="bg-red-600 text-white px-4 py-2 mx-4 my-2 w-40 rounded-lg hover:bg-red-700 transition duration-200"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/signin"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
