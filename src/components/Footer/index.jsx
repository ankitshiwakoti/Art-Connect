import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';



const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <nav>
                        <ul className="flex space-x-4">
                            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
                            <li><Link to="/shop" className="hover:text-gray-300">Shop</Link></li>
                            <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
                        </ul>
                    </nav>
                    <div className="flex space-x-4">
                        <span className="mr-2 text-sm italic">Follow us on:</span>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-gray-300"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-gray-300"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-gray-300"><Twitter size={20} /></a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-left text-sm text-gray-500">
                    © 2024 ArtConnect | All rights reserved
                </div>
            </div>
        </footer>
    );
};

export default Footer;