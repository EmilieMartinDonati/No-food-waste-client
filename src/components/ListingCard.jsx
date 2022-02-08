import React, { useState } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../API/APIHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFull } from "@fortawesome/free-solid-svg-icons";

const ListingCard = ({ listing }) => {
  const [favIcon, setFavIcon] = useState(faHeart);

  const toggleFavorite = () => {
    // Send a patch route for the user object
    apiHandler
      .patch(`/account/favorites/${listing.owner._id}`)
      .then((dbRes) => {
        console.log("This is dbRes from line 32 of ListingCard", dbRes);
        // Change the favorite setting visually depending on dbRes
        dbRes.data.favorites.includes(listing._id)
          ? setFavIcon(faHeartFull)
          : setFavIcon(faHeart);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="card" style={{ width: "30rem" }}>
      <img
        className="card-img-top"
        src={listing.owner.picture}
        alt={listing.name}
      />
      <div className="card-body">
        <h5 className="card-title">{listing.name}</h5>
        <h5 className="card-text">Price: {listing.price}€</h5>
        <p className="card-text">{listing.owner.name}</p>
        <FontAwesomeIcon onClick={toggleFavorite} icon={favIcon} size="xs" />
        <p className="card-text">Pick up by {listing.owner.pickupTimeSlots}</p>
        <p>{listing.availableQuantity}</p>
        <Link to={`/listing/${listing._id}`}>See this offer</Link>
      </div>
    </div>
  );
};

export default ListingCard;
