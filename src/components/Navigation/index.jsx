import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, ShoppingCart, ChevronDown, Phone, Mail, Menu, X } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {

    const { user, cartItems, loginWithGoogle, logout, categories } = useAppContext();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path) => {
        //console.log(location.pathname);
        //console.log(path);
        //if (path === '/') {

        if (path.startsWith('/shop/')) {
            return location.pathname.startsWith(path);
        } else {
            return location.pathname === path;
        }
        //} else {
        //  return location.pathname?.startsWith(path);
        //}
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleShopClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCategoryClick = (category) => {
        setIsDropdownOpen(false);
        navigate(category ? `/shop/${category.code}` : '/shop');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-white relative z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-3xl font-bold italic">ArtConnect</Link>
                    <div className="flex items-center space-x-6">
                        <div className="hidden md:flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            <span>+1 (204) 456-0150</span>
                        </div>
                        <div className="hidden md:flex items-center">
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
                        <button
                            className="md:hidden"
                            onClick={toggleMobileMenu}
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile menu */}
            <nav className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                <ul className="flex flex-col space-y-2 bg-white p-4">
                    <li><Link to="/" className={`font-semibold ${isActive('/') ? 'text-gray-950' : 'text-gray-600 hover:text-gray-950'}`}>Home</Link></li>
                    <li><Link to="/shop" className={`font-semibold ${isActive('/shop') ? 'text-gray-950' : 'text-gray-600 hover:text-gray-950'}`}>Shop</Link></li>
                    <li><Link to="/gallery" className={`font-semibold ${isActive('/gallery') ? 'text-gray-950' : 'text-gray-600 hover:text-gray-950'}`}>Gallery</Link></li>
                    <li><Link to="/artists" className={`font-semibold ${isActive('/artists') ? 'text-gray-950' : 'text-gray-600 hover:text-gray-950'}`}>Artists</Link></li>
                    <li><Link to="/contact" className={`font-semibold ${isActive('/contact') ? 'text-gray-950' : 'text-gray-600 hover:text-gray-950'}`}>Contact</Link></li>
                </ul>
            </nav>
            {/* Desktop menu */}
            <nav className="hidden md:block md:p-4">
                <ul className="flex space-x-8 justify-center font-poppins">
                    <li><Link to="/" className={`font-semibold ${isActive('/') ? 'text-gray-950' : 'text-gray-600 hover:text-gray-950'}`}>Home</Link></li>
                    <li className="relative group" ref={dropdownRef}>
                        <button
                            onClick={handleShopClick}
                            className={`font-semibold ${isActive('/shop') ? 'text-gray-950' : 'text-gray-600 hover:text-gray-950'} flex items-center`}
                        >
                            Shop
                            <ChevronDown className="w-4 h-4 ml-1" />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <button
                                        onClick={() => handleCategoryClick()}
                                        className={`block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-800 w-full text-left ${isActive('/shop') ? 'font-bold' : ''}`}
                                        role="menuitem"
                                    >
                                        All
                                    </button>
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => handleCategoryClick(category)}
                                            className={`block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-800 w-full text-left ${isActive(`/shop/${category.code}`) ? 'font-bold' : ''}`}
                                            role="menuitem"
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </li>
                    <li><Link to="/gallery" className={`font-semibold ${isActive('/gallery') ? 'text-gray-950' : 'text-gray-600 hover:text-gray-950'}`}>Gallery</Link></li>
                    <li><Link to="/artists" className={`font-semibold ${isActive('/artists') ? 'text-gray-950' : 'text-gray-600 hover:text-gray-950'}`}>Artists</Link></li>
                    <li><Link to="/contact" className={`font-semibold ${isActive('/contact') ? 'text-gray-950' : 'text-gray-600 hover:text-gray-950'}`}>Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Navigation;