import React from 'react';
import { getCldImg } from '../../utils/cloudinary';

function ImageModal({ isOpen, closeModal, prevImage, nextImage, currentIndex, products, isZoomed, toggleZoom }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-lg">
            <div className="relative">
                {/* Artwork container with zoom feature */}
                <div
                    className={`p-4 bg-black bg-opacity-75 rounded-lg shadow-2xl transition-transform duration-300 ${isZoomed ? 'scale-150' : ''}`}
                    onClick={toggleZoom}
                    style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
                >
                    <img
                        src={getCldImg(products[currentIndex].imageId).toURL()}
                        alt={products[currentIndex].name}
                        className="max-w-[80vw] max-h-[70vh] object-contain"
                    />
                </div>
            </div>

            {/* Close button */}
            <button
                className="fixed top-8 right-8 text-white text-4xl font-light hover:text-gray-400 transition-transform transform hover:scale-110"
                onClick={closeModal}
                style={{ background: 'none', padding: '12px' }}
            >
                &times;
            </button>

            {/* Previous and Next buttons */}
            <button
                className="fixed left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl font-bold"
                onClick={prevImage}
                style={{ background: 'none', padding: '20px' }}
            >
                &#8592;
            </button>
            <button
                className="fixed right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl font-bold"
                onClick={nextImage}
                style={{ background: 'none', padding: '20px' }}
            >
                &#8594;
            </button>

            {/* Artist Details section */}
            <div className="absolute bottom-0 left-0 w-full text-white p-4">
                <p className="text-xl font-semibold">{products[currentIndex].name}</p>
            </div>
        </div>
    );
}

export default ImageModal;