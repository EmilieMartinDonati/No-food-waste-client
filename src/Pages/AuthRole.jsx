import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Creating a component that will be the first UI displayed to the user when launching the website
const AuthRole = ({ setRole }) => {
  const navigate = useNavigate();

  // Function to redirect the user to the signin page
  const handleUserSubmit = () => {
    setRole("user");
    navigate("/signup");
  };

  // Function to redirect the user to the loginpage AFTER having changed its role to business
  const handleBusinessSubmit = () => {
    setRole("business");
    navigate("/signup");
  };

  // Return a simple DOM element with one header and two buttons to choose your role on the platform
  return (
    <div>
      <h1>How will you help us stop wasting food?</h1>
      <button onClick={handleUserSubmit}>I will buy food</button>
      <button onClick={handleBusinessSubmit}>I will sell food</button>
    </div>
  );
};

export default AuthRole;
