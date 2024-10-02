import React, { createContext, useState, useContext, useMemo } from 'react';
import { Account, Databases, Client, Query } from 'appwrite';
import { AppConfig } from '../../constants/config';
import { useAsync } from 'react-use';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([{}]);

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

    const globalLoading = useMemo(() => checkUserState.loading || categoriesState.loading, [checkUserState.loading, categoriesState.loading]);

    const value = {
        user,
        cartItems,
        categories: categoriesState.value || [],
        loginWithGoogle,
        logout,
        fetchCartItems,
        isLoadingUser: checkUserState.loading,
        globalLoading
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};