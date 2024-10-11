import React, { useState, useEffect, useMemo } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { getCldImg } from '../../utils/cloudinary';
import { useAppContext } from '../../contexts/AppContext';
//import { artworks } from '../../constants/data';
import Title from '../../components/Title';
import { Link, useParams } from 'react-router-dom';

const ProductGrid = ({ filteredArtworks }) => {

    return (
        <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-8">
            {filteredArtworks.map((artwork) => (
                <Link to={`/artwork/${artwork.$id}`} key={artwork.$id} className="bg-white p-4 group">
                    <div className="overflow-hidden">
                        <img src={getCldImg(artwork.imageId).toURL()} alt="" className="w-full h-128 object-cover transform transition duration-300 group-hover:scale-105" />
                    </div>
                    <h3 className="text-lg font-semibold">{artwork.name}</h3>
                    <p className="text-gray-600">${parseFloat(artwork.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</p>
                </Link>
            ))}
        </div>
    );
};

const Sidebar = ({ currentCategory }) => {
    const { categories } = useAppContext((context) => {
        return {
            categories: context.categoriesState.value || [],
        }
    });
    return (
        <aside className="w-full md:w-1/4 mb-8 md:mb-0">
            <h2 className="text-3xl font-serif mb-2 text-left">Categories</h2>
            <div className="w-full h-px bg-gray-300 mb-4"></div>
            <ul className="text-left">
                <li className="mb-2">
                    <Link to="/shop" className={`text-gray-600 hover:text-gray-800 ${!currentCategory ? 'font-bold' : ''}`}>All</Link>
                </li>
                {categories.map((category) => (
                    <li key={category.$id} className="mb-2">
                        <Link
                            to={`/shop/${category.code}`}
                            className={`text-gray-600 hover:text-gray-800 ${currentCategory === category.code ? 'font-bold' : ''}`}
                        >
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

function Shop() {
    const { category } = useParams();
    const { categories, artworks } = useAppContext((context) => {
        return {
            categories: context.categoriesState.value || [],
            artworks: context.artworksState.value || [],
        }
    });

    const filteredArtworks = useMemo(() => {
        if (category) {
            const categoryObj = categories.find(cat => cat.code === category);
            if (categoryObj) {
                return artworks.filter(artwork => artwork.category?.$id === categoryObj.$id);
            }
        }
        return artworks;
    }, [category, categories, artworks]);



    return (

        <div className="container mx-auto pb-4">
            <Title>Shop</Title>
            <div className="flex flex-col md:flex-row">
                <Sidebar currentCategory={category} />
                <ProductGrid filteredArtworks={filteredArtworks} />
            </div>
        </div>

    );
}

export default Shop;