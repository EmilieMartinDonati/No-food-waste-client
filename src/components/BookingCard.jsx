import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHandler from "../API/APIHandler";
import moment from "moment";

const BookingCard = ({ booking }) => {
    const navigate = useNavigate()



    const cancelHandler = (e) => {
        e.preventDefault();
        apiHandler.delete(`/account/bookings/delete/${booking._id}/${booking.quantity}`)
            .then((res) => {
                console.log(res.data);
                navigate("/account");
            })
            .catch((e) => console.log(e));
    }


    return (
        <>
            <div className="card background" style={{ width: "30rem", backgroundColor: "#fff5c0", height: "100vh" }}>
                <img
                    className="card-img-top"
                    src={booking.listing?.owner?.picture}
                    alt={booking.listing?.name}
                />
                <div className="card-body">
                    <div className="row">
                        <div className="col-6">
                            <h5 className="card-title">Reserved quantity : {booking.quantity}</h5>
                        </div>
                        <div className="col-6">
                            <h5 className="card-text">Price: {booking.listing?.price * booking.quantity}€</h5>
                        </div>
                        <hr></hr>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <p className="card-text">{booking.listing?.owner?.address}</p>
                        </div>
                        <div className="col-6">
                            <p className="card-text">Pick up by {moment(booking.listing.owner?.endTimeSlot).format("ddd, hA")}</p>
                        </div>
                    </div>
                    <hr></hr>

                    <form onSubmit={cancelHandler}>
                        {/* <label htmlFor="booking"></label>
                                <input type="text" id="booking" value={booking.quantity} style={{visibility: "hidden"}}/> */}
                        <button
                            className="btn btn-primary px-5 py-2"
                            style={{ backgroundColor: "#FF4646", border: 0 }}
                        >Cancel booking</button>
                    </form>
                </div>
            </div>
        </>
    )

}


export default BookingCard;
