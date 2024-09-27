import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { getCldImg } from '../../utils/cloudinary';
import { useAppContext } from '../../contexts/AppContext';
const products = [
    { id: 1, name: 'Corey Muranis Ring', price: 40.00, imageId: 'arts/z1kwfgkevhhamzxfepdg' },
    { id: 2, name: 'Johan Grey Hat', price: 80.00, imageId: 'arts/pav4stay0vdtbcom8yto' },
    { id: 3, name: 'Marble Cylinder Planter', price: 120.00, imageId: 'arts/zumtbszqgpbanzzfekdm' },
    { id: 4, name: 'Luxury Group Wallet', price: 472.00, imageId: 'arts/h4eijytrgg5zh0rtadnh' },
    { id: 5, name: 'Comme des Garcons', price: 88.00, imageId: 'arts/c9j78diall05ewsc47m1' },
    { id: 6, name: 'ARA Handbags', price: 131.00, imageId: 'arts/okdxucdkzaj9mvlkwfj5' },
];

const ProductGrid = () => {

    return (
        <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
                <div key={product.id} className="bg-white p-4">
                    <AdvancedImage cldImg={getCldImg(product.imageId)} alt={product.name} className="w-full h-64 object-cover mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600">${product.price.toFixed(2)} USD</p>
                </div>
            ))}
        </div>
    );
};

const categories = ['Accessories', 'Jewelry', 'Bags', 'Objects', 'Hats'];

const Sidebar = () => {
    return (
        <aside className="w-full md:w-1/4 mb-8 md:mb-0">
            <h2 className="text-3xl font-serif mb-2 text-left">Categories</h2>
            <div className="w-full h-px bg-gray-300 mb-4"></div>
            <ul className="text-left">
                {categories.map((category, index) => (
                    <li key={index} className="mb-2">
                        <a href="#" className="text-gray-600 hover:text-gray-800">{category}</a>
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