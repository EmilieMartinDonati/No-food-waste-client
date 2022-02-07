import React, { useState, useEffect } from "react";
import apiHandler from "../../api/apiHandler";
import ListingCard from "../../components/ListingCard";
import { NavLink } from "react-router-dom";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAWNUhMz1o6js88esl8_xmRkQgFOZr38nk");
Geocode.setLanguage("fr");

const Browse = () => {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [listings, setListings] = useState([]);
  const [address, setAddress] = useState("");
  const [mapOrList, setMapOrList] = useState("list");
  const [location, setLocation] = useState(0, 0);

  // The code below is a parser that should work for adresses for most countries. 
  // We can find where the current user is this wayyy !
  Geocode.fromLatLng(latitude, longitude).then(
    (response) => {
      const address = response.results[0].formatted_address;
      let city, state, country;
      for (let i = 0; i < response.results[0].address_components.length; i++) {
        for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
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


  // The code below is to do the reverse (geolocation from address) -> this way we can retrieve the maps from the businesses location.
Geocode.fromAddress("19 rue Eugène Jumin, 55019 Paris").then(
  (response) => {
    const { lat, lng } = response.results[0].geometry.location;
    setLocation(lat, lng);
  },
  (error) => {
    console.error(error);
  }
);

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
    apiHandler.get("/discover").then((res) => {
      console.log(res.data);
      setListings(res.data);
      console.log(listings)
    }
    )
      .catch((e) => console.log(e))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleSubmit2 = (e) => {
    e.preventDefault();
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center text-danger">Discover</h1>
          <p>Offers near <span style={{ color: "slategrey" }}>{address}</span></p>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <form onSubmit={handleSubmit}>
            <input type="text" name="list" value="list" style={{
              visibility: "hidden"
            }} />
            <button className="btn-info" onClick={(e) => setMapOrList(e.target.value)}>LIST</button>
          </form>
        </div>
        <div className="col-6">
          <form onSubmit={handleSubmit2}>
            <input type="text" name="map" value="map" style={{
              visibility: "hidden"
            }} />
            <button className="btn-info" onClick={(e) => setMapOrList(e.target.value)}>MAP</button>
          </form>
        </div>
      </div>

      <div className="row">

        <div className="col-6 d-flex-column justify-content-center">

          {listings.map((listing) => {
            console.log("this is the log of the listing", listing._id);
            return (
              <div key={listing._id}>
                <ListingCard listing={listing} />
                {/* <NavLink to={`/listing/${listing._id}`}><h4>Interested by this offer ? Click to learn more and conclude your reservation</h4></NavLink> */}
              </div>
            )
          })
          }
        
        </div>

        <div className="col-6 d-flex-column justify-content-center">

        
        </div>
      </div>
    </div>
  );
};

export default Browse;