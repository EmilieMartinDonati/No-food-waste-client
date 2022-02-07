import React from "react";
import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => {
  // !!!!
  //! Note for ourselves: to use listing.owner.picture on lines 10, 12 and 14, it means that the listing object sent through prop must have had been sent with populate on owner
  // !!!!

  return (

    <div className="card" style={{ width: "30rem" }}>
      <img className="card-img-top" src={listing.owner.picture} alt={listing.name} />
      <div className="card-body">
        <h5 className="card-title">{listing.name}</h5>
        <h5 className="card-text">Price: {listing.price}€</h5>
        <p className="card-text">{listing.owner.name}</p>
        <p className="card-text">Pick up by {listing.owner.pickupTimeSlots}</p>
        <p>{listing.availableQuantity}</p>
        <Link to={`/listing/${listing._id}`}>See this offer</Link>
      </div>
    </div>

    /* <div>
    <Link to={`/listing/${listing._id}`}>See this offer</Link>
      <img src={listing.owner.picture} alt={listing.name} />
      <div>
        <div>
          <h2>{listing.owner.name}</h2>
          <h3>{listing.name}</h3>
          <p>Pick up by {listing.owner.pickupTimeSlots}</p>
        </div>
        <div>
          <p>Price: {listing.price}€</p>
        </div>
      </div>
    </div> */


  );
};

export default ListingCard;
