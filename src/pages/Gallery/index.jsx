import React, { useState } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { products } from '../../constants/data';
import { getCldImg } from '../../utils/cloudinary';

function Artists() {
    // State for managing the modal visibility and current image
    const [isOpen, setIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);

    // Function to open the modal and set the current image
    const openModal = (imageId) => {
        setCurrentImage(getCldImg(imageId));
        setIsOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsOpen(false);
        setCurrentImage(null);
    };

    return (
        <div>
            {/* Artworks gallery */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-2">Artworks Gallery</h2>
                <div className="bg-black w-12 h-px mx-auto mt-5 mb-8"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <div 
                            key={index} 
                            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
                            onClick={() => openModal(product.imageId)}
                        >
                            {/* Artwork image */}
                            <AdvancedImage cldImg={getCldImg(product.imageId)} alt={product.name} className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out" />
                            
                            {/* Overlay effect */}
                            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center">
                                <p className="text-white text-lg font-semibold">{product.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Modal for image viewer */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="relative">
                        {/* Close button */}
                        <button 
                            className="absolute top-2 right-2 text-white text-2xl font-bold"
                            onClick={closeModal}
                        >
                            &times;
                        </button>

                        {/* Display the selected image */}
                        <AdvancedImage cldImg={currentImage} alt="Selected artwork" className="max-w-full max-h-screen rounded-lg shadow-lg" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Artists;
