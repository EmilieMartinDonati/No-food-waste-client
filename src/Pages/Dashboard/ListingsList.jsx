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
    <>
      <img
        className="mt-5"
        style={{ width: 200 }}
        src={business.picture}
        alt={business.name}
      />
      <h1 className="p-5">{business.name}</h1>
      {!business.listings.length && (
        <p>You don't have any listings for the moment</p>
      )}
      {business.listings.length > 0 && (
        <>
          <h2 className="p-3">My listings</h2>
          <div className="container m-5">
            <div className="row">
              <strong className="col-sm p-4">Name</strong>
              <strong className="col-sm p-4">Price</strong>
              <strong className="col-sm p-4">Available quantity</strong>
              <strong className="col-sm p-4">Description</strong>
              <strong className="col-sm p-4">Modify</strong>
              <strong className="col-sm p-4">Delete</strong>
              <strong className="col-sm p-4">Active</strong>
            </div>
            {business.listings.map((listing) => (
              <div
                className={listing.archived ? "row gray-listing" : "row"}
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
                <span className="col-sm p-4">
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
        onClick={() =>
          navigate("/listings/create", {
            state: { businessId: business._id },
          })
        }
      >
        Add a listing
      </button>
    </>
  );
};

export default ListingsList;
