import React, { useState, useEffect } from "react";
import apiHandler from "../../api/apiHandler";
import ListingCard from "../../components/ListingCard";
// import { geolocated } from "react-geolocated";
import {NavLink} from "react-router-dom";

const Browse = () => {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      setLatitude(position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLongitude(position.coords.longitude);
    });
    apiHandler.get("/discover").then((res) => {
      console.log(res.data);
      setListings(res.data);
    console.log(listings)}
    )
      .catch((e) => console.log(e))
  }, [])

  return (
    <div>
      <h1>This is the Browse page</h1>
      <h4>User's current position :</h4>
      <p>Latitude : {latitude}</p>
      <p>Longitude : {longitude} </p>
      {/* <div id="map" style={{
        width: "100%",
        height: "400px"
      }}></div> */}
      <h4>Map</h4>
      <h4>List</h4>
    
      {listings.map((listing) => {
        return (
          <div key={listing._id}>
          <ListingCard listing={listing} />
          <NavLink to={`/listing/${listing._id}`}><h4>Browse through all available meals</h4></NavLink>
          </div>
        )
      })}
    </div>
  );
};

export default Browse;