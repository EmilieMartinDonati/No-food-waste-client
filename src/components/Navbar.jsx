import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "./../context/UseAuth";

const Navbar = () => {
  const { isLoggedIn, currentUser } = useAuth();

  return (
    <nav>
      {!isLoggedIn && (
        <>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Log in</NavLink>
          <NavLink to="/signup">Sign up</NavLink>
        </>
      )}

      {isLoggedIn && (
        <>
          <NavLink to="/listings">Search</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
          <NavLink to="/account">My account</NavLink>
          <NavLink to="/logout">Log out</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </>
      )}
    </nav>
  );
};

export default Navbar;
