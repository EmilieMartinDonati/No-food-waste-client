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
    <nav
      className="navbar navbar-secondary px-5 py-4 text-uppercase"
      style={{
        backgroundColor: "#FF4646",
      }}
    >
      {!isLoggedIn && (
        <>
          <NavLink className={"topLink"} to="/">
            Home
          </NavLink>
          <NavLink className={"topLink"} to="/login">
            Log in
          </NavLink>
          <NavLink className={"topLink"} to="/signup">
            Sign up
          </NavLink>
        </>
      )}

      {isLoggedIn && (
        <>
          {currentUser.role === "user" && (
            <>
              <NavLink className={"topLink"} to="/listings">
                Search
              </NavLink>
              <NavLink className={"topLink"} to="/favorites">
                Favorites
              </NavLink>
            </>
          )}
          {currentUser.role === "business" && (
            <NavLink className={"topLink"} to="/dashboard">
              Dashboard
            </NavLink>
          )}
          <NavLink className={"topLink"} to="/account">
            My account
          </NavLink>
          <button
            className="btn btn-secondary"
            onClick={handleClick}
            style={{ backgroundColor: "#FFB396", border: 0, color: "red" }}
          >
            Log out
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
