import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/listings">Search</NavLink>
      <NavLink to="/favorites">Favorites</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/account">My account</NavLink>
      <NavLink to="/login">Log in</NavLink>
      <NavLink to="/signup">Sign up</NavLink>
      <NavLink to="/logout">Log out</NavLink>
    </nav>
  );
};

export default Navbar;
