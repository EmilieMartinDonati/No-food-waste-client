import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiHandler from "../../API/APIHandler";

const ModifyListing = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [recurring, setRecurring] = useState("");

  const navigate = useNavigate();
  const { listingId } = useParams();

  useEffect(() => {
    apiHandler
      .get(`/api/listings/${listingId}`)
      .then((dbResponse) => {
        // setListing(dbResponse.data);
        setName(dbResponse.data.name);
        setPrice(dbResponse.data.price);
        setAvailableQuantity(dbResponse.data.availableQuantity);
        setDescription(dbResponse.data.description);
        setRecurring(dbResponse.data.recurring);
      })
      .catch((err) => console.error(err));
  }, [listingId]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    apiHandler
      .patch(`/api/listings/modify/${listingId}`, {
        name,
        price,
        availableQuantity,
        description,
        recurring,
      })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => console.error(err));
  };

  return (
    <form className="p-4" onSubmit={(evt) => handleSubmit(evt)}>
      <h2 className="mx-3">Your listing's info</h2>

      <div className="form-group m-3">
        <input
          className="form-control"
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />
      </div>

      <div className="form-group m-3">
        <input
          className="form-control"
          type="number"
          name="price"
          id="price"
          value={price}
          onChange={(evt) => setPrice(evt.target.value)}
        />
      </div>

      <div className="form-group m-3">
        <input
          className="form-control"
          type="number"
          name="availableQuantity"
          id="availableQuantity"
          value={availableQuantity}
          onChange={(evt) => setAvailableQuantity(evt.target.value)}
        />
      </div>

      <div className="form-group m-3">
        <textarea
          className="form-control"
          type="text"
          name="description"
          id="description"
          value={description}
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
          id="recurring"
          value={true}
          checked={recurring === true}
          onChange={(evt) => setRecurring(evt.target.checked && true)}
        />
        <label className="mx-4" htmlFor="recurring">
          No
        </label>
        <input
          type="radio"
          idfor="recurring"
          name="recurring"
          id="recurring"
          value={true}
          checked={recurring === false}
          onChange={(evt) => setRecurring(evt.target.value && false)}
        />
      </div>

      <button className="btn btn-primary px-5 py-2">Modify the listing</button>
    </form>
  );
};

export default ModifyListing;
