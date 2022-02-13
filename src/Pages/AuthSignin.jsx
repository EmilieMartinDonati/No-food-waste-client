import React, { useState } from "react";
import { useNavigate, Navigate, NavLink } from "react-router-dom";
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

        currentUser.role === "user"
          ? navigate("/discover")
          : navigate("/dashboard");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="background">
      <h1 className="pt-5">Sign in</h1>
      <form className="pb-5" onSubmit={handleSubmit}>
        <div className="form-group p-5">
          <label className="m-3" htmlFor="email">
            EMAIL
          </label>
          <input
            className="form-control"
            type="text"
            name="email"
            placeholder="john@doe.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="m-3" htmlFor="password">
            PASSWORD
          </label>
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="*********"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary px-5 py-2"
          style={{ backgroundColor: "#FF4646", border: 0 }}
        >
          LOG IN
        </button>
      </form>
    </div>
  );
};

export default AuthSignin;
