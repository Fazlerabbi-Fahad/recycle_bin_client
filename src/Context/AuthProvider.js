import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../Firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(false)
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogle = () => {
        setLoading(false)
        return signInWithPopup(auth, googleProvider)
    }

    const logIn = (email, password) => {
        setLoading(false)
        return signInWithEmailAndPassword(auth, email, password);
    };

    const updateUser = profile => {
        setLoading(false)
        return updateProfile(auth.currentUser, profile);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(true)
        })
        return () => unsubscribe;
    }, [])


    const logOut = () => {
        setLoading(false)
        return signOut(auth);
    }


    const authInfo = {
        user,
        setLoading,
        createUser,
        updateUser,
        loading,
        setLoading,
        logIn,
        logOut,
        signInWithGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;