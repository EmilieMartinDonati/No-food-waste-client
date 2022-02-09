import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../API/APIHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFull } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../context/UseAuth";

const ListingCard = ({ listing }) => {
  const [favIcon, setFavIcon] = useState(faHeart);
  const [remainingTime, setRemainingTime] = useState(0);
  const { currentUser, storeToken } = useAuth();

  // useEffect(() => {
  //   x;
  // }, [remainingTime]);

  // Toggle visually the favorite icon depending on whether the CU has the business in its fav array
  useEffect(() => {
    currentUser.favorites.includes(listing.owner._id)
      ? setFavIcon(faHeartFull)
      : setFavIcon(faHeart);
  }, [currentUser]);

  // Function to change the tag of the card depending on the time remaining
  const changeTag = () => {
    setRemainingTime(listing.owner.endTimeSlot - new Date());
  };

  const toggleFavorite = () => {
    // Send a patch route for the user object
    apiHandler
      .patch(`/account/favorites/${listing.owner._id}`)
      .then((dbRes) => {
        // Store the new token so that we can access the updated currentUser on line 13 and provoke a refresh
        storeToken(dbRes.data);
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
        <p>Remaining time: {remainingTime}</p>
        <h5 className="card-title">{listing.name}</h5>
        <h5 className="card-text">Price: {listing.price}€</h5>
        <p className="card-text">{listing.owner.name}</p>
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          onClick={toggleFavorite}
          icon={favIcon}
          size="xs"
        />
        <p className="card-text">Pick up by {listing.owner.pickupTimeSlots}</p>
        <p>{listing.availableQuantity}</p>
        <Link to={`/listing/${listing._id}`}>See this offer</Link>
      </div>
    </div>
  );
};

export default ListingCard;
