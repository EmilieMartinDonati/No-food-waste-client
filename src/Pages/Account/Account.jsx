import React, { useEffect, useState } from 'react';
import APIHandler from "../../API/APIHandler";
import { Link } from "react-router-dom";
import BookingCard from "../../components/BookingCard.jsx";

const Account = () => {


    const [user, setUser] = useState("");
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        APIHandler.get("/account")
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
                setBookings(res.data.bookings);
            })
            .catch((e) => console.log(e))
    }, [])

    return (
        <>
            <h1>Welcome {user.name}</h1>
            <h3>Here are your bookings</h3>

            {bookings && bookings.length > 0 && (
                bookings.map((booking) => {
                    return (
                        <>
                            <div className="d-sm-inline-flex">
                            <div className="card" style={{ width: "auto" }}>
                                <img
                                    className="card-img-top"
                                    src={booking.listing?.owner?.picture}
                                    alt={booking.listing?.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Reserved quantity : {booking.quantity}</h5>
                                    <h5 className="card-text">Price: {booking.listing?.price}€</h5>
                                    <p className="card-text">{booking.listing?.owner?.address}</p>
                                    <p className="card-text">Pick up by {booking.listing?.owner?.endTimeSlot}</p>
                                    <Link to={`/account/bookings/${booking._id}`}>See this booking</Link>
                                </div>
                            </div>
                            </div>
                        </>
                    )
                })
            )}


        </>

    )
}




export default Account;