// import FormInput from "../Components/FormInput";
// import useForm from "../Hooks/useForm";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AuthSignup = ({ role }) => {
    const [values, setValues] = useState({ name: "", email: "", password: "", role });

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
                navigate("/login");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <h1>FORM</h1>
    );
};

export default AuthSignup;
