import React from "react";
import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => {
  // !!!!
  //! Note for ourselves: to use listing.owner.picture on lines 10, 12 and 14, it means that the listing object sent through prop must have had been sent with populate on owner
  // !!!!

  return (
    <Link to={`/listings/${listing._id}`}>
      <div>
        <img src={listing.owner.picture} alt={listing.name} />
        <div>
          <div>
            <h2>{listing.owner.name}</h2>
            <h3>{listing.name}</h3>
            <p>Pick up by {listing.owner.pickupTimeSlots}</p>
          </div>
          <div>
            <p>{listing.price}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
