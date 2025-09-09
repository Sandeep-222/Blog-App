import React, { createContext, useContext, useState,useEffect } from 'react';

//
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
    const [userName, setUserName] = useState(()=>{return localStorage.getItem("username") || ''});

    useEffect(() => {
        if (userName) {
            localStorage.setItem("username", userName);
        } else {
            localStorage.removeItem("username");
        }
    }, [userName]);


    return (
        <UserContext.Provider value={{ userName, setUserName }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the user name
export const useUserName = () => {
    const { userName, setUserName } = useContext(UserContext);
    return { userName, setUserName };
};
