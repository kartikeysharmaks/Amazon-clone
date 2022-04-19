import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ProtectedRoute = ({ children }) => {
    const [user] = useAuthState(auth);

    console.log("Check user in Private: ", user);
    if (!user) {
        return <Navigate to = "/" /> ;
    }
    return children;
};

export default ProtectedRoute;