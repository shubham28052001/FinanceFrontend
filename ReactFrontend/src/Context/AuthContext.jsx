import React, { createContext, useState, useMemo } from 'react'
import { toast } from "react-toastify"
import { useNavigate } from 'react-router';
export const UserContext = createContext();

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
        toast.success("You are Logout Successfully");
        navigate("/")
    };

    const AuthValue = useMemo(() => ({
        user,
        loginUser,
        logoutUser
    }), [user]);

    return (
        <UserContext.Provider value={AuthValue}>
            {children}
        </UserContext.Provider>
    )
}
