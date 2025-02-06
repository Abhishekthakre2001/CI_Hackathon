import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for better UI
import logo from "../assets/images/logo.png";
import Whatsappbutton from './Whatsappbutton'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="w-14" />
          {/* <span className="text-2xl font-bold text-gray-800">Brand</span> */}
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {["home", "finance", "market", "product"].map((item) => (
            <NavLink
              key={item}
              to={`/${item}`}
              className={({ isActive }) =>
                `font-medium text-lg capitalize transition duration-300 ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-700 hover:text-blue-500"
                }`
              }
            >
              {item}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleNavbar}
          className="md:hidden p-2 rounded-md border border-gray-300 hover:bg-gray-200 transition"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <div
          className={`absolute top-16 left-0 w-full bg-white shadow-md md:hidden transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col items-center space-y-6 py-6">
            {["home", "finance", "market", "product"].map((item) => (
              <NavLink
                key={item}
                to={`/${item}`}
                onClick={toggleNavbar}
                className={({ isActive }) =>
                  `text-lg capitalize transition duration-300 ${
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700 hover:text-blue-500"
                  }`
                }
              >
                {item}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
    <Whatsappbutton/>
    </>
    
  );
}