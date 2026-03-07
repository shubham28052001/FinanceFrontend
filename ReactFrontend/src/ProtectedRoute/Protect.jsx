import React, { useContext } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../Context/AuthContext";


export default function Protect({ children }) {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/" replace/>
    }
    return children;
}
