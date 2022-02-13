import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import apiHandler from "../../API/APIHandler";

const CreateListing = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [recurring, setRecurring] = useState(true);

  const navigate = useNavigate();

  const { businessId } = useLocation().state;

  const handleClick = (evt) => {
    evt.preventDefault();

    apiHandler
      .post(`/api/listings/${businessId}/create`, {
        name,
        price,
        availableQuantity,
        description,
        recurring,
      })
      .then((dbRes) => {
        console.log("This is dbRes from line 15 of CreatingList", dbRes);
        navigate("/dashboard");
      })
      .catch((err) => console.error(err));
  };

  return (
    <form className="p-4 background">
      <h2 className="mx-3">Your listing's info</h2>

      <div className="form-group m-3">
        <input
          className="form-control"
          type="text"
          name="name"
          placeholder="Name of your listing"
          onChange={(evt) => setName(evt.target.value)}
        />
      </div>

      <div className="form-group m-3">
        <input
          className="form-control"
          type="number"
          name="price"
          placeholder="How much?"
          onChange={(evt) => setPrice(evt.target.value)}
        />
      </div>

      <div className="form-group m-3">
        <input
          className="form-control"
          type="number"
          name="availableQuantity"
          placeholder="How many?"
          onChange={(evt) => setAvailableQuantity(evt.target.value)}
        />
      </div>

      <div className="form-group m-3">
        <textarea
          className="form-control"
          type="text"
          name="description"
          placeholder="Please provide a short description"
          onChange={(evt) => setDescription(evt.target.value)}
        />
      </div>

      <div className="m-3">
        <h3>Is the listing reccuring?</h3>
        <label className="mx-4" htmlFor="recurring">
          Yes
        </label>
        <input
          type="radio"
          idfor="recurring"
          name="recurring"
          value={true}
          checked={recurring === true}
          onChange={(evt) => setRecurring(evt.target.value && true)}
        />
        <label className="mx-4" htmlFor="recurring">
          No
        </label>
        <input
          type="radio"
          idfor="recurring"
          name="recurring"
          checked={recurring === false}
          value={false}
          onChange={(evt) => setRecurring(evt.target.value && false)}
        />
      </div>

      <button
        className="btn btn-primary px-5 py-2"
        style={{ backgroundColor: "#FF4646", border: 0 }}
        onClick={(evt) => handleClick(evt)}
      >
        Create a new listing
      </button>
    </form>
  );
};

export default CreateListing;
