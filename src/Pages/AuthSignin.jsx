import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

const AuthSignin = ({ role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const data = {
      email: email,
      password: password,
    };

    e.preventDefault();
    axios
      .post("http://localhost:4000/signin", data)
      .then((dbRes) => {
        console.log("THIS DATA RETURNED FROM SIGNIN", dbRes.data);
        role === "user" ? navigate("/discover") : navigate("/dashboard");
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
