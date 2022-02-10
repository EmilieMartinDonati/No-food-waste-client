// import FormInput from "../Components/FormInput";
// import useForm from "../Hooks/useForm";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
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
        console.log("This is coming back from the server !", infos);
        navigate("/login");
      })
      .catch((error) => {
        console.log("THIS IS THE ERROR", error);
      });
  };

  return (
    <>
      <h2 className="pt-5">Create an account</h2>
      <form onSubmit={handleSubmit} onChange={handleChange} className="pb-5">
        <div className="form-group p-5">
          <label className="m-3" htmlFor="name">
            NAME
          </label>
          <input className="form-control" type="text" id="name" required />
          <label className="m-3" htmlFor="email">
            EMAIL
          </label>
          <input className="form-control" type="text" id="email" required />
          <label className="m-3" htmlFor="password">
            PASSWORD
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            required
          />
        </div>
        <button className="btn btn-primary px-5 py-2">SIGN UP</button>
      </form>
      <NavLink to="/login" role={role}>
        <h3>Already registered ? Log in</h3>
      </NavLink>
    </>
  );
};

export default AuthSignup;
