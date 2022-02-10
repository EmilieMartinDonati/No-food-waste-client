import React, { useEffect, useState } from "react";
import APIHandler from "../../API/APIHandler";
import { Link } from "react-router-dom";
import BookingCard from "../../components/BookingCard.jsx";

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
    <>
      <h1>Welcome {user.name}</h1>
      {user.role === "user" && (
        // Render the view for buyers
        <>
          <h3>My Bookings</h3>

          {!user.bookings && <p>You don't have any bookings for the moment</p>}
          {user.bookings &&
            user.bookings.length > 0 &&
            user.bookings.map((booking) => {
              return (
                <>
                  <div className="card" style={{ width: "30rem" }}>
                    <img
                      className="card-img-top"
                      src={booking.listing?.owner?.picture}
                      alt={booking.listing?.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        Reserved quantity : {booking.quantity}
                      </h5>
                      <h5 className="card-text">
                        Price: {booking.listing?.price}€
                      </h5>
                      <p className="card-text">
                        {booking.listing?.owner?.address}
                      </p>
                      <p className="card-text">
                        Pick up by {booking.listing?.owner?.pickupTimeSlots}
                      </p>
                      <Link to={`/account/bookings/${booking._id}`}>
                        See this booking
                      </Link>
                    </div>
                  </div>
                </>
              );
            })}
        </>
      )}

      {user.role === "business" && (
        // Render the view for pros
        <>
          <h3>My Bookings</h3>
          {!proBookings && <p>You don't have any bookings for the moment</p>}
          {proBookings && (
            <>
              <p>Here are your bookings</p>
              <div className="d-flex column">
                {proBookings.map((booking) => (
                  <div>
                    <h3>{booking.buyer.name}</h3>
                    <p>{booking.listing.name}</p>
                    <p>{booking.quantity}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Account;
