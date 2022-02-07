import React, { useState, useRef } from "react";

const DescribeYourBusiness = ({ setBusiness, setStep }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const imageRef = useRef("");

  const handleClick = (evt) => {
    evt.preventDefault();

    setBusiness((prevValues) => {
      return {
        ...prevValues,
        name,
        address,
        phone,
        description,
        picture: imageRef.current.files[0],
      };
    });
    setStep(2);
  };

  return (
    <form className="p-4">
      <h2>Describe your business</h2>
      <p>
        Please tell us a little bit more about your business so that we can
        settle your account
      </p>

      <h3>Confirm the name and location of your business</h3>

      <div className="form-group m-3">
        <input
          className="form-control"
          type="text"
          name="name"
          placeholder="Name of your business"
          onChange={(evt) => setName(evt.target.value)}
        />
      </div>

      <div className="form-group m-3">
        <input
          className="form-control"
          type="text"
          name="address"
          placeholder="Address of your business"
          onChange={(evt) => setAddress(evt.target.value)}
        />
      </div>

      <div className="form-group m-3">
        <input
          className="form-control"
          type="number"
          name="phone"
          placeholder="Phone number"
          onChange={(evt) => setPhone(Number(evt.target.value))}
        />
      </div>

      <div className="form-group m-3">
        <input
          className="form-control"
          type="text"
          name="description"
          placeholder="Give us a quick description of your business"
          onChange={(evt) => setDescription(evt.target.value)}
        />
      </div>

      <p>
        You can also provide a picture for your business. While not mandatory,
        it will help users differentiating your listings with others.
      </p>

      <div className="form-group m-3">
        <input
          className="form-control-file"
          ref={imageRef}
          type="file"
          name="picture"
        />
      </div>

      <button
        className="btn btn-primary px-5 py-2"
        onClick={(evt) => handleClick(evt)}
      >
        Register
      </button>
    </form>
  );
};

export default DescribeYourBusiness;
