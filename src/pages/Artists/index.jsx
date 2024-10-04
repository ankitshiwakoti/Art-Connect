import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { AdvancedImage } from '@cloudinary/react';
import { getCldImg } from '../../utils/cloudinary';
import { cld } from '../../utils/cloudinary';
import { useAppContext } from '../../contexts/AppContext';

import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import Title from '../../components/Title';

function Artists() {
    const { artists } = useAppContext((context) => ({
        artists: context.artistsState.value || [] // Fetching all artists
    }));

    const heroImage = cld.image('art-connect-hero')
        .format('auto')
        .quality('auto')
        .resize(auto().gravity(autoGravity())); // Optimize and resize hero image

    return (
        <div>
            {/* Hero Section */}
            {/* <section className="relative h-96 bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${heroImage.toURL()})` }}>
                <div className="bg-black bg-opacity-60 w-full h-full absolute top-0 left-0 z-10"></div>
                <div className="z-20 text-center text-white">
                    <h1 className="text-5xl font-bold mb-4">Explore the Artists & Artworks</h1>
                    <p className="text-xl">A curated collection of fine artworks from various artists.</p>
                </div>
            </section> */}

            {/* Artists Section */}
            <section className="container mx-auto pb-16">
                {/* <h2 className="text-4xl font-bold text-center mb-8">All Artists</h2> */}
                <Title>All Artists</Title>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {artists.map((artist, index) => (
                        <div key={index} className="relative overflow-hidden rounded-lg transition duration-300 group">

                            <Link to={`/Artists/${artist.$id}`}> {/* Link to the artist detail page */}
                                <div className="overflow-hidden mb-4">
                                    <img
                                        src={getCldImg(artist.masterpiece.imageId).toURL()}
                                        alt={artist.masterpiece.name}
                                        className="w-full h-72 object-cover transition duration-300 transform group-hover:scale-105"
                                    />
                                </div>
                            </Link>

                            {/* Artist Profile Section */}
                            <div className="flex items-center mt-2">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img
                                        src={getCldImg(artist.pictureId).toURL()}
                                        alt={artist.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="ml-2">
                                    <h3 className="text-lg font-semibold">{artist.name}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Artists;
