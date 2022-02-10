import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../API/APIHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFull } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../context/UseAuth";
import moment from "moment";

const ListingCard = ({ listing }) => {
  const [favIcon, setFavIcon] = useState(faHeart);
  const [displayTag, setDisplayTag] = useState("");
  const [tagColor, setTagColor] = useState("");
  const { currentUser, storeToken } = useAuth();

  // Toggle visually the favorite icon depending on whether the CU has the business in its fav array
  useEffect(() => {
    currentUser.favorites?.includes(listing?.owner?._id)
      ? setFavIcon(faHeartFull)
      : setFavIcon(faHeart);
  }, [currentUser]);

  // Update the time remaining every second
  useEffect(() => {
    const id = setInterval(() => {
      changeTag();
    }, 1000);

    // Clean the setInterval before the component unmounts
    return () => clearInterval(id);
  }, []);

  // This function compares two dates et return the number of minutes between them
  const compareTwoDates = (date1, date2) => {
    return Math.round(Math.abs(date1 - date2) / 1000 / 60);
  };

  // Function to change the tag of the card depending on the time remaining
  const changeTag = () => {
    if (
      new Date().getHours() < new Date(listing.owner.startTimeSlot).getHours()
    ) {
      setDisplayTag("Will open soon");
      setTagColor("green");
    } else if (
      new Date().getHours() > new Date(listing.owner.endTimeSlot).getHours()
    ) {
      setDisplayTag("Come back tomorrow");
      setTagColor("black");
    } else if (
      compareTwoDates(
        new Date(listing.owner.endTimeSlot).getHours(),
        new Date().getHours()
      ) < 60
    ) {
      setDisplayTag("Will close soon");
      setTagColor("red");
    } else if (new Date().getHours() === new Date(listing.owner.endTimeSlot)) {
      if (
        new Date().getMinutes() <
        new Date(listing.owner.startTimeSlot).getMinutes()
      ) {
        setDisplayTag("Will open in less than an hour");
        setTagColor("green");
      } else if (
        new Date().getMinutes() >
        new Date(listing.owner.endTimeSlot).getMinutes()
      ) {
        setDisplayTag("You just missed it ... Come back tomorrow!");
        setTagColor("black");
      } else if (
        compareTwoDates(
          new Date(listing.owner.endTimeSlot).getMinutes(),
          new Date().getMinutes()
        ) < 60
      ) {
        setDisplayTag("Will close in less than an hour");
        setTagColor("red");
      }
    }
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
    <div className="card" style={{ width: "auto" }}>
      <img
        className="card-img-top"
        src={listing.owner?.picture}
        alt={listing.name}
      />
      <div className="card-body">
        <p style={{ backgroundColor: tagColor, color: "white" }}>
          {displayTag}
        </p>
        <h5 className="card-title">{listing.name}</h5>
        <h5 className="card-text">Price: {listing.price}€</h5>
        <p className="card-text">{listing.owner?.name}</p>
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          onClick={toggleFavorite}
          icon={favIcon}
          size="xs"
        />
        <p className="card-text">Pick up by {moment(listing.owner?.endTimeSlot).format("ddd, hA")}</p>
        <p>Available quantity : {listing.availableQuantity}</p>
        <Link to={`/listing/${listing._id}`}>See this offer</Link>
      </div>
    </div>
  );
};

export default ListingCard;
