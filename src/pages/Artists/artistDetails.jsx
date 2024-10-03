import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { getCldImg } from '../../utils/cloudinary';
import { AdvancedImage } from '@cloudinary/react';

function ArtistDetail() {
    const { artistId } = useParams();
    const { artists } = useAppContext((context) => ({
        artists: context.artistsState.value || []
    }));

    const artist = artists.find(artist => artist.$id === artistId);

    if (!artist) {
        return <div>Artist not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-16">
            {/* Artist Header Section */}
            <div className="flex mb-8 items-start">
                {/* Profile Image */}
                <div className="w-1/4 flex justify-center items-start">
                    <div className="rounded-full overflow-hidden border-4 border-gray-200 shadow-lg w-64 h-64 flex items-center justify-center">
                        <AdvancedImage
                            cldImg={getCldImg(artist.pictureId)}
                            alt={artist.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Artist Information */}
                <div className="w-3/4 pl-10">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">{artist.name}</h1>
                    
                    {/* About the Artist Section */}
                    <div className="mb-6">
                        <p className="text-lg text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec eros quis nisi suscipit vestibulum. 
                            Sed venenatis justo vel turpis faucibus, at suscipit velit ultricies. Suspendisse id neque eget felis volutpat 
                            aliquet in ac urna. Sed ac metus nec metus cursus euismod. Mauris non ligula ut elit scelerisque commodo. 
                            Cras vitae fringilla tortor, sit amet feugiat magna. Pellentesque scelerisque, elit nec tristique gravida, 
                            dui erat facilisis nisl, at vehicula nisl nulla eget mi. Vivamus volutpat vehicula nisl et vehicula.
                        </p>
                    </div>

                    {/* Contact Information Section */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-600 mb-2">Contact Information</h2>
                        <p className="text-md text-gray-700">Phone: {artist.phoneNumber}</p>
                        <p className="text-md text-gray-700">
                            Email: <a href={`mailto:${artist.email}`} className="text-blue-500">{artist.email}</a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Artworks Section */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Artworks by {artist.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {artist.artworks.map((artwork, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <AdvancedImage
                                cldImg={getCldImg(artwork.imageId)}
                                alt={artwork.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800">{artwork.name}</h3>
                                <p className="text-md text-gray-600">{artwork.description}</p>
                                <p className="text-lg font-bold text-gray-800">${artwork.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ArtistDetail;
