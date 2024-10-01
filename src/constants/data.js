export const products = [
    { name: 'ABA Handbags', price: '$110.00 USD', imageId: 'arts/nxwzm3hvfxlypdowde9v' },
    { name: 'Comme des Garcons', price: '$85.00 USD', imageId: 'arts/c9j78diall05ewsc47m1' },
    { name: 'Luxury Group Wallet', price: '$42.00 USD', imageId: 'arts/h4eijytrgg5zh0rtadnh' },
    { name: 'Fancy Shemale Ring', price: '$20.00 USD', imageId: 'arts/gfprqtjpqgwgglvv49ox' },
    { name: 'Julian Grey Hat', price: '$30.00 USD', imageId: 'arts/xfqrfx1qs4vaeudadmuq' },
    { name: 'Marble Cylinder Planter', price: '$20.00 USD', imageId: 'arts/okdxucdkzaj9mvlkwfj5' },
];

// export const artists = [
//     { name: 'Wade', imageId: 'arts/z1kwfgkevhhamzxfepdg' },
//     { name: 'Abigail', imageId: 'arts/pav4stay0vdtbcom8yto' },
//     { name: 'Luke', imageId: 'arts/zumtbszqgpbanzzfekdm' },
//     // { name: 'Mia', imageId: 'arts/es6sjedzkzrvm7da2lvk' },
//     // { name: 'Noah', imageId: 'arts/ks9cnowljvcxxp32ix6v' },
//     // { name: 'Olivia', imageId: 'arts/gik2nejivvjl7j6yd9x1' },
// ];

export const categories = [
    { id: 1, code: 'paintings', name: 'Paintings' },
    { id: 2, code: 'abstract-art', name: 'Abstract Art' },
    { id: 3, code: 'oil-paintings', name: 'Oil Paintings' },
    { id: 4, code: 'landscapes', name: 'Landscapes' },
];

export const artists = [
    {
        id: 1,
        name: 'Emma Thompson',
        email: 'emma.thompson@art.com',
        phoneNumber: '+1 (555) 123-4567',
        isFeatured: true,
        description: 'Contemporary abstract painter known for bold colors and geometric shapes.'
    },
    {
        id: 2,
        name: 'Michael Chen',
        email: 'michael.chen@art.com',
        phoneNumber: '+1 (555) 234-5678',
        isFeatured: true,
        description: 'Sculptor specializing in large-scale metal installations.'
    },
    {
        id: 3,
        name: 'Sophia Li',
        email: 'sophia.li@art.com',
        phoneNumber: '+1 (555) 345-6789',
        isFeatured: true,
        description: 'Photographer focusing on urban landscapes and street scenes.'
    },
    {
        id: 4,
        name: 'Lucas Dubois',
        email: 'lucas.dubois@art.com',
        phoneNumber: '+1 (555) 456-7890',
        isFeatured: false,
        description: 'Digital artist creating surreal and futuristic compositions.'
    },
    {
        id: 5,
        name: 'Aisha Patel',
        email: 'aisha.patel@art.com',
        phoneNumber: '+1 (555) 567-8901',
        isFeatured: false,
        description: 'Mixed media artist exploring themes of identity and culture.'
    },
    {
        id: 6,
        name: 'Daniel Kim',
        email: 'daniel.kim@art.com',
        phoneNumber: '+1 (555) 678-9012',
        isFeatured: false,
        description: 'Minimalist painter focusing on monochromatic landscapes.'
    },
];

export const artworks = [
    {
        id: 1,
        name: 'Vibrant Horizon',
        imageId: 'arts/nxwzm3hvfxlypdowde9v',
        price: 2500.00,
        description: 'An abstract landscape painting with vivid sunset colors.',
        isFeatured: true,
        isMasterpiece: false,
        artistId: 1,
        categoryId: 1
    },
    {
        id: 2,
        name: 'Steel Waves',
        imageId: 'arts/c9j78diall05ewsc47m1',
        price: 8000.00,
        description: 'A flowing metal sculpture inspired by ocean waves.',
        isFeatured: true,
        isMasterpiece: false,
        artistId: 2,
        categoryId: 2
    },
    {
        id: 3,
        name: 'Urban Reflections',
        imageId: 'arts/h4eijytrgg5zh0rtadnh',
        price: 1800.00,
        description: 'A black and white photograph of city skyscrapers reflected in water.',
        isFeatured: true,
        isMasterpiece: false,
        artistId: 3,
        categoryId: 3
    },
    {
        id: 4,
        name: 'Digital Dreams',
        imageId: 'arts/gfprqtjpqgwgglvv49ox',
        price: 1200.00,
        description: 'A surreal digital composition blending nature and technology.',
        isFeatured: true,
        isMasterpiece: false,
        artistId: 4,
        categoryId: 4
    },
    {
        id: 5,
        name: 'Cultural Tapestry',
        imageId: 'arts/xfqrfx1qs4vaeudadmuq',
        price: 3500.00,
        description: 'A mixed media piece exploring diverse cultural symbols.',
        isFeatured: true,
        isMasterpiece: false,
        artistId: 5,
        categoryId: 1
    },
    {
        id: 6,
        name: 'Serene Silence',
        imageId: 'arts/okdxucdkzaj9mvlkwfj5',
        price: 2200.00,
        description: 'A minimalist white-on-white painting of a winter landscape.',
        isFeatured: true,
        isMasterpiece: false,
        artistId: 6,
        categoryId: 1
    },
    {
        id: 7,
        name: 'Neon Nights',
        imageId: 'arts/z1kwfgkevhhamzxfepdg',
        price: 1500.00,
        description: 'A vibrant digital artwork depicting a futuristic cityscape.',
        isFeatured: false,
        isMasterpiece: true,
        artistId: 4,
        categoryId: 4
    },
    {
        id: 8,
        name: 'Organic Forms',
        imageId: 'arts/pav4stay0vdtbcom8yto',
        price: 6500.00,
        description: 'A series of interconnected bronze sculptures inspired by plant life.',
        isFeatured: false,
        isMasterpiece: true,
        artistId: 2,
        categoryId: 2
    },
    {
        id: 9,
        name: 'Fragmented Memories',
        imageId: 'arts/zumtbszqgpbanzzfekdm',
        price: 2800.00,
        description: 'An abstract painting exploring themes of memory and time.',
        isFeatured: false,
        isMasterpiece: true,
        artistId: 1,
        categoryId: 1
    },
    {
        id: 10,
        name: 'Hidden Alleyways',
        imageId: 'arts/es6sjedzkzrvm7da2lvk',
        price: 1600.00,
        description: 'A series of intimate photographs showcasing urban back streets.',
        isFeatured: false,
        isMasterpiece: true,
        artistId: 3,
        categoryId: 3
    },
    {
        id: 11,
        name: 'Digital Bloom',
        imageId: 'arts/ks9cnowljvcxxp32ix6v',
        price: 950.00,
        description: 'A digital artwork of fantastical, glowing flowers.',
        isFeatured: false,
        isMasterpiece: true,
        artistId: 6,
        categoryId: 4
    },
    {
        id: 12,
        name: 'Echoes of Tradition',
        imageId: 'arts/gik2nejivvjl7j6yd9x1',
        price: 4200.00,
        description: 'A large-scale mixed media piece blending traditional and modern motifs.',
        isFeatured: false,
        isMasterpiece: true,
        artistId: 5,
        categoryId: 1
    },
];


export const setCategory = (artwork) => {
    const category = categories.find(category => category.id === artwork.categoryId);
    return {
        ...artwork,
        category: category
    }
}

export const featuredArtworks = artworks.filter(artwork => artwork.isFeatured);

export const featuredArtists = artists.filter(artist => artist.isFeatured && artworks.find(artwork => artwork.artistId === artist.id && artwork.isMasterpiece)).map(artist => {
    const artwork = artworks.find(artwork => artwork.artistId === artist.id && artwork.isMasterpiece);
    return {
        ...artist,
        masterpieceImageId: artwork.imageId,
        artwork: setCategory(artwork)
    }
});

export const allArtistsWithMasterpiece = artists.map(artist => {
    const artwork = artworks.find(artwork => artwork.artistId === artist.id && artwork.isMasterpiece);
    return {
        ...artist,
        masterpieceImageId: artwork.imageId,
        artwork: setCategory(artwork)
    }
});

export const getArtistWithArtworksById = (id) => {
    const artist = artists.find(artist => artist.id === id);
    return {
        ...artist,
        artworks: artworks.filter(artwork => artwork.artistId === id).map(artwork => setCategory(artwork))
    }
}


