import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    const { isLogIn } = useSelector((state) => state.auth);

    return isLogIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
