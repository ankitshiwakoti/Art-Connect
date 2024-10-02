import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { User, ShoppingCart as ShoppingCartIcon, ChevronDown, Phone, Mail, Menu, X, Loader } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToggle, useClickAway } from 'react-use';
import ShoppingCart from '../ShoppingCart';

const Navigation = () => {
    const {
        user,
        cartItems,
        loginWithGoogle,
        logout,
        categories
    } = useAppContext((context) => {
        return {
            user: context.user || null,
            cartItems: context.cartItems || [],
            loginWithGoogle: context.loginWithGoogle,
            logout: context.logout,
            categories: context.categoriesState.value || [],
        }
    });
    const navigate = useNavigate();
    const location = useLocation();

    const [isDropdownOpen, toggleDropdown] = useToggle(false);
    const [isMobileMenuOpen, toggleMobileMenu] = useToggle(false);
    const [isLoginLoading, toggleLoginLoading] = useToggle(false);
    const [isCartOpen, toggleCartOpen] = useToggle(false);

    const dropdownRef = React.useRef(null);
    useClickAway(dropdownRef, () => {
        if (isDropdownOpen) toggleDropdown(false);
    });

    const isActive = (path, includeSubPaths = false) => {
        if (includeSubPaths) {
            return location.pathname.startsWith(path);
        } else {
            return location.pathname === path;
        }
    };

    const handleCategoryClick = (category) => {
        toggleDropdown(false);
        navigate(category ? `/shop/${category.code}` : '/shop');
    };

    const handleAuth = async () => {
        toggleLoginLoading(true);
        try {
            if (user) {
                await logout();
                toggleLoginLoading(false);
            } else {
                loginWithGoogle();
            }
        } catch (error) {
            console.error('Authentication error:', error);
        } finally {

        }
    };

    const cartIconRef = useRef(null);

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
                        <button
                            onClick={handleAuth}
                            disabled={isLoginLoading}
                            className={`flex items-center text-gray-800 hover:text-black border border-gray-400 rounded-md px-2 py-1 transition duration-300 ease-in-out hover:border-gray-700 ${isLoginLoading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {isLoginLoading ? (
                                <Loader className="w-5 h-5 animate-spin" />
                            ) : (
                                <User className="w-5 h-5" />
                            )}
                            <span className="ml-1">{user ? 'Logout' : 'Login'}</span>
                        </button>
                        <div className="relative">
                            <div className="relative cursor-pointer" onClick={() => toggleCartOpen(true)}>
                                <ShoppingCartIcon className="w-5 h-5" />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartItems.length}
                                    </span>
                                )}
                            </div>
                            <ShoppingCart isOpen={isCartOpen} onClose={() => {
                                toggleCartOpen(false);
                            }} anchorRef={cartIconRef} />
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

            {/* Mobile menu with animation */}
            <nav className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <ul className="flex flex-col space-y-2 bg-white p-4">
                    <li><Link to="/" className={`font-semibold ${isActive('/') ? 'text-gray-950' : 'text-gray-600 hover:text-gray-950'}`}>Home</Link></li>
                    <li><Link to="/shop" className={`font-semibold ${isActive('/shop', true) ? 'text-gray-950' : 'text-gray-600 hover:text-gray-950'}`}>Shop</Link></li>
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
                            onClick={toggleDropdown}
                            className={`font-semibold ${isActive('/shop', true) ? 'text-gray-950' : 'text-gray-600 hover:text-gray-950'} flex items-center`}
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
                                            key={category.$id}
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