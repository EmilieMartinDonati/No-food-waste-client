import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiHandler from "../../API/APIHandler";
import Switch from "react-switch";
import S from "react-switch";
const Switch = S.default? S.default: S
console.log(S); // inspecting

const ModifyListing = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [archived, setArchived] = useState(false);

  const navigate = useNavigate();
  const { listingId } = useParams();

  useEffect(() => {
    apiHandler
      .get(`/api/listings/${listingId}`)
      .then((dbResponse) => {
        console.log(typeof dbResponse.data.name);
        console.log(typeof dbResponse.data.availableQuantity);
        console.log(typeof dbResponse.data.price);
        console.log(typeof dbResponse.data.description);
        console.log(typeof dbResponse.data.recurring);
        console.log(typeof dbResponse.data.archived);

        // setListing(dbResponse.data);
        setName(dbResponse.data.name);
        setPrice(dbResponse.data.price);
        setAvailableQuantity(dbResponse.data.availableQuantity);
        setDescription(dbResponse.data.description);
        setRecurring(dbResponse.data.recurring);
        setArchived(dbResponse.data.archived);
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
        archived,
      })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => console.error(err));
  };

  const handleSwitch = () => {
    archived ? setArchived(false) : setArchived(true);
  };

  return (
    <form className="p-4 background" onSubmit={(evt) => handleSubmit(evt)}>
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

      <div className="m-5">
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

      <div className="m-5">
        <h3>Is the listing active?</h3>
        {recurring && (
          <p className="my-3">
            Note: your listing is marked as recurring. Therefore, it will always
            be active by default.
          </p>
        )}
        {!recurring && (
          <p className="my-3">
            Note: your listing is marked as non-recurring. Therefore, it will be
            set as inactive after today's end pickup date.
          </p>
        )}
        <label className="mx-4">Inactive</label>
        <Switch onChange={handleSwitch} checked={!archived} />
        <label className="mx-4">Active</label>
      </div>
      <div className="py-3">
        <button
          style={{ backgroundColor: "#FF4646", border: 0 }}
          className="btn btn-primary px-5 py-2"
        >
          Modify the listing
        </button>
      </div>
    </form>
  );
};

export default ModifyListing;
