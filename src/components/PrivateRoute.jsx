import React from "react";
import useAuth from "../context/UseAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isLoggedIn, currentUser } = useAuth();

  // console.log(currentUser.role);

  if (!isLoggedIn) {
    console.log("Hello I'm in private route live 11");
    return <Navigate to="/login" />;
  } else return <Outlet />;
};

export default PrivateRoute;
