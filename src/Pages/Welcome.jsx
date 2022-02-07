import React, { useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Welcome = ({role}) => {

    const navigate = useNavigate();


    useEffect(() => {
        role === "user" ? navigate("/discover") : navigate("/dashboard");
    }, [])

    return (
        <div><h1>Loading ... </h1></div>
    )
}

export default Welcome;