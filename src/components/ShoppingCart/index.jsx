import React from 'react';
import { X } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { getCldImg } from '../../utils/cloudinary';

const ShoppingCart = ({ isOpen, onClose, anchorRef }) => {
    const { cartItems, removeFromCart, updateQuantity, isLoadingCartItems } = useAppContext();
    //const cartRef = useRef(null);

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.artwork.price * item.quantity, 0);
    };
    //console.log(isOpen);

    //if (!isOpen) return null;

    return (
        <div style={{
            transition: 'all, opacity 300ms',
            opacity: isOpen ? '1' : '0',
            display: isOpen ? 'block' : 'none',
        }}>
            <div
                //ref={cartRef}
                className="bg-white w-full h-full md:w-112 md:h-auto md:max-h-[80vh] flex flex-col shadow-lg fixed top-0 right-0 md:absolute md:top-8 md:right-0 z-50"
                style={{
                    transition: isOpen ? 'all, transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'all',
                    transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
                }}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-normal text-gray-800">Your Cart</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="flex flex-col h-full">
                    {cartItems.length === 0 ? (
                        <div className="flex-grow flex justify-center items-center h-full py-28">
                            <p className="text-center text-gray-800 text-base">No items found.</p>
                        </div>
                    ) : (
                        <>
                            <div className="flex-grow overflow-y-auto p-4 space-y-4">

                                {cartItems.map((item, index) => (
                                    <div key={index} className="flex items-center">
                                        <img
                                            src={getCldImg(item.artwork.imageId).toURL()}
                                            alt=""
                                            className="w-16 h-16 object-cover mr-4"
                                        />
                                        <div className="flex-grow">
                                            <h3 className="font-semibold">{item.artwork.name}</h3>
                                            <p className="text-gray-600">${parseFloat(item.artwork.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</p>
                                            <button
                                                onClick={() => removeFromCart(item)}
                                                className="text-red-500 hover:text-red-700 underline"
                                            >
                                                Remove
                                            </button>

                                        </div>

                                        <div className="flex items-center mt-2">
                                            <button
                                                disabled={item.quantity <= 1}
                                                onClick={() => updateQuantity(item, Math.max(1, item.quantity - 1))}
                                                className={`px-2 py-1 border rounded w-7 ${item.quantity <= 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''
                                                    }`}
                                            >
                                                -
                                            </button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item, item.quantity + 1)}
                                                className="px-2 py-1 border rounded w-7"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t mt-auto">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-semibold">Subtotal</span>
                                    <span>${calculateSubtotal().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</span>
                                </div>
                                <button className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300 font-medium">
                                    Continue to Checkout
                                </button>
                            </div>
                        </>
                    )}
                    {isLoadingCartItems && (
                        <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center z-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;