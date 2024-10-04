import React, { useState } from 'react';
import { getCldImg } from '../../utils/cloudinary';
import Title from '../../components/Title';
import { useAppContext } from '../../contexts/AppContext'; // Adjust the import path as needed

function Gallery() {
    const { artworks } = useAppContext((context) => ({
        artworks: context.artworksState.value || []
    }));

    const [isOpen, setIsOpen] = useState(false);
    const [currentArtwork, setCurrentArtwork] = useState(null);

    const openModal = (artwork) => {
        setCurrentArtwork(artwork);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setCurrentArtwork(null);
    };

    const nextImage = () => {
        const currentIndex = artworks.findIndex(art => art.$id === currentArtwork.$id);
        const nextIndex = (currentIndex + 1) % artworks.length;
        setCurrentArtwork(artworks[nextIndex]);
    };

    const prevImage = () => {
        const currentIndex = artworks.findIndex(art => art.$id === currentArtwork.$id);
        const prevIndex = (currentIndex - 1 + artworks.length) % artworks.length;
        setCurrentArtwork(artworks[prevIndex]);
    };

    return (
        <div>
            <section className="container mx-auto pb-16">
                <Title>Artwork Gallery</Title>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
                    {artworks.map((artwork) => (
                        <div key={artwork.$id} className="mb-4 break-inside-avoid">
                            <img
                                src={getCldImg(artwork.imageId).toURL()}
                                alt=""
                                className="w-full h-auto object-contain cursor-pointer"
                                onClick={() => openModal(artwork)}
                            />
                            {/* <p className="mt-2 text-sm font-semibold">{artwork.name}</p>
                            <p className="text-xs text-gray-600">{artwork.artist.name}</p> */}
                        </div>
                    ))}
                </div>
            </section>

            {isOpen && currentArtwork && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-lg">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className="p-4 bg-black bg-opacity-75 rounded-lg shadow-2xl">
                            <img
                                src={getCldImg(currentArtwork.imageId).toURL()}
                                alt=""
                                className="max-w-[80vw] max-h-[70vh] object-contain"
                            />
                        </div>
                    </div>

                    <button
                        className="absolute top-4 right-4 text-white text-4xl font-light hover:text-gray-400 transition-transform transform hover:scale-110"
                        onClick={closeModal}
                    >
                        &times;
                    </button>

                    <button
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl font-bold"
                        onClick={prevImage}
                    >
                        &#8592;
                    </button>
                    <button
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl font-bold"
                        onClick={nextImage}
                    >
                        &#8594;
                    </button>

                    <div className="absolute bottom-0 left-0 w-full text-white p-4">
                        <p className="text-xl font-semibold">{currentArtwork.name}</p>
                        <p className="text-sm">{currentArtwork.artist.name}</p>
                        {/* <p className="text-xs mt-2">{currentArtwork.description}</p> */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Gallery;