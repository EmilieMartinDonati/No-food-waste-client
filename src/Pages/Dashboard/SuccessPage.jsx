import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>CONGRATS! YOU ARE NOW READY TO BEGIN THIS JOURNEY WITH US!</h2>
      <p>You can start by adding a new listing (click on the button below)</p>
      <button onClick={() => navigate("/listings/create")}>
        Add a listing
      </button>
    </div>
  );
};

export default SuccessPage;
