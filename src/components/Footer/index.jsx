import React from 'react';
import { Link } from 'react-router-dom';

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
                        <a href="#" className="hover:text-gray-300">Facebook</a>
                        <a href="#" className="hover:text-gray-300">Twitter</a>
                        <a href="#" className="hover:text-gray-300">Instagram</a>
                    </div>
                </div>
                <div className="mt-8 text-center text-sm text-gray-500">
                    © 2024 ArtConnect
                </div>
            </div>
        </footer>
    );
};

export default Footer;