// import FormInput from "../Components/FormInput";
// import useForm from "../Hooks/useForm";
import { useState } from "react";
import { useNavigate, NavLink} from "react-router-dom";
import axios from "axios";

const AuthSignup = ({ role }) => {
    const [values, setValues] = useState({ name: "", email: "", password: "", role: role });
    console.log(values);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setValues((prevValues) => ({
            ...prevValues,
            [e.target.id]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:4000/signup", values)
            .then((infos) => {
                console.log("This is coming back from the server !", infos.data);
                // navigate("/login", <AuthSignin role={role} />);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
        <form onSubmit={handleSubmit} onChange={handleChange}>
            <label htmlFor='name'>NAME</label>
            <input type="text" id="name" required/>
            <label htmlFor='email'>EMAIL</label>
            <input type="text" id="email" required/>
            <label htmlFor='password'>PASSWORD</label>
            <input type="password" id="password" required/>
           <button><h5>SIGN UP</h5></button>
        </form>
        <Navlink to="/login" role={role}><h3>Already registered ? Log in</h3></Navlink>
        </>
    );
};

export default AuthSignup;
