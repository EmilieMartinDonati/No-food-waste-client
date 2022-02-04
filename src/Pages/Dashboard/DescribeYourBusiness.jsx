import React, { useState } from "react";

const DescribeYourBusiness = ({ setBusiness, setStep }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  const handleClick = () => {
    setBusiness((prevValues) => {
      return { ...prevValues, name, address, phone, description };
    });
    setStep(2);
  };

  return (
    <div>
      <h2>Describe your business</h2>
      <p>
        Please tell us a little bit more about your business so that we can
        settle your account
      </p>

      <h3>Confirm the name and location of your business</h3>

      <input
        type="text"
        name="name"
        placeholder="Name of your business"
        onChange={(evt) => setName(evt.target.value)}
      />

      <input
        type="text"
        name="address"
        placeholder="Address of your business"
        onChange={(evt) => setAddress(evt.target.value)}
      />

      <input
        type="number"
        name="phone"
        placeholder="Phone number"
        onChange={(evt) => setPhone(evt.target.value)}
      />

      <textarea
        type="text"
        name="description"
        placeholder="Give us a quick description of your business"
        onChange={(evt) => setDescription(evt.target.value)}
      />

      <p>
        You can also provide a picture for your business. While not mandatory,
        it will help users differentiating your listings with others.
      </p>

      <input type="file" name="picture" />

      <button onClick={handleClick}>Register</button>
    </div>
  );
};

export default DescribeYourBusiness;
