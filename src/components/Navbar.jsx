import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../context/UseAuth";

const Navbar = () => {
  const { isLoggedIn, currentUser, removeUser } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    removeUser();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-5 py-3">
      {!isLoggedIn && (
        <>
          <NavLink className={"nav-link"} to="/">
            Home
          </NavLink>
          <NavLink className={"nav-link"} to="/login">
            Log in
          </NavLink>
          <NavLink className={"nav-link"} to="/signup">
            Sign up
          </NavLink>
        </>
      )}

      {isLoggedIn && (
        <>
          {currentUser.role === "user" && (
            <>
              <NavLink className={"nav-link"} to="/listings">
                Search
              </NavLink>
              <NavLink className={"nav-link"} to="/favorites">
                Favorites
              </NavLink>
            </>
          )}
          {currentUser.role === "business" && (
            <NavLink className={"nav-link"} to="/dashboard">
              Dashboard
            </NavLink>
          )}
          <NavLink className={"nav-link"} to="/account">
            My account
          </NavLink>
          <button className="btn btn-danger" onClick={handleClick}>
            Log out
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
