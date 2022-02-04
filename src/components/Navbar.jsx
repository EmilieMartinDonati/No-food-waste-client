import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "./../context/UseAuth";

const Navbar = () => {
  const { loggedIn, currentUser } = useAuth;

  return (
    <nav>
      {!loggedIn && (
        <>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Log in</NavLink>
          <NavLink to="/signup">Sign up</NavLink>
        </>
      )}

      {loggedIn && currentUser.role === "user" && (
        <>
          <NavLink to="/listings">Search</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
          <NavLink to="/account">My account</NavLink>
          <NavLink to="/logout">Log out</NavLink>
        </>
      )}

      {loggedIn && currentUser.role === "business" && (
        <NavLink to="/dashboard">Dashboard</NavLink>
      )}
    </nav>
  );
};

export default Navbar;
