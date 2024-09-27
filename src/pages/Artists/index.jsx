import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { products, artists } from '../../constants/data';
import { getCldImg } from '../../utils/cloudinary';
import { cld } from '../../utils/cloudinary';

import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

function Artists() {
    // Use this sample image or upload your own via the Media Explorer
    const heroImage = cld.image('art-connect-hero')
        .format('auto')
        .quality('auto')
        .resize(auto().gravity(autoGravity())); // Optimize and resize hero image

    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-96 bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${heroImage.toURL()})` }}>
                <div className="bg-black bg-opacity-60 w-full h-full absolute top-0 left-0 z-10"></div>
                <div className="z-20 text-center text-white">
                    <h1 className="text-5xl font-bold mb-4">Explore the Artists & Artworks</h1>
                    <p className="text-xl">A curated collection of fine artworks from various artists.</p>
                </div>
            </section>

            {/* Artworks Section */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold text-center mb-8">Featured Artworks</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {products.map((product, index) => (
                        <div key={index} className="text-center group">
                            <div className="overflow-hidden rounded-lg shadow-lg">
                                <AdvancedImage cldImg={getCldImg(product.imageId)} alt={product.name} className="w-full h-72 object-cover transform transition duration-300 group-hover:scale-105" />
                            </div>
                            <h3 className="text-2xl font-semibold mt-4">{product.name}</h3>
                            <p className="text-lg text-gray-600 mt-2">{product.price}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Artists Section */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold text-center mb-8">Meet the Artists</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {artists.map((artist, index) => (
                        <div key={index} className="text-center group">
                            <div className="overflow-hidden rounded-full w-48 h-48 mx-auto mb-4">
                                <AdvancedImage cldImg={getCldImg(artist.imageId)} alt={artist.name} className="w-full h-full object-cover transform transition duration-300 group-hover:scale-105 rounded-full" />
                            </div>
                            <h3 className="text-2xl font-semibold">{artist.name}</h3>
                            <p className="text-lg text-gray-500">{artist.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Artists;
