import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { Account, Databases, Client } from 'appwrite';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const AppConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    project: '66f6063c00080b6b7fd2',
    databaseId: '',
    productsCollectionId: '66db29840027eb3bc43d',
    cartItemsCollectionId: '66db2bc7002a0572d169',
}

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    const client = new Client()
        .setEndpoint(AppConfig.endpoint)
        .setProject(AppConfig.project);

    const account = new Account(client);
    const databases = new Databases(client);

    useEffect(() => {
        checkUser();
        //subscribeToCart();
    }, []);

    const checkUser = useCallback(async () => {
        try {
            const session = await account.get();
            setUser(session);
        } catch (error) {
            console.error('User not logged in', error);
        }
    }, []);

    const loginWithGoogle = async () => {
        try {
            await account.createOAuth2Session('google', 'http://localhost:3000', 'http://localhost:3000/login-failed');
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

    const subscribeToCart = () => {
        const unsubscribe = databases.subscribe(AppConfig.databaseId, AppConfig.cartItemsCollectionId, (response) => {
            if (response.events.includes('databases.*.collections.*.documents.*')) {
                // Update cart items when there's a change
                fetchCartItems();
            }
        });

        return unsubscribe;
    };

    const fetchCartItems = async () => {
        try {
            const response = await databases.listDocuments(AppConfig.databaseId, AppConfig.cartItemsCollectionId);
            setCartItems(response.documents);
        } catch (error) {
            console.error('Failed to fetch cart items', error);
        }
    };



    const value = {
        user,
        cartItems,
        loginWithGoogle,
        logout,
        fetchCartItems,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};