import React, { createContext, useState, useEffect } from "react"
import config from "./config"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState()

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
        }
    }, [])

    const login = (userName) => {
        validateUser(userName)
    };

    const validateUser = (userName) => {
        fetch(`${config.stonkRocketApiUrl}/user/validate/${userName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error validating user with error code: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            getUser(data.id)
        })
        .catch(error => console.log('Error validating user', error))
    }

    const getUser = (userID) => {
        fetch(`${config.stonkRocketApiUrl}/user/${userID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error validating user with error code: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            setUser(data)
            setIsLoggedIn(true)
            localStorage.setItem("user", JSON.stringify(data))
        })
        .catch(error => console.log('Error validating user', error))
    }

    const logout = () => {
        setIsLoggedIn(false)
        setUser(null)
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
