import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { getCldImg } from '../../utils/cloudinary';
import { useAppContext } from '../../contexts/AppContext';
import { categories, artworks } from '../../constants/data';

const ProductGrid = () => {

    return (
        <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {artworks.map((artwork) => (
                <div key={artwork.id} className="bg-white p-4">
                    <AdvancedImage cldImg={getCldImg(artwork.imageId)} alt={artwork.name} className="w-full h-96 object-cover mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{artwork.name}</h3>
                    <p className="text-gray-600">${parseFloat(artwork.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</p>
                </div>
            ))}
        </div>
    );
};

const Sidebar = () => {
    return (
        <aside className="w-full md:w-1/4 mb-8 md:mb-0">
            <h2 className="text-3xl font-serif mb-2 text-left">Categories</h2>
            <div className="w-full h-px bg-gray-300 mb-4"></div>
            <ul className="text-left">
                {categories.map((category, index) => (
                    <li key={index} className="mb-2">
                        <a href="#" className="text-gray-600 hover:text-gray-800">{category.name}</a>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

function Shop() {

    return (

        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 h-48 content-center bg-black text-white w-full">Shop</h1>
            <div className="flex flex-col md:flex-row">
                <Sidebar />
                <ProductGrid />
            </div>
        </div>

    );
}

export default Shop;