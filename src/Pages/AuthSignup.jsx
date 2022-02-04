// import FormInput from "../Components/FormInput";
// import useForm from "../Hooks/useForm";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
// import axios from "axios";
import apiHandler from "../api/apiHandler";

const AuthSignup = ({ role }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: role,
  });
  console.log(values);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.id]: e.target.value,
    }));
    console.log("after the handleChange", values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("during the handleSubmit", values);
    apiHandler
      .signup(values)
      // axios
      //   .post("http://localhost:4000/api/auth/signup", values)
      .then((infos) => {
        console.log("This is coming back from the server !", infos.data);
        navigate("/login");
      })
      .catch((error) => {
        console.log("THIS IS THE ERROR", error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <label htmlFor="name">NAME</label>
        <input type="text" id="name" required />
        <label htmlFor="email">EMAIL</label>
        <input type="text" id="email" required />
        <label htmlFor="password">PASSWORD</label>
        <input type="password" id="password" required />
        <button>
          <h5>SIGN UP</h5>
        </button>
      </form>
      <NavLink to="/login" role={role}>
        <h3>Already registered ? Log in</h3>
      </NavLink>
    </>
  );
};

export default AuthSignup;
