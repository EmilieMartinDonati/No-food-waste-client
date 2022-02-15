import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiHandler from "../../API/APIHandler";
import Geocode from "react-geocode";
import {
  GoogleMap,
  LoadScript,
  LoadScriptNext,
  Marker,
} from "@react-google-maps/api";
import BookingCard from "../../components/BookingCard";
// Geocode.setApiKey("AIzaSyAWNUhMz1o6js88esl8_xmRkQgFOZr38nk");
Geocode.setApiKey("AIzaSyDWzuqTOkhvuqiZA4eoKNn3SFBF1-e0hao");
Geocode.setLanguage("fr");

const OneBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  // const [center, setCenter] = useState({});
  const [coord, setCoord] = useState({});

  const containerStyle = {
    maxWidth: "auto",
    height: "100vh",
    className: "container-fluid",
  };

  useEffect(() => {
    apiHandler
      .get(`/account/bookings/${id}`)
      .then((dbRes) => {
        console.log(dbRes.data);
        setBooking(dbRes.data);
      })
      .catch((e) => console.log(e));
  }, [id]);
  // Ok so this ensures that initLocalisations only executes when listing changes ... I thiiiiink lol.
  useEffect(() => {
    if (booking !== null) initLocalisations();
  }, [booking]);
  // Idk what this is doing XD
  const fetchGeocode = (booking) => {
    return new Promise(async (resolve, reject) => {
      try {
        let address = booking.listing.owner.address;
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
    try {
      const res = await fetchGeocode(booking);
      console.log(">>", res);
      setCoord(res);
      console.log("this is the booking with the coordinates", booking);
      console.log("this is lat and long", coord);
    } catch (err) {
      console.error(err);
    }
  };
  console.log("booking", booking);
  if (booking && booking?.listing?.coord) {
    console.log({
      lat: Number(booking?.listing?.coord?.lat),
      lng: Number(booking?.listing?.coord?.lng),
    });
  }

  return (
    <div className="container background">
      {booking && (
        <div className="row">
          <div className="col-5 m-2">
            <BookingCard booking={booking} />
          </div>
          <div className="col-5">
            {/* <LoadScript googleMapsApiKey="AIzaSyAWNUhMz1o6js88esl8_xmRkQgFOZr38nk"> */}
            <LoadScript googleMapsApiKey="AIzaSyDWzuqTOkhvuqiZA4eoKNn3SFBF1-e0hao">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{
                  lat: coord?.lat || 45,
                  lng: coord?.lng || 50,
                }}
                zoom={20}
              >
                <Marker
                  position={{
                    lat: coord?.lat || -34.397,
                    lng: coord?.lng || 150.644,
                  }}
                />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      )}
    </div>
  );
};

export default OneBooking;
