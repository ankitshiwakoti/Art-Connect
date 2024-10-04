import React, { useState, useEffect } from 'react';
import { getCldImg } from '../../utils/cloudinary';
import { useAppContext } from '../../contexts/AppContext';
import Title from '../../components/Title';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import { Link, useParams } from 'react-router-dom';
import { Loader } from 'lucide-react';
function Artwork() {
    const { id } = useParams();
    const { artwork, addToCart, isLoadingCartItems } = useAppContext((context) => ({
        artwork: context.artworksState.value?.find(a => a.$id === id),
        addToCart: context.addToCart,
        isLoadingCartItems: context.isLoadingCartItems,
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
    const fullImage = getCldImg(artwork.imageId, null, null);
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const quantity = parseInt(formData.get('quantity'), 10);
        addToCart(artwork, quantity);
    };

    return (
        <div className="container mx-auto pb-16">
            <Title>{artwork.name}</Title>
            <div className="max-w-[95%] mx-auto pt-8">
                <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-7/12 mb-8 lg:mb-0">
                        <Gallery withCaption options={pswpOptions}>
                            <Item
                                original={fullImage.toURL()}
                                thumbnail={thumbnailImage.toURL()}
                                width={imageInfo ? imageInfo.output.width : 0}
                                height={imageInfo ? imageInfo.output.height : 0}
                                caption={artwork.name}
                            >
                                {({ ref, open }) => (
                                    <div ref={ref} >
                                        <img
                                            src={thumbnailImage.toURL()}
                                            alt={artwork.name}
                                            className="w-full h-auto object-contain"
                                            onClick={open} style={{ cursor: 'pointer' }}
                                        />
                                    </div>


                                )}
                            </Item>
                        </Gallery>
                    </div>
                    <div className="lg:w-5/12 lg:pl-16 text-left">
                        <Link
                            to={`/shop/${artwork.category.code}`}
                            className="text-gray-500 font-medium text-base hover:text-gray-800">
                            {artwork.category.name}
                        </Link>
                        <h2 className="text-4xl font-normal	text-gray-800 mt-6 mb-3">{artwork.name}</h2>
                        <p className="text-2xl text-gray-400">${parseFloat(artwork.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</p>
                        <p className="text-gray-500 mb-6 mt-10 font-normal text-base">{artwork.description}</p>
                        <form onSubmit={handleSubmit} className="mt-10">
                            <div className="mb-6">
                                <label htmlFor="quantity" className="block font-normal text-base text-gray-500 mb-2">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    pattern="^[0-9]+$"
                                    inputMode="numeric"
                                    id="quantity"
                                    name="quantity"
                                    min="1"
                                    defaultValue="1"
                                    className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoadingCartItems}
                                className={`bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300 font-medium flex items-center justify-center min-w-[150px] min-h-[48px] ${isLoadingCartItems ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isLoadingCartItems ? (
                                    <>
                                        <Loader className="w-5 h-5 animate-spin mr-2" />
                                        Loading...
                                    </>
                                ) : (
                                    'Add to Cart'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Artwork;