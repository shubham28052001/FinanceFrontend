import React, { createContext, useState } from 'react'
import { toast } from "react-toastify"
export const UserContext = createContext();

import { useNavigate } from "react-router";
export default function AuthContext({ children }) {

    const navigate = useNavigate();

    const [user, setUser] = useState(() =>
        JSON.parse(localStorage.getItem("user")) || null
    );

    const loginUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify({ email: userData.email }));
        localStorage.setItem("accessToken", userData.accessToken);
    }

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        toast.success("You are Logout Successfully", {
            onClose: () => navigate("/")
        })
    };

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    )
}
