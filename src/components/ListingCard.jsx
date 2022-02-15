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
    <div
      className="card my-3 p-3 mx-5"
      style={{
        width: "325px",
        borderRadius: "10px",
        // border: "1px solid #FF4646",
        borderShadow: "10px",
        backgroundColor: "rgb(255, 172, 141)",
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          className="card-img-top"
          style={{ height: 200 }}
          src={listing.owner?.picture}
          alt={listing.name}
        />
        <p
          style={{
            backgroundColor: tagColor,
            position: "absolute",
            top: "10px",
            left: "10px",
            color: "white",
            borderRadius: "5px",
            padding: "2%",
          }}
        >
          {displayTag}
        </p>
      </div>
      <div className="card-body text-uppercase text-justify text-dark">
        <div className="row">
          <div className="col-12">
            <h4 className="card-title">{listing.name}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <h6 className="card-text text-dark">{listing.owner?.name}</h6>
          </div>
          <div className="col-4">
            <h5 className="card-text" style={{ color: "black" }}>
              {listing.price}€
            </h5>
          </div>
          {/* <div className="col-4"> */}
          <div style={{ position: "absolute", top: "30px", left: "120px" }}>
            <FontAwesomeIcon
              style={{ cursor: "pointer", color: "#FF4646" }}
              onClick={toggleFavorite}
              icon={favIcon}
              size="xl"
            />
          </div>
        </div>
        <hr style={{ color: "#FF4646", height: "1px" }} />

        <p className="card-text text-dark">
          Pick up by{" "}
          <span className="text-danger text-xl">
            {moment(listing.owner?.endTimeSlot).format("ddd, hA")}
          </span>
        </p>
        <p>Available quantity : {listing.availableQuantity}</p>
        <Link to={`/listing/${listing._id}`}>SEE</Link>
      </div>
    </div>
  );
};

export default ListingCard;
