import React, { useState } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { products } from '../../constants/data';
import { getCldImg } from '../../utils/cloudinary';

function Artists() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Open modal with selected image
    const openModal = (globalIndex) => {
        setCurrentIndex(globalIndex);
        setIsOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsOpen(false);
    };

    // Navigate to the next image in the gallery
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    };

    // Navigate to the previous image in the gallery
    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    };

    return (
        <div>
            {/* Artworks gallery */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold text-center mb-2 tracking-wide uppercase">Artworks Gallery</h2>
                <div className="bg-gray-900 w-16 h-1 mx-auto mt-6 mb-12"></div>

                {/* FlexMasonry-style layout */}
                <div className="flex flex-wrap justify-center gap-4">
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-4 w-1/3">
                            {products.filter((_, i) => i % 3 === 0).map((product, index) => (
                                <div key={index} className="mb-4">
                                    <AdvancedImage
                                        cldImg={getCldImg(product.imageId)}
                                        alt={product.name}
                                        className="w-full h-auto object-contain cursor-pointer"
                                        onClick={() => openModal(index * 3)}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-4 w-1/3">
                            {products.filter((_, i) => i % 3 === 1).map((product, index) => (
                                <div key={index} className="mb-4">
                                    <AdvancedImage
                                        cldImg={getCldImg(product.imageId)}
                                        alt={product.name}
                                        className="w-full h-auto object-contain cursor-pointer"
                                        onClick={() => openModal(index * 3 + 1)}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-4 w-1/3">
                            {products.filter((_, i) => i % 3 === 2).map((product, index) => (
                                <div key={index} className="mb-4">
                                    <AdvancedImage
                                        cldImg={getCldImg(product.imageId)}
                                        alt={product.name}
                                        className="w-full h-auto object-contain cursor-pointer"
                                        onClick={() => openModal(index * 3 + 2)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal for image viewer */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-lg">
                    <div className="relative">
                        <AdvancedImage
                            cldImg={getCldImg(products[currentIndex].imageId)}
                            alt={products[currentIndex].name}
                            className="max-w-[80vw] max-h-[70vh] object-contain"
                        />
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
            )}
        </div>
    );
}

export default Artists;
