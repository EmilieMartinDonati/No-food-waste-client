import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import ListingCard from "../../components/ListingCard";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Geocode from "react-geocode";
import APIHandler from "../../API/APIHandler";

// Geocode.setApiKey("AIzaSyAWNUhMz1o6js88esl8_xmRkQgFOZr38nk");
Geocode.setApiKey("AIzaSyDWzuqTOkhvuqiZA4eoKNn3SFBF1-e0hao");
Geocode.setLanguage("fr");

const Discover = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [allListings, setAllListings] = useState([]);
  const [address, setAddress] = useState("");

  // The code below is a parser that should work for adresses for most countries.
  // We can find where the current user is this wayyy !
  Geocode.fromLatLng(latitude, longitude).then(
    (response) => {
      const address = response.results[0].formatted_address;
      let city, state, country;
      for (let i = 0; i < response.results[0].address_components.length; i++) {
        for (
          let j = 0;
          j < response.results[0].address_components[i].types.length;
          j++
        ) {
          switch (response.results[0].address_components[i].types[j]) {
            case "locality":
              city = response.results[0].address_components[i].long_name;
              break;
            case "administrative_area_level_1":
              state = response.results[0].address_components[i].long_name;
              break;
            case "country":
              country = response.results[0].address_components[i].long_name;
              break;
          }
        }
      }
      console.log(city, state, country);
      setAddress(address);
    },
    (error) => {
      console.error(error);
    }
  );

  const containerStyle = {
    width: "100vw",
    height: "60vh",
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      setLatitude(position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLongitude(position.coords.longitude);
    });

    APIHandler.get("/discover")
      .then((dbRes) => {
        console.log("this is db Res for allListings", dbRes);
        setAllListings(dbRes.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div className="background">
        <div>
          <div className="p-5">
            <h1 className="text-center text-danger">Discover</h1>
            <p>
              Offers near <span style={{ color: "slategrey" }}>{address}</span>
            </p>
          </div>
          <div className="pb-5" style={{ width: "80vw" }}>
            {/* <LoadScript googleMaps="AIzaSyAWNUhMz1o6js88esl8_xmRkQgFOZr38nk"> */}
            <LoadScript googleMapsApiKey="AIzaSyDWzuqTOkhvuqiZA4eoKNn3SFBF1-e0hao">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
              ></GoogleMap>
            </LoadScript>
          </div>
        </div>
        <div className="d-flex-wrap justify-content-center">
          <h1 className="text-center text-danger pt-5">Our current listings</h1>
          <div id="listing-card-div-flex">
            {allListings.map((listing) => {
              if (!listing.archived) return <ListingCard listing={listing} />;
            })}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h1 className="text-center text-danger p-5">Our approach</h1>
            <p className="pb-5">
              No-food-waste is an ecofriendly society that allows restaurant
              owners to sell their unsold stocks to you under the form of of
              nicely packaged meals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
