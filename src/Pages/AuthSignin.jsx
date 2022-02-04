import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import apiHandler from "./../API/APIHandler";
import useAuth from "./../context/UseAuth";

const AuthSignin = ({ role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { storeToken, authenticateUser, currentUser } = useAuth();

  console.log("This is current user", currentUser);

  const handleSubmit = (e) => {
    const data = {
      email: email,
      password: password,
    };

    console.log("data in AuthSignin line 20", data);
    e.preventDefault();
    apiHandler
      .signin(data)
      .then((res) => {
        storeToken(res.authToken);
        authenticateUser();
        // role === "user" ? navigate("/discover") : navigate("/dashboard");
        currentUser.role === "user"
          ? navigate("/discover")
          : navigate("/dashboard");
      })
      .catch((e) => console.log(err));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">EMAIL</label>
        <input
          type="text"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">PASSWORD</label>
        <input
          type="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>
          <h5>LOG IN</h5>
        </button>
      </form>
    </>
  );
};

export default AuthSignin;
