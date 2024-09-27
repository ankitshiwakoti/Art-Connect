import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto, scale, crop } from '@cloudinary/url-gen/actions/resize';
import { autoGravity, focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn"
// import { gravity } from '@cloudinary/url-gen/qualifiers';

const products = [
    { name: 'ABA Handbags', price: '$110.00 USD', imageId: 'arts/nxwzm3hvfxlypdowde9v' },
    { name: 'Comme des Garcons', price: '$85.00 USD', imageId: 'arts/c9j78diall05ewsc47m1' },
    { name: 'Luxury Group Wallet', price: '$42.00 USD', imageId: 'arts/h4eijytrgg5zh0rtadnh' },
    { name: 'Fancy Shemale Ring', price: '$20.00 USD', imageId: 'arts/gfprqtjpqgwgglvv49ox' },
    { name: 'Julian Grey Hat', price: '$30.00 USD', imageId: 'arts/xfqrfx1qs4vaeudadmuq' },
    { name: 'Marble Cylinder Planter', price: '$20.00 USD', imageId: 'arts/okdxucdkzaj9mvlkwfj5' },
];

const artists = [
    { name: 'Wade', imageId: 'arts/z1kwfgkevhhamzxfepdg' },
    { name: 'Abigail', imageId: 'arts/pav4stay0vdtbcom8yto' },
    { name: 'Luke', imageId: 'arts/zumtbszqgpbanzzfekdm' },
    { name: 'Mia', imageId: 'arts/es6sjedzkzrvm7da2lvk' },
    { name: 'Noah', imageId: 'arts/ks9cnowljvcxxp32ix6v' },
    { name: 'Olivia', imageId: 'arts/gik2nejivvjl7j6yd9x1' },
];

function Home() {

    const cld = new Cloudinary({ cloud: { cloudName: 'dqaidz667' } });

    // Use this sample image or upload your own via the Media Explorer
    const heroImage = cld
        .image('art-connect-hero')
        .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
        .quality('auto')
        .resize(auto().gravity(autoGravity())); // Transform the image: auto-crop to square aspect_ratio

    const getCldImg = (imageId, width, height) => {
        const img = cld.image(imageId).format('auto').quality('auto');
        if (width && height) {
            img.resize(auto().width(width).height(height));
        } else if (width) {
            img.resize(auto().width(width));
        } else if (height) {
            img.resize(auto().height(height));
        } else {
            img.resize(auto().gravity(autoGravity()))
        }
        return img;
    }

    //console.log(optimizeUrl);
    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-screen">
                <AdvancedImage cldImg={heroImage} alt="Hero" className="w-full h-full object-cover" />
                {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-bold mb-4">Perfect eCommerce Webflow Template to Get Started</h1>
                        <button className="bg-white text-black px-6 py-2 rounded">Get Started</button>
                    </div>
                </div> */}
            </section>

            {/* Categories */}
            <section className="container mx-auto px-4 py-16 grid grid-cols-4 gap-4">
                <div className="bg-gray-900 text-white p-8 text-center">
                    <h2 className="text-2xl">Paintings</h2>
                </div>
                <div className="bg-gray-900 text-white p-8 text-center">
                    <h2 className="text-2xl">Abstract Art</h2>
                </div>
                <div className="bg-gray-900 text-white p-8 text-center">
                    <h2 className="text-2xl">Oil Paintings</h2>
                </div>
                <div className="bg-gray-900 text-white p-8 text-center">
                    <h2 className="text-2xl">Landscapes</h2>
                </div>
            </section>

            {/* Featured Products */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-2">Featured Artworks</h2>
                <div className="bg-black w-12 h-px mx-auto mt-5 mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <div key={index} className="text-center">
                            <AdvancedImage cldImg={getCldImg(product.imageId)} alt={product.name} className="w-full h-96 object-cover mb-4" />
                            <h3 className="text-xl font-semibold">{product.name}</h3>
                            <p className="text-gray-600">{product.price}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Artists */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-2">Featured Artists</h2>
                <div className="bg-black w-12 h-px mx-auto mt-5 mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {artists.map((product, index) => (
                        <div key={index} className="text-center">
                            <AdvancedImage cldImg={getCldImg(product.imageId)} alt={product.name} className="w-full h-96 object-cover mb-4" />
                            <h3 className="text-xl font-semibold">{product.name}</h3>
                        </div>
                    ))}
                </div>
            </section>


        </div>
    );
}

export default Home;