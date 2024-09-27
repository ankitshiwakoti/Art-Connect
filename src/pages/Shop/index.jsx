import React from 'react';

const products = [
    { name: 'ABA Handbags', price: '$110.00 USD', image: '/placeholder.svg?height=300&width=300' },
    { name: 'Comme des Garcons', price: '$85.00 USD', image: '/placeholder.svg?height=300&width=300' },
    { name: 'Luxury Group Wallet', price: '$42.00 USD', image: '/placeholder.svg?height=300&width=300' },
    { name: 'Fancy Shemale Ring', price: '$20.00 USD', image: '/placeholder.svg?height=300&width=300' },
    { name: 'Julian Grey Hat', price: '$30.00 USD', image: '/placeholder.svg?height=300&width=300' },
    { name: 'Marble Cylinder Planter', price: '$20.00 USD', image: '/placeholder.svg?height=300&width=300' },
];

function Shop() {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-8">Shop Our Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, index) => (
                    <div key={index} className="text-center">
                        <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4" />
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <p className="text-gray-600">{product.price}</p>
                        <button className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800">Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Shop;