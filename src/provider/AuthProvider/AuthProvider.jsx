import React, { useState, useEffect } from 'react';
import app from '../../Firebase/firebase.config';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} from "firebase/auth";
import axios from 'axios';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const API_URL = import.meta.env.VITE_API_Link;

    // Auth state observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // Check if user exists in our database
                try {
                    const response = await axios.get(`${API_URL}/users/${currentUser.email}`);
                    if (!response.data) {
                        // User doesn't exist in our DB, create them
                        await createBackendUser(currentUser);
                    }
                } catch (err) {
                    console.error("Error checking user:", err);
                }
            }
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [auth]);

    // Create user in our backend
    const createBackendUser = async (firebaseUser) => {
        try {
            const userData = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName || '',
                photoURL: firebaseUser.photoURL || '',
                provider: firebaseUser.providerData[0]?.providerId || 'email'
            };

            await axios.post(`${API_URL}/users`, userData);
        } catch (err) {
            console.error("Error creating backend user:", err);
        }
    };

    // Auth functions
    const signUp = async ({ displayName, email, password, phoneNumber }) => {
        setLoading(true);
        setError(null);
        
        try {
            // First check if user exists in our backend
            const checkResponse = await axios.get(`${API_URL}/users/${email}`);
            if (checkResponse.data) {
                throw new Error('User already exists with this email');
            }

            // Create Firebase user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Update profile with display name
            await updateProfile(userCredential.user, { displayName });

            // Create user in our backend
            await createBackendUser({
                ...userCredential.user,
                displayName,
                phoneNumber
            });

            return userCredential;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email, password) => {
        setLoading(true);
        setError(null);
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            // Verify user exists in our backend
            await axios.get(`${API_URL}/users/${email}`);
            
            return userCredential;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            
            // Check if user exists in our backend
            try {
                await axios.get(`${API_URL}/users/${user.email}`);
            } catch (err) {
                // User doesn't exist, create them
                if (err.response?.status === 404) {
                    await createBackendUser(user);
                } else {
                    throw err;
                }
            }
            
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth)
            .finally(() => setLoading(false));
    };

    const authInfo = {
        user,
        loading,
        error,
        signUp,
        signIn,
        signInWithGoogle,
        logOut
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;