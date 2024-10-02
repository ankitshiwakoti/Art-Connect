export const AppConfig = {
    endpoint: process.env.REACT_APP_APPWRITE_ENDPOINT,
    project: process.env.REACT_APP_APPWRITE_PROJECT,
    databaseId: process.env.REACT_APP_APPWRITE_DATABASE_ID,
    categoriesCollectionId: process.env.REACT_APP_APPWRITE_CATEGORIES_COLLECTION_ID,
    artistsCollectionId: process.env.REACT_APP_APPWRITE_ARTISTS_COLLECTION_ID,
    artworksCollectionId: process.env.REACT_APP_APPWRITE_ARTWORKS_COLLECTION_ID,

    cartItemsCollectionId: process.env.REACT_APP_APPWRITE_CART_ITEMS_COLLECTION_ID,
}