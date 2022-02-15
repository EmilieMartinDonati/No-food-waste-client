import React, { useEffect, useState } from "react";
import APIHandler from "../../API/APIHandler";
import { Link } from "react-router-dom";
import BookingCard from "../../components/BookingCard.jsx";
import moment from "moment";

const Account = () => {
  const [user, setUser] = useState({});
  const [proBookings, setProBookings] = useState([]);

  // Retrieve the user
  useEffect(() => {
    APIHandler.get("/account")
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    APIHandler.get("/api/business/my-business")
      .then((dbRes) => {
        dbRes.data[0].listings.forEach((listingId) =>
          APIHandler.get(`/my-booking/${listingId}`)
            .then((dbRes) => {
              setProBookings((prevValues) => {
                const copy = [...prevValues];
                copy.push(...dbRes.data);
                return copy;
              });
            })
            .catch((err) => console.error(err))
        );
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="background p-5">
      <h1 className="p-5" style={{ color: "#FF4646" }}>
        WELCOME {user.name}
      </h1>

      {user.role === "user" && (
        // Render the view for buyers
        <>
          <h3>YOUR BOOKINGS</h3>

          <div className="d-inline-flex">

            {!user.bookings && (
              <p>You don't have any bookings for the moment</p>
            )}
            {user.bookings &&
              user.bookings?.length > 0 &&
              user.bookings?.map((booking) => {
                return (
                  <>

                      <div className="card background m-5" style={{ width: "30rem", backgroundColor: "rgb(255, 172, 141)", height: "auto" }}>
                        <img
                          className="card-img-top"
                          src={booking?.listing?.owner?.picture}
                          alt={booking?.listing?.name}
                          style={{objectFit: "cover",
                          width: "100%",
                          height: "600px"}}
                        />
                        <div className="card-body">
                          <div className="row">
                            <div className="col-8">
                              <h5 className="card-title text-uppercase">Reserved quantity : {booking?.quantity}</h5>
                            </div>
                            <div className="col-4">
                              <h5 className="card-text text-uppercase text-danger">{booking?.listing?.price * booking?.quantity}€</h5>
                            </div>
                            <hr></hr>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <p className="card-text">{booking?.listing?.owner?.address}</p>
                            </div>
                            <div className="col-6">
                              <p className="card-text">Pick up by {moment(booking?.listing?.owner?.endTimeSlot).format("ddd, hA")}</p>
                            </div>
                          </div>
                          <hr></hr>
                          <div className="row text-uppercase">
                            <Link to={`/account/bookings/${booking._id}`} style={{color: "red", textDecoration: "none"}}>
                              See this booking
                            </Link>
                          </div>
                        </div>
                      </div>
                    {/* </div> */}
                  </>
                );
              })}
          </div>
        </>
      )}

      {user.role === "business" && (
        // Render the view for pros
        <>
          <h3>My Bookings</h3>
          {!proBookings && <p>You don't have any bookings for the moment</p>}
          {proBookings && (
            <>
              <div className="d-inline-flex-wrap row justify-content-center">
                {proBookings.map((booking) => (
                  <div
                    style={{
                      width: "300px",
                      border: "1px solid #FF8585",
                      borderRadius: "20px",
                    }}
                    className="m-4 p-2"
                  >
                    <h3>Buyer: {booking?.buyer?.name}</h3>
                    <p>Listing: {booking?.listing?.name}</p>
                    <p>Quantity: {booking?.quantity}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Account;
