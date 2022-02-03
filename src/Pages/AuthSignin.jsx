import { useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

const AuthSignin = ({role}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        const data = {
            email: email,
            password: password
        }

        e.preventDefault();
        axios.post("localhost/signin", data)
            .then((dbRes) => {
                console.log(dbRes.data);
                role === "user" ? navigate('/discover') : navigate('/dashboard');
            })
            .catch((e) => console.log(err))
    }


    return (
        <h1>FORM</h1>
    )
}

export default AuthSignin;