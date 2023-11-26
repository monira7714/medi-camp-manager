import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import PropTypes from 'prop-types'
import app from './../FIrebase/firebase.config';


export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const googleProvider = new GoogleAuthProvider()
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)

    }

    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut = () => {
        setLoading(true)

        return signOut(auth)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser)
            setUser(currentUser);
            setLoading(false)
        })
        return () => {
            return unSubscribe()
        }
    }, [])

    const authInfo = { user, loading, registerUser, logIn, logOut, signInWithGoogle, updateUserProfile };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}
export default AuthProvider;