import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto, scale, crop } from '@cloudinary/url-gen/actions/resize';
import { autoGravity, focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn"
// import { gravity } from '@cloudinary/url-gen/qualifiers';
import { getCldImg } from '../../utils/cloudinary';
import { cld } from '../../utils/cloudinary';
import { categories, featuredArtists, featuredArtworks } from '../../constants/data';



function Home() {

    // Use this sample image or upload your own via the Media Explorer
    const heroImage = cld.image('art-connect-hero')
        .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
        .quality('auto')
        .resize(auto().gravity(autoGravity())); // Transform the image: auto-crop to square aspect_ratio

    //console.log(optimizeUrl);
    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-screen">
                <AdvancedImage cldImg={heroImage} alt="Hero" className="w-full h-full object-cover" />
                {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-bold mb-4">Perfect eCommerce Webflow Template to Get Started</h1>
                        <button className="bg-white text-black px-6 py-2 rounded">Get Started</button>
                    </div>
                </div> */}
            </section>

            {/* Categories */}
            <section className="container mx-auto px-4 py-16 grid grid-cols-4 gap-4">
                {categories.map((category, index) => (
                    <div className="bg-gray-900 text-white p-8 text-center">
                        <h2 className="text-2xl">{category.name}</h2>
                    </div>
                ))}


            </section>

            {/* Featured Products */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-2">Featured Artworks</h2>
                <div className="bg-black w-12 h-px mx-auto mt-5 mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredArtworks.map((artwork, index) => (
                        <div key={index} className="text-center">
                            <AdvancedImage cldImg={getCldImg(artwork.imageId)} alt={artwork.name} className="w-full h-96 object-cover mb-4" />
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
                        <div key={index} className="text-center">
                            <AdvancedImage cldImg={getCldImg(artist.masterpieceImageId)} alt={artist.name} className="w-full h-96 object-cover mb-4" />
                            <h3 className="text-xl font-semibold">{artist.name}</h3>
                        </div>
                    ))}
                </div>
            </section>


        </div>
    );
}

export default Home;