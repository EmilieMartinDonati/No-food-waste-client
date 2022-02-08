import React, {useEffect, useState} from 'react';
import useAuth from "../../context/UseAuth";
import APIHandler from "../../API/APIHandler";

const Bookings = () => {

    const { storeToken, authenticateUser, currentUser } = useAuth();

     useEffect(() => {
      APIHandler.get("/account/bookings")
      .then((res) => {
        res.data.find(
            (booking) => booking.buyer === currentUser._id
          );
      }
      )
      .catch((e) => console.log(e))
     }, [])

    return (
        <h1>Bookings</h1>
    )
}



export default Bookings;

