<<<<<<< HEAD
import axios from "axios";
import React, { useEffect, useState } from "react";
import ListingCard from "../../components/ListingCard";

const Discover = () => {
  const [allListings, setAllListings] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:4000/listings")
      .then((dbRes) => setAllListings(dbRes.data))
      .catch((err) => console.error(err));
  }, []);
=======
import React, { useState, useEffect } from "react";
import apiHandler from "../../api/apiHandler";
import ListingCard from "../../components/ListingCard";
// import { geolocated } from "react-geolocated";
import {NavLink} from "react-router-dom";

const Discover = () => {

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
>>>>>>> 9be1050d8d853ca21cc78cef032fc7586103ba0e

  return (
    <div>
      <h1>This is the Discover home page</h1>
<<<<<<< HEAD
      {allListings.map((listing) => {
        return <ListingCard listing={listing} />;
=======
      <h4>User's current position :</h4>
      <p>Latitude : {latitude}</p>
      <p>Longitude : {longitude} </p>
      {/* <div id="map" style={{
        width: "100%",
        height: "400px"
      }}></div> */}
      <h4>Our approach</h4>
      <p>No food waste is a company which aims at reducing food waste and its environmental impact by giving you the opportunity to buy yummy meals from the unsold stocks or nearby restaurant owners</p>
      <NavLink to="/listings"><h4>Browse through all available meals</h4></NavLink>

      {listings.map((listing) => {
        return (
          <div key={listing._id}>
          <ListingCard listing={listing} />
          </div>
        )
>>>>>>> 9be1050d8d853ca21cc78cef032fc7586103ba0e
      })}
    </div>
  );
};

export default Discover;
