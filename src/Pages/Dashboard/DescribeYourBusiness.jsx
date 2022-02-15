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
      <h2 className="text-uppercase">Describe your business</h2>
      <p>
        Please tell us a little bit more about your business so that we can
        settle your account
      </p>
      <hr></hr>

      {/* <h3>Confirm the name and location of your business</h3> */}

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

      <div className="container">
      <div className="row mt-3 mb-5">
      <div className="col-6">

      <p style={{textAlign: "justify !important"}}>
        You can also provide a picture for your business. While not mandatory,
        it will help users differentiating your listings with others.
      </p>
      </div>

      <div className="col-6">

      <div className="form-group m-3">
        <input
          className="form-control-file"
          ref={imageRef}
          type="file"
          name="picture"
        />
        </div>
      </div>
      </div>
      </div>

      <button
        className="btn px-5 py-2"
        onClick={(evt) => handleClick(evt)}
        style={{
          backgroundColor: "rgb(255, 70, 70)",
          color: "white"
        }}
      >
        Register
      </button>
    </form>
  );
};

export default DescribeYourBusiness;
