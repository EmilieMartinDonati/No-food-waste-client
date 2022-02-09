import React, { useEffect, useState } from 'react';
import APIHandler from "../../API/APIHandler";
import { Link } from "react-router-dom";

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
                            <div className="card" style={{ width: "30rem" }}>
                                {/* <img className="card-img-top" src={listing.owner.picture} alt={listing.name} /> */}
                                <div className="card-body">
                                    <h5 className="card-title">{booking.listing?.name}</h5>
                                    <h5 className="card-text">Price: {booking.listing?.price}€</h5>
                                    <p className="card-text">{booking.listing?.description}</p>
                                    <p className="card-text"> Reserved quantity {booking.quantity}</p>
                                    <Link to={`/account/bookings/${booking._id}`}>See this booking</Link>
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