import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black shadow-md fixed top-0 w-full z-10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-white text-2xl font-bold">Connectverse</h2>

          <div className="flex items-center space-x-8">
            <div className="flex space-x-8">
              <Link to="/" className="text-white hover:text-gray-300">Home</Link>
              <Link to="/about" className="text-white hover:text-gray-300">About</Link>
              <Link to="/contact" className="text-white hover:text-gray-300">Contact</Link>
            </div>
            <Link 
              to="/login" 
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
