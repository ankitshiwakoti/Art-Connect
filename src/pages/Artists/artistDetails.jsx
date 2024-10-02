import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { getCldImg } from '../../utils/cloudinary';
import { AdvancedImage } from '@cloudinary/react';

function ArtistDetail() {
    const { artistId } = useParams(); // Extract artistId from the URL
    const { artists } = useAppContext((context) => ({
        artists: context.artistsState.value || [] // Fetch all artists
    }));

    const artist = artists.find(artist => artist.$id === artistId); // Find the artist by ID

    if (!artist) {
        return <div>Artist not found</div>; // Handle case where artist is not found
    }

    return (
        <div className="container mx-auto px-4 py-16">
            {/* Header Section */}
            <header className="mb-8">
                {/* Include your header component here */}
            </header>

            <div className="flex mb-8">
                {/* Profile Image Section */}
                <div className="w-1/3 mr-4">
                    <AdvancedImage
                        cldImg={getCldImg(artist.pictureId)}
                        alt={artist.name}
                        className="rounded-full w-full h-auto object-cover shadow-lg"
                    />
                </div>

                {/* Artist Info Section */}
                <div className="w-2/3">
                    <h1 className="text-5xl font-bold mb-2">{artist.name}</h1>
                    <p className="text-lg mb-4">{artist.description}</p>

                    {/* Contact Information Section */}
                    <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
                    <p className="text-lg">Phone: {artist.phoneNumber}</p>
                    <p className="text-lg">Email: <a href={`mailto:${artist.email}`} className="text-blue-500">{artist.email}</a></p>
                </div>
            </div>

            {/* Masterpiece Section */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Masterpiece</h2>
                <AdvancedImage
                    cldImg={getCldImg(artist.masterpiece.imageId)}
                    alt={artist.masterpiece.name}
                    className="w-full h-72 object-cover mb-4"
                />
                <p className="text-lg">{artist.masterpiece.description}</p>
            </div>

            {/* Artworks Section */}
            <div>
                <h2 className="text-3xl font-bold mb-4">Artworks by {artist.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {artist.artworks.map((artwork, index) => (
                        <div key={index} className="overflow-hidden rounded-lg shadow-md">
                            <AdvancedImage
                                cldImg={getCldImg(artwork.imageId)}
                                alt={artwork.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{artwork.name}</h3>
                                <p className="text-md">{artwork.description}</p>
                                <p className="text-lg font-bold">${artwork.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Section */}
            <footer className="mt-16">
                {/* Include your footer component here */}
            </footer>
        </div>
    );
}

export default ArtistDetail;
