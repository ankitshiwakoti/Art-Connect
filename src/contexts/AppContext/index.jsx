import React, { createContext, useState, useContext, useMemo } from 'react';
import { Account, Databases, Client, Query } from 'appwrite';
import { AppConfig } from '../../constants/config';
import { useAsync } from 'react-use';

const AppContext = createContext();

export const useAppContext = (selector) => {
    const context = useContext(AppContext);

    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }

    return selector ? selector(context) : context;
};

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    const client = new Client()
        .setEndpoint(AppConfig.endpoint)
        .setProject(AppConfig.project);

    const account = new Account(client);
    const databases = new Databases(client);

    const checkUserState = useAsync(async () => {
        try {
            const session = await account.get();
            setUser(session);
        } catch (error) {
            console.error('User not logged in', error);
        }
    }, []);

    const categoriesState = useAsync(async () => {
        try {
            const response = await databases.listDocuments(
                AppConfig.databaseId,
                AppConfig.categoriesCollectionId,
                [Query.orderAsc("sort")]
            );
            return response.documents;
        } catch (error) {
            console.error('Failed to fetch categories', error);
        }
    }, []);

    const artworksState = useAsync(async () => {
        try {
            const response = await databases.listDocuments(
                AppConfig.databaseId,
                AppConfig.artworksCollectionId,
                [Query.orderAsc("sort")]
            );
            return response.documents;
        } catch (error) {
            console.error('Failed to fetch artworks', error);
        }
    }, []);

    const artistsState = useAsync(async () => {
        try {
            const response = await databases.listDocuments(
                AppConfig.databaseId,
                AppConfig.artistsCollectionId,
                [Query.orderAsc("sort")]
            );
            return response.documents;
        } catch (error) {
            console.error('Failed to fetch artists', error);
        }
    }, []);

    const loginWithGoogle = () => {
        try {
            account.createOAuth2Session('google', process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URL, process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_FAILURE_URL);
        } catch (error) {
            console.error('Google login failed', error);
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const fetchCartItems = async () => {
        try {
            const response = await databases.listDocuments(AppConfig.databaseId, AppConfig.cartItemsCollectionId);
            setCartItems(response.documents);
        } catch (error) {
            console.error('Failed to fetch cart items', error);
        }
    };

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.$id !== itemId));
    };

    const updateQuantity = (itemId, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.$id === itemId ? { ...item, quantity } : item
            )
        );
    };

    const globalLoading = useMemo(() =>
        checkUserState.loading ||
        categoriesState.loading ||
        artworksState.loading ||
        artistsState.loading,
        [checkUserState.loading, categoriesState.loading, artworksState.loading, artistsState.loading]);

    const value = {
        user,
        cartItems,
        categoriesState,
        artworksState,
        artistsState,
        checkUserState,
        loginWithGoogle,
        logout,
        fetchCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        globalLoading
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};