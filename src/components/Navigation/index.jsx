import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, ShoppingCart, ChevronDown, Phone, Mail } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
const Navigation = () => {

    const { user, cartItems, loginWithGoogle, logout } = useAppContext();

    return (
        <header className="bg-white">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-3xl font-bold italic">ArtConnect</Link>
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            <span>+1 (204) 800-0000</span>
                        </div>
                        <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2" />
                            <span>mail@artconnect.ca</span>
                        </div>
                        {user ? (
                            <button
                                onClick={logout}
                                className="flex items-center text-gray-800 hover:text-black"
                            >
                                <User className="w-5 h-5 mr-2" />
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={loginWithGoogle}
                                className="flex items-center text-gray-800 hover:text-black"
                            >
                                <User className="w-5 h-5 mr-2" />
                                Login
                            </button>
                        )}
                        <div className="relative">
                            <ShoppingCart className="w-5 h-5" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItems.length}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <nav className="mt-4">
                    <ul className="flex space-x-8 justify-center font-poppins">
                        <li><Link to="/" className="text-gray-800 hover:text-black">Home</Link></li>
                        <li className="relative group">
                            <Link to="/shop" className="text-gray-800 hover:text-black flex items-center">
                                Shop
                                <ChevronDown className="w-4 h-4 ml-1" />
                            </Link>
                        </li>
                        <li><Link to="/gallery" className="text-gray-800 hover:text-black">Gallery</Link></li>
                        <li><Link to="/artists" className="text-gray-800 hover:text-black">Artists</Link></li>
                        <li><Link to="/contact" className="text-gray-800 hover:text-black">Contact</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navigation;