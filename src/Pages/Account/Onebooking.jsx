import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import apiHandler from '../../API/APIHandler';

const OneBooking = () => {

    const [booking, setBooking] = useState([]);
    const {id} = useParams();

useEffect(() => {
    let isMounted = true;
    if (isMounted) {
    apiHandler.get(`/account/bookings/${id}`)
    .then((dbRes) => {
        console.log(dbRes.data);
        // setBooking(dbRes.data)
    })
    .catch((e) => console.log(e))
    }
    return () => { isMounted = false };     
    }, [])


    return (
        <>
        <h1>One Booking</h1>
        <h3>Hello</h3>
        {/* <p>{booking.listing.name}</p> */}
        </>
    )
}




export default OneBooking;