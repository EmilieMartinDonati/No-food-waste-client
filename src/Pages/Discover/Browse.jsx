import React, { useState, useEffect } from "react";
import apiHandler from "../../api/apiHandler";
import ListingCard from "../../components/ListingCard";
import { NavLink } from "react-router-dom";
import Geocode from "react-geocode";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

Geocode.setApiKey("AIzaSyAWNUhMz1o6js88esl8_xmRkQgFOZr38nk");
Geocode.setLanguage("fr");

const Browse = () => {

  const [latitudeUser, setLatitudeUser] = useState(0);
  const [longitudeUser, setLongitudeUser] = useState(0);
  const [listings, setListings] = useState([]);
  const [userAddress, setUserAddress] = useState("");
  const [mapOrList, setMapOrList] = useState("list");
  // const [latitude, setLatitude] = useState(0);
  // const [longitude, setLongitude] = useState(0);

  const [search, setSearch] = useState("");


  const containerStyle = {
    width: '300px',
    height: '300px',
    marginLeft: "3%",
  };




  // The code below is a parser that should work for adresses for most countries. 
  // We can find where the current user is this wayyy !
  Geocode.fromLatLng(latitudeUser, longitudeUser).then(
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
      // console.log(city, state, country);
      setUserAddress(address);
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
      setLatitudeUser(position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLongitudeUser(position.coords.longitude);
    });
    apiHandler.get("/discover").then((res) => {
      console.log(res.data);
      setListings(res.data);
      console.log(listings);
    }
    )
      .catch((e) => console.log(e));
  }, [])


  useEffect(() => {
    initLocalisations()
  }, [listings])

  const fetchGeocode = (listing) => {
    return new Promise(async (resolve, reject) => {
      try {
        let address = listing.owner.address;
        const APIres = await Geocode.fromAddress(address);
        const { lat, lng } = APIres.results[0].geometry.location;
        console.log("lat long", lat, lng);
        resolve({ lat, lng });
      }
      catch (e) { reject(e) }
    })
  }

  const initLocalisations = async () => {
    console.log("waht is in listings ?", listings)
    try {
      for (let listing of listings) {
        //console.log(!!listing, listing)
        const res = await fetchGeocode(listing);
        console.log(">>", res);
        listing.coord = res;
        console.log("this is the listing with the coordinates", listing);
      }
    } catch (err) {
      console.error(err)
    }
  }

  console.log("listings, I hope they have the coordinates", listings);


  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleSubmit2 = (e) => {
    e.preventDefault();
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const data = {
      search: search
    }
    // apiHandler.post("/categories", data)
    // .then((dbRes) => console.log(dbRes))
    // .catch((e) => console.log(e))
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center text-danger">BROWSE</h1>
          <p>Offers near <span style={{ color: "slategrey" }}>{userAddress}</span></p>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <form onSubmit={handleSearch}>
            <label htmlFor="search">
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by categories"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
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
            {/* console.log("this is the log of the listing", listing._id); */ }
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
          <p className="text-uppercase">See on card</p>
          {listings.map((listing) => {
            console.log("gimme the damn coord :'(", listing)
            const center = {
              lat: listing.coord?.lat,
              lng: listing.coord?.lng,
            }
            return (
              <>
                <h4>{listing.name}</h4>
                <p>{listing.owner.address}</p>
                <p>{listing.coord?.lat}</p>
                <p>{listing.coord?.lng}</p>
                <LoadScript
                  googleMapsApiKey="AIzaSyAWNUhMz1o6js88esl8_xmRkQgFOZr38nk"
                >
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={20}
                  >
                  </GoogleMap>
                </LoadScript>
              </>
            )
          })
          }




        </div>
      </div>
    </div>
  );
};

export default Browse;