import React from "react";
import { useNavigate } from "react-router-dom";
import apiHandler from "../../API/APIHandler";

// Icons imports
import {
  TrashIcon,
  KebabHorizontalIcon,
  CheckCircleFillIcon,
  XCircleFillIcon,
} from "@primer/octicons-react";

const ListingsList = ({ business, setBusiness }) => {
  const navigate = useNavigate();

  const handleModify = (listingId) => {
    navigate(`/listings/${listingId}/update`);
  };

  const handleDelete = (listingId) => {
    apiHandler
      .delete(`/api/listings/${business._id}/delete/${listingId}`)
      .then((updatedBusinessWithOutListing) => {
        setBusiness(updatedBusinessWithOutListing.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="background">
      <img
        style={{ width: "100vw", maxHeight: "400px" }}
        src={business.picture}
        alt={business.name}
      />
      <h1 className="p-5" style={{ color: "#FF4646  " }}>
        {business.name}
      </h1>
      {!business.listings.length && (
        <p>You don't have any listings for the moment</p>
      )}
      {business.listings.length > 0 && (
        <>
          <h2 className="p-3">My listings</h2>
          <div className="col-12 container m-5">
            <div className="col-12 row">
              <strong className="col-sm p-4">Name</strong>
              <strong className="col-sm p-4">Price</strong>
              <strong className="col-sm p-4">Available quantity</strong>
              <strong className="col-sm p-4">Description</strong>
              <strong className="col-sm p-4">Modify</strong>
              <strong className="col-sm p-4">Delete</strong>
              <strong className="col-sm p-4">Active</strong>
            </div>
            <hr />
            {business.listings.map((listing) => (
              <div
                className={
                  listing.archived ? "col-12 row gray-listing" : "col-12 row"
                }
                key={listing._id}
              >
                <span className="col-sm p-4">{listing.name}</span>
                <span className="col-sm p-4">{listing.price} €</span>
                <span className="col-sm p-4">{listing.availableQuantity}</span>
                <span className="col-sm p-4">{listing.description}</span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleModify(listing._id)}
                  className="col-sm p-4"
                >
                  <KebabHorizontalIcon size={24} />
                </span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(listing._id)}
                  className="col-sm p-4"
                >
                  <TrashIcon size={24} />
                </span>
                <span
                  style={{ color: listing.archived ? "red" : "green" }}
                  className="col-sm p-4"
                >
                  {listing.archived && <XCircleFillIcon size={24} />}
                  {!listing.archived && <CheckCircleFillIcon size={24} />}
                  {/* {!listing.archived && listing.owner.endTimeSlot &&<CheckCircleFillIcon size={24} />} */}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      <button
        className="btn btn-primary px-5 py-2"
        style={{ backgroundColor: "#FF4646", border: 0 }}
        onClick={() =>
          navigate("/listings/create", {
            state: { businessId: business._id },
          })
        }
      >
        Add a listing
      </button>
    </div>
  );
};

export default ListingsList;
