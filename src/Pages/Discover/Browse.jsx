import React, { useState, useEffect, useRef } from "react";
import apiHandler from "../../api/apiHandler";
import ListingCard from "../../components/ListingCard";
import { NavLink } from "react-router-dom";
import Geocode from "react-geocode";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Geocode.setApiKey("AIzaSyAWNUhMz1o6js88esl8_xmRkQgFOZr38nk");
Geocode.setApiKey("AIzaSyDWzuqTOkhvuqiZA4eoKNn3SFBF1-e0hao");
Geocode.setLanguage("fr");

const Browse = () => {

  const elementRef = useRef();
  // this is for the user.
  const [latitudeUser, setLatitudeUser] = useState(0);
  const [longitudeUser, setLongitudeUser] = useState(0);
  // const [colors, setColors] = useState([]);

  const [listings, setListings] = useState([]);
  const [userAddress, setUserAddress] = useState("");
  const [mapOrList, setMapOrList] = useState("list");
  const [listingMap, setListingMap] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [clicked, setClicked] = useState(15);

  // Fetch all businesses, filter par catégories, display their listings.

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);

  const containerStyle = {
    width: "60vw",
    height: "60vh",
    className: "container-fluid",
  };

  const center = {
    lat: latitudeUser,
    lng: longitudeUser,
  };

  // The code below is a parser that should work for adresses for most countries.
  // We can find where the current user is this wayyy !
  Geocode.fromLatLng(latitudeUser, longitudeUser).then(
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
      // console.log(city, state, country);
      setUserAddress(address);
    },
    (error) => {
      console.error(error);
    }
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      setLatitudeUser(position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLongitudeUser(position.coords.longitude);
    });
    // Color logic

    apiHandler
      .get("/listings")
      .then((res) => {
        console.log("this is the res from the db line 77", res.data.businesses);
        setListings(res.data.listings);
        setCategories(res.data.categories);
        setBusinesses(res.data.businesses);
      })
      .catch((e) => console.log(e));
  }, []);

  // This is where it needs to move on.

  const handleAll = () => {
    try {
      apiHandler.get("/listings").then((res) => {
        console.log("this is the res from the db line 77", res.data.businesses);
        setListings(res.data.listings);
        elementRef.current.classList.add("bg-white");
        elementRef.current.style.color("black");

      });
    } catch (e) {
      next(e);
    }
  };

  useEffect(() => {
    initLocalisations();
  }, [listings]);

  const fetchGeocode = (listing) => {
    return new Promise(async (resolve, reject) => {
      try {
        let address = listing.owner.address;
        const APIres = await Geocode.fromAddress(address);
        const { lat, lng } = APIres.results[0].geometry.location;
        console.log("lat long", lat, lng);
        resolve({ lat, lng });
      } catch (e) {
        reject(e);
      }
    });
  };

  const initLocalisations = async () => {
    console.log("waht is in listings ?", listings);
    try {
      for (let listing of listings) {
        //console.log(!!listing, listing)
        const res = await fetchGeocode(listing);
        console.log(">>", res);
        listing.coord = res;
        // console.log("this is the listing with the coordinates", listing);
      }
    } catch (err) {
      console.error(err);
    }
  };

  console.log("listings, I hope they have the coordinates", listings);

  const handleMarkerClick = (e, id, businessId) => {
    console.log("this is the handleClick for the marker", e, id);
    console.log(businessId);
    const foundBusiness = businesses.find((elem) => elem._id === businessId);
    console.log(businesses);
    console.log(foundBusiness);
    setListingMap(foundBusiness.listings);
    console.log("those are the listings", listingMap);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // listingMap.map((elem, index, array) => {
    //   if (elem.owner.tags.find((el._id) => el._id === search)) {

    //   }
    // })
    const data = {
      search: search,
    };

    console.log("this is the console line 141", data);
    apiHandler
      .post("/category", data)
      .then((res) => {
        console.log("this is the response for the cat line 133", res.data);
        setListings(res.data.listings);
        // const filteredListings = []
        // if (listingMap.length > 0) {
        //   filteredListings = listingMap.filter((listing) === (listing.owner.tags.find(search) === true))
        // }
        // console.log("this is line 162", filteredListings);
      })
      .catch((e) => console.log(e));
  };

  const handleClick = (e, i) => {
    console.log(i);
    setClicked(i);
    setSearch(e);
  }

  return (
    <div className="container-fluid pt-3 background">
      <div className="row">
        <div className="col-12">
          <h1
            className="text-center text-bold p-5"
            style={{ color: "#FF4646" }}
          >
            Find all our listings
          </h1>
          <p>
            Offers near{" "}
            <span style={{ color: "slategrey" }}>{userAddress}</span>
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <form onSubmit={handleSearch}>
            <label htmlFor="search"></label>
            {categories.map((category, i) => {
              if (clicked !== i)
              return (
                <button
                  className="btn btn-active m-2 p-4 text-bold text-uppercase"
                  key={category._id}
                  value={category._id}
                  onClick={(e) => handleClick(e.target.value, i)}
                  // onClick={(e) => setClicked(i)}
                  style={{ 
                    backgroundColor: category.color}}
                >
                  {category.name}
                </button>
              )
              else return (
                <button
                  className="btn btn-active m-2 p-5 text-bold text-uppercase"
                  key={category._id}
                  value={category._id}
                  onClick={(e, i) => handleClick(e.target.value, i)}
                  // onClick={(e) => setClicked(i)}
                  style={{ 
                    color: category.color,
                    border: `${category.color} solid 3px`}}
                >
                  {category.name}
                </button>
              )
            })}
            <button
              className="btn btn-active m-2 p-5 text-bold text-uppercase rounded"
              style={{
                backgroundColor: "#ff4646",
                color: "silver",
                border: "5px solid rgb(255, 201, 161)"
              }}
              onClick={handleAll}
              ref={elementRef}
            >ALL
            </button>
            <FontAwesomeIcon icon="fa-solid fa-arrow-rotate-left" style={{color: "red"}}/>
          </form>
        </div>
      </div>

      <div className="row inline-flex-center" style={{ color: "silver" }}>
        <div className="col-6">
          <button
            className="btn btn-primary px-5 py-2 m-5"
            style={{ backgroundColor: "#FF4646", border: 0 }}
            value="list"
            onClick={(e) => setMapOrList(e.target.value)}
          >
            LIST
          </button>
        </div>
        <div className="col-6">
          <button
            className="btn btn-primary px-5 py- m-5"
            style={{ backgroundColor: "#FF4646", border: 0 }}
            value="map"
            onClick={(e) => setMapOrList(e.target.value)}
          >
            MAP
          </button>
        </div>
      </div>

      <div className="d-flex-wrap justify-content-center">
        {mapOrList === "list" && (
          <div id="listing-card-div-flex">
            {listings.map((listing) => {
              if (!listing.archived)
                return (
                  <>
                    <ListingCard key={listing._id} listing={listing} />
                  </>
                );
            })}
          </div>
        )}

        {mapOrList === "map" && (
          <div className="col-12 d-inline-grid justify-content-center">
            <div className="row">
              <div className="col-8">
                {/* <LoadScript googleMapsApiKey="AIzaSyAWNUhMz1o6js88esl8_xmRkQgFOZr38nk"> */}
                <LoadScript googleMapsApiKey="AIzaSyDWzuqTOkhvuqiZA4eoKNn3SFBF1-e0hao">
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={14}
                  >
                    {listings.map((listing, i) => {
                      return (
                        <form key={i}>
                          <label htmlFor={listing.name}></label>
                          <Marker
                            position={{
                              lat: listing.coord?.lat || -34.397,
                              lng: listing.coord?.lng || 150.644,
                            }}
                            onClick={(e) =>
                              handleMarkerClick(
                                e,
                                listing._id,
                                listing.owner._id
                              )
                            }
                          />
                        </form>
                      );
                    })}
                  </GoogleMap>
                </LoadScript>
              </div>
              <div className="col-4">
                {Object.entries(listingMap).length > 0 &&
                  listingMap.map((listing) => {
                    return <ListingCard listing={listing} />;
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
