import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "./../context/UseAuth";

const Navbar = () => {
  const { isLoggedIn, currentUser, removeUser } = useAuth();

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
          {currentUser.role === "user" && (
            <>
              <NavLink to="/listings">Search</NavLink>
              <NavLink to="/favorites">Favorites</NavLink>
            </>
          )}
          {currentUser.role === "business" && (
            <NavLink to="/dashboard">Dashboard</NavLink>
          )}
          <NavLink to="/account">My account</NavLink>
          <button onClick={removeUser}>Log out</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
