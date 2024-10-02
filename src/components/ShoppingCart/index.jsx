import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { getCldImg } from '../../utils/cloudinary';
import { AdvancedImage } from '@cloudinary/react';

const ShoppingCart = ({ isOpen, onClose, anchorRef }) => {
    const { cartItems, removeFromCart, updateQuantity } = useAppContext();
    const cartRef = useRef(null);

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
    //console.log(isOpen);

    if (!isOpen) return null;

    return (
        <div
            ref={cartRef}
            className="bg-white w-full h-full md:w-96 md:h-auto md:max-h-[80vh] flex flex-col shadow-lg fixed top-0 right-0 md:absolute md:top-8 md:right-0 z-50"
            style={{
                transform: `translateY(${isOpen ? '0' : '100%'})`,
                transition: 'transform 0.3s ease-in-out',
            }}
        >
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">Your Cart</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty</p>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.$id} className="flex items-center mb-4">
                            <AdvancedImage
                                cldImg={getCldImg(item.imageId)}
                                alt={item.name}
                                className="w-16 h-16 object-cover mr-4"
                            />
                            <div className="flex-grow">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-gray-600">${item.price.toFixed(2)} USD</p>
                                <div className="flex items-center mt-2">
                                    <button
                                        onClick={() => updateQuantity(item.$id, Math.max(1, item.quantity - 1))}
                                        className="px-2 py-1 border rounded"
                                    >
                                        -
                                    </button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.$id, item.quantity + 1)}
                                        className="px-2 py-1 border rounded"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.$id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    ))
                )}
            </div>
            <div className="p-4 border-t">
                <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)} USD</span>
                </div>
                <button className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300">
                    Continue to Checkout
                </button>
            </div>
        </div>
    );
};

export default ShoppingCart;