import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { Account, Databases, Client, Query } from 'appwrite';
import { AppConfig } from '../../constants/config';
// Remove the import for categories from data.js

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([{}]);
    const [categories, setCategories] = useState([]); // Initialize as an empty array
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

    const globalLoading = useMemo(() => isLoadingUser || isLoadingCategories, [isLoadingUser, isLoadingCategories]);

    const client = new Client()
        .setEndpoint(AppConfig.endpoint)
        .setProject(AppConfig.project);

    const account = new Account(client);
    const databases = new Databases(client);

    const checkUser = useCallback(async () => {
        setIsLoadingUser(true);
        try {
            const session = await account.get();
            setUser(session);
        } catch (error) {
            //console.error('User not logged in', error);
        } finally {
            setIsLoadingUser(false);
        }
    }, []);

    const fetchCategories = useCallback(async () => {
        setIsLoadingCategories(true);
        try {
            const response = await databases.listDocuments(
                AppConfig.databaseId,
                AppConfig.categoriesCollectionId,
                [Query.orderAsc("sort")]
            );
            setCategories(response.documents);
        } catch (error) {
            console.error('Failed to fetch categories', error);
        } finally {
            setIsLoadingCategories(false);
        }
    }, []);

    useEffect(() => {
        checkUser();
        fetchCategories();
    }, [checkUser, fetchCategories]);

    // ... rest of the code remains the same

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
        categories,
        loginWithGoogle,
        logout,
        fetchCartItems,
        setCategories,
        isLoadingUser,
        setIsLoadingUser,
        globalLoading
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};