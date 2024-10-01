import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { Account, Databases, Client } from 'appwrite';
import { AppConfig } from '../../constants/config';
//import { Cloudinary } from "@cloudinary/url-gen";
import { categories as categoriesData } from '../../constants/data';
const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);



export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([{}]);
    const [categories, setCategories] = useState(categoriesData);
    //const [cld, setCld] = useState(null);


    const client = new Client()
        .setEndpoint(AppConfig.endpoint)
        .setProject(AppConfig.project);

    const account = new Account(client);
    const databases = new Databases(client);

    //const cld = new Cloudinary({ cloud: { cloudName: 'dqaidz667' } });

    const checkUser = useCallback(async () => {
        try {
            const session = await account.get();
            setUser(session);
        } catch (error) {
            console.error('User not logged in', error);
        }
    }, []);

    useEffect(() => {

        checkUser();
        //setCld(new Cloudinary({ cloud: { cloudName: 'dqaidz667' } }));
        //subscribeToCart();
    }, [checkUser]);

    

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
        categories,
        //cld,
        loginWithGoogle,
        logout,
        fetchCartItems,
        setCategories,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};