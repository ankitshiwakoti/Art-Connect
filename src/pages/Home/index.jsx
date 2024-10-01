import React from 'react';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
// import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn"
// import { gravity } from '@cloudinary/url-gen/qualifiers';
import { getCldImg } from '../../utils/cloudinary';
import { cld } from '../../utils/cloudinary';
import { featuredArtists, featuredArtworks } from '../../constants/data';
import { useAppContext } from '../../contexts/AppContext';
import { Link } from 'react-router-dom';

function Home() {
    const { categories } = useAppContext();

    // Use this sample image or upload your own via the Media Explorer
    const heroImage = cld.image('art-connect-hero')
        .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
        .quality('auto')
        .resize(auto().gravity(autoGravity())); // Transform the image: auto-crop to square aspect_ratio

    //console.log(optimizeUrl);
    return (
        <div>
            {/* Hero Section */}
            {/* <section className="relative h-screen">
                <AdvancedImage cldImg={heroImage} alt="Hero" className="w-full h-full object-cover" /> */}
            {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-bold mb-4">Perfect eCommerce Webflow Template to Get Started</h1>
                        <button className="bg-white text-black px-6 py-2 rounded">Get Started</button>
                    </div>
                </div> */}
            {/* </section> */}

            <section className="relative h-176 bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${heroImage.toURL()})` }}>
                <div className="bg-black bg-opacity-60 w-full h-full absolute top-0 left-0 z-10"></div>
                <div className="z-20 text-center text-white">
                    <h1 className="text-5xl font-bold mb-4 opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fadeInUp">
                        Explore the Artists & Artworks
                    </h1>
                    <p className="text-xl opacity-0 translate-y-10 transition-all duration-1000 ease-out animate-fadeInUp animation-delay-500">
                        A curated collection of fine artworks from various artists.
                    </p>
                </div>
            </section>

            {/* Categories */}
            {/* Categories */}
            <section className="container mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((category, index) => (
                    <Link key={index} to={`/shop/${category.code}`} className="bg-gray-900 text-white p-8 text-center hover:bg-gray-800 transition duration-300">
                        <h2 className="text-2xl">{category.name}</h2>
                    </Link>
                ))}
            </section>

            {/* Featured Products */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-2">Featured Artworks</h2>
                <div className="bg-black w-12 h-px mx-auto mt-5 mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredArtworks.map((artwork, index) => (
                        <div key={index} className="text-center group">
                            <div className="overflow-hidden">
                                <AdvancedImage cldImg={getCldImg(artwork.imageId)} alt={artwork.name} className="w-full h-96 object-cover transform transition duration-300 group-hover:scale-105" />
                            </div>
                            <h3 className="text-xl font-semibold">{artwork.name}</h3>
                            <p className="text-gray-600">${parseFloat(artwork.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Artists */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-2">Featured Artists</h2>
                <div className="bg-black w-12 h-px mx-auto mt-5 mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredArtists.map((artist, index) => (
                        <div key={index} className="text-center group">
                            <div className="overflow-hidden">

                                <AdvancedImage cldImg={getCldImg(artist.masterpieceImageId)} alt={artist.name} className="w-full h-96 object-cover object-cover transform transition duration-300 group-hover:scale-105" />
                            </div>
                            <h3 className="text-xl font-semibold">{artist.name}</h3>
                        </div>
                    ))}
                </div>
            </section>


        </div>
    );
}

export default Home;