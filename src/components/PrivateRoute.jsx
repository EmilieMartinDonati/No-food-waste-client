import React from "react";
import useAuth from "../context/UseAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isLoggedIn, currentUser } = useAuth();

  console.log(currentUser.role);

  if (!isLoggedIn) return <Navigate to="/login" />;
  else return <Outlet />;
};

export default PrivateRoute;
