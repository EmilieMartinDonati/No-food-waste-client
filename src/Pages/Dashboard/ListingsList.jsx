import React from "react";
// import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ListingsList = ({ business }) => {
  const navigate = useNavigate();

  return (
    <div>
      {!business.listings && <p>You don't have any listings for the moment</p>}
      {business.listings && (
        <>
          <img
            className="mt-5"
            style={{ width: 200 }}
            src={business.picture}
            alt={business.name}
          />
          <h1 className="p-5">{business.name}</h1>
          <ul>
            {business.listings?.map((listing) => (
              <li key={listing._id}>{listing.name}</li>
            ))}
          </ul>
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
    </div>
  );
};

export default ListingsList;
