import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <nav className="w-full md:w-auto">
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-center md:items-start">
              <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
              <li><Link to="/shop" className="hover:text-gray-300">Shop</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
            </ul>
          </nav>
          <div className="flex flex-col items-center md:items-end space-y-4 md:space-y-2">
            <span className="text-sm italic">Follow us on:</span>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300"><Facebook size={20} /></a>
              <a href="#" className="hover:text-gray-300"><Instagram size={20} /></a>
              <a href="#" className="hover:text-gray-300"><Twitter size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center md:text-left text-sm text-gray-500">
          © 2024 ArtConnect | All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;