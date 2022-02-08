import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import apiHandler from '../../API/APIHandler';
import Geocode from "react-geocode";
import { GoogleMap, LoadScript, LoadScriptNext } from '@react-google-maps/api';

Geocode.setApiKey("AIzaSyAWNUhMz1o6js88esl8_xmRkQgFOZr38nk");
Geocode.setLanguage("fr");

const OneBooking = () => {

    const { id } = useParams();

    const [booking, setBooking] = useState(null);
    // const [center, setCenter] = useState({});
    const [coord, setCoord] = useState({});

    const containerStyle = {
        width: "700px",
        height: "700px"
    }


    useEffect(() => {
        apiHandler.get(`/account/bookings/${id}`)
            .then((dbRes) => {
                console.log(dbRes.data);
                setBooking(dbRes.data);
            })
            .catch((e) => console.log(e))
    }
        , [id])

    // Ok so this ensures that initLocalisations only executes when listing changes ... I thiiiiink lol.

    useEffect(() => {
        if (booking !== null) initLocalisations()
    }, [booking])

    // Idk what this is doing XD

    const fetchGeocode = (booking) => {
        return new Promise(async (resolve, reject) => {
            try {
                let address = booking.listing.owner.address;
                const APIres = await Geocode.fromAddress(address);
                const { lat, lng } = APIres.results[0].geometry.location;
                console.log("lat long", lat, lng);
                resolve({ lat, lng });
            }
            catch (e) { reject(e) }
        })
    }

    // So we re-await fetchGeocode here becauuuuse.

    const initLocalisations = async () => {
        try {
            const res = await fetchGeocode(booking);
            console.log(">>", res);
            setCoord(res);
            console.log("this is the booking with the coordinates", booking);
            console.log("this is lat and long", coord)
        }
        catch (err) {
            console.error(err)
        }
    }

    console.log("booking", booking)
    if (booking && booking?.listing?.coord) {
        console.log({
            lat: Number(booking?.listing?.coord?.lat),
            lng: Number(booking?.listing?.coord?.lng)
        })
    }
    return (
        <>
            <h1>One Booking</h1>
            <h3>Hello</h3>
            {booking && (
                <>
                    <p>{booking.listing?.name}</p>
                    <p>Reserved quantity = {booking.quantity}</p>
                    <p>{booking.listing?.owner?.address}</p>

                    <LoadScript
                        googleMapsApiKey="AIzaSyAWNUhMz1o6js88esl8_xmRkQgFOZr38nk"
                    >
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={{
                                lat: coord?.lat || 45,
                                lng: coord?.lng || 50
                            }
                            }
                            zoom={20}
                        >
                        </GoogleMap>
                    </LoadScript>
                </>
            )}
        </>
    )
}




export default OneBooking;