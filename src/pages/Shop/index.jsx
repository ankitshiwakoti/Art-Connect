import React, { useState, useEffect } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { getCldImg } from '../../utils/cloudinary';
import { useAppContext } from '../../contexts/AppContext';
import { artworks } from '../../constants/data';
import Title from '../../components/Title';
import { Link, useParams } from 'react-router-dom';

const ProductGrid = ({ filteredArtworks }) => {

    return (
        <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredArtworks.map((artwork) => (
                <div key={artwork.id} className="bg-white p-4">
                    <AdvancedImage cldImg={getCldImg(artwork.imageId)} alt={artwork.name} className="w-full h-96 object-cover mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{artwork.name}</h3>
                    <p className="text-gray-600">${parseFloat(artwork.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</p>
                </div>
            ))}
        </div>
    );
};

const Sidebar = ({ currentCategory }) => {
    const { categories } = useAppContext();
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
    const { categories } = useAppContext();
    const [filteredArtworks, setFilteredArtworks] = useState(artworks);

    useEffect(() => {
        if (category) {
            const categoryObj = categories.find(cat => cat.code === category);
            if (categoryObj) {
                setFilteredArtworks(artworks.filter(artwork => artwork.categoryId === categoryObj.id));
            }
        } else {
            setFilteredArtworks(artworks);
        }
    }, [category]);

    return (

        <div className="container mx-auto py-1">
            <Title>Shop</Title>
            <div className="flex flex-col md:flex-row">
                <Sidebar currentCategory={category} />
                <ProductGrid filteredArtworks={filteredArtworks} />
            </div>
        </div>

    );
}

export default Shop;