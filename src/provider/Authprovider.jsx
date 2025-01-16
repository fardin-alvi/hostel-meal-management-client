import { createContext, useEffect, useState } from 'react';
import auth from "../Firebase/Firebase.init";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from '../hooks/useAxiosPublic';
import axios from 'axios';

export const Authcontext = createContext(null)
const provider = new GoogleAuthProvider();

const Authprovider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const axiosPublic = useAxiosPublic()

    const CreateUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const singinWithGoogle = () => {
        return signInWithPopup(auth, provider)
    }

    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        setLoading(true)
        return signOut(auth)
    };

    const updateprofile = (updatedate) => {
        return updateProfile(auth.currentUser, updatedate)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser.email }
                axios.post('http://localhost:5000/jwt', userInfo)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                            setLoading(false)
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token')
                setLoading(false)
            }

        })
        return () => {
            return unSubscribe()
        }
    }, [axiosPublic])


    const authinfo = {
        CreateUser,
        singinWithGoogle,
        user,
        setUser,
        login,
        logout,
        loading,
        setLoading,
        updateprofile,
    }

    return (
        <Authcontext.Provider value={authinfo}>
            {children}
        </Authcontext.Provider>
    );
};

export default Authprovider;