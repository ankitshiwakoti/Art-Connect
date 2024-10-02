import React, { useState, useEffect } from 'react';
import { getCldImg } from '../../utils/cloudinary';
import { useAppContext } from '../../contexts/AppContext';
import Title from '../../components/Title';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import { Link, useParams } from 'react-router-dom';


function Artwork() {
    const { id } = useParams();
    const { artwork } = useAppContext((context) => ({
        artwork: context.artworksState.value?.find(a => a.$id === id)
    }));

    const [imageInfo, setImageInfo] = useState(null);

    useEffect(() => {
        if (artwork) {
            const info = getCldImg(artwork.imageId).addFlag("getinfo");
            fetch(info.toURL())
                .then(response => response.json())
                .then(data => setImageInfo(data))
                .catch(error => console.error('Error fetching image info:', error));
        }
    }, [artwork]);


    if (!artwork) {
        return <div>Loading...</div>;
    }

    //const imageUrl = getCldImg(artwork.imageId).toURL();
    const fullImage = getCldImg(artwork.imageId);
    const thumbnailImage = getCldImg(artwork.imageId);

    const pswpOptions = {
        wheelToZoom: true,
        maxZoomLevel: 2,
        uiElements: ['zoom', 'close'],
        paddingFn: (viewportSize) => {
            return {
                top: 50,    // Add padding to the top
                bottom: 50, // Add padding to the bottom
                left: 0,
                right: 0
            };
        },
    };

    return (
        <div className="container mx-auto px-4 pb-16">
            <Title>{artwork.name}</Title>
            <div className="max-w-[85%] mx-auto">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <Gallery withCaption options={pswpOptions}>
                            <Item
                                original={fullImage.toURL()}
                                thumbnail={thumbnailImage.toURL()}
                                width={imageInfo ? imageInfo.output.width : 0}
                                height={imageInfo ? imageInfo.output.height : 0}
                                caption={artwork.name}
                            >
                                {({ ref, open }) => (

                                    <img
                                        src={thumbnailImage.toURL()}
                                        alt={artwork.name}
                                        className="w-full h-auto object-contain"
                                        onClick={open} ref={ref} style={{ cursor: 'pointer' }}
                                    />

                                )}
                            </Item>
                        </Gallery>
                    </div>
                    <div className="md:w-1/2 md:pl-16 text-left">
                        <Link
                            to={`/shop/${artwork.category.code}`}
                            className="text-gray-600 mb-6">{artwork.category.name}</Link>
                        <h2 className="text-3xl font-bold mb-4">{artwork.name}</h2>
                        <p className="text-2xl font-semibold mb-4">${parseFloat(artwork.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</p>
                        <p className="text-gray-600 mb-6">{artwork.description}</p>
                        <div className="mb-6">
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                                Quantity
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                min="1"
                                defaultValue="1"
                                className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Artwork;