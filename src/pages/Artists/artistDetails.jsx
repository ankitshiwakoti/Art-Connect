import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { getCldImg } from '../../utils/cloudinary';
import { AdvancedImage } from '@cloudinary/react';
import Title from '../../components/Title';

function ArtistDetail() {
    const { artistId } = useParams();
    const { artists } = useAppContext((context) => ({
        artists: context.artistsState.value || []
    }));

    const artist = artists.find(artist => artist.$id === artistId);
    console.log(artist);

    if (!artist) {
        return <div>Artist not found</div>;
    }

    return (
        <div className="container mx-auto px-4 pb-8">
            <Title>{artist.name}</Title>
            {/* Artist Header Section */}
            <div className="flex flex-col md:flex-row mb-8 items-start">
                {/* Profile Image */}
                <div className="w-full md:w-1/3 flex justify-center items-start mb-4 md:mb-0">
                    <div className="rounded-full overflow-hidden border-4 border-gray-200 shadow-lg w-64 h-64 flex items-center justify-center">
                        <AdvancedImage
                            cldImg={getCldImg(artist.pictureId)}
                            alt={artist.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Artist Information */}
                <div className="w-full text-left md:w-2/3 md:pl-8">
                    {/* About the Artist Section */}
                    <div className="mb-6">
                        <p className="text-md text-left text-gray-700">
                            {artist.description || "Artist bio not available."}
                        </p>
                    </div>

                    {/* Additional Information */}
                    <div>
                        <p className="text-sm text-left text-gray-600">
                            {artist.email || "Email not available."}
                        </p>
                        <p className="text-sm text-left text-gray-600">
                            {artist.phoneNumber || "Phone number not available."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Updated Artworks Section */}
            <section className="container mx-auto px-4 py-16">
                {/* <h2 className="text-3xl font-bold text-center mb-2">Featured Artworks</h2> */}
                <div className="bg-black w-12 h-px mx-auto mt-5 mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {artist.artworks.map((artwork, index) => (
                        <div key={index} className="text-center group">
                            <div className="overflow-hidden">
                                <AdvancedImage 
                                    cldImg={getCldImg(artwork.imageId)} 
                                    alt={artwork.name} 
                                    className="w-full h-96 object-cover transform transition duration-300 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="text-xl font-semibold mt-4">{artwork.name}</h3>
                            {/* <p className="text-gray-600">
                                ${parseFloat(artwork.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                            </p> */}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default ArtistDetail;