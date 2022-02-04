import React from "react";

const DescribeYourBusiness = () => {
  return (
    <div>
      <h2>Describe your business</h2>
      <p>
        Please tell us a little bit more about your business so that we can
        settle your account
      </p>

      <h3>Confirm the name and location of your business</h3>
      <input type="text" />
      <input type="text" />

      <h3>Which segment best describes your business?</h3>
      <select name="text" id="">
        <option value="japonais">japonais</option>
        <option value="coréen">coréen</option>
        <option value="thaï">thaï</option>
      </select>

      <button>Register</button>
    </div>
  );
};

export default DescribeYourBusiness;
