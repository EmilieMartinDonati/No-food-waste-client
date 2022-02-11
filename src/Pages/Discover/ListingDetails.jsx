import React, { useEffect, useState } from "react";
import APIHandler from "../../API/APIHandler";
import ListingCard from "../../components/ListingCard";
import { useParams, useNavigate } from "react-router-dom";
import { useRef } from "react";
import apiHandler from "../../API/APIHandler";
import useAuth from "../../context/UseAuth";
import StripeCheckout from "react-stripe-checkout";

const ListingDetails = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const elementRef = useRef();
  // console.log("this shall be the div I'm trying to collapse", elementRef.current.className)

  const [listing, setListing] = useState([]);

  // All the states for the form.
  const [quantity, setQuantity] = useState(0);
  const [payment, setPayment] = useState("");

  //   console.log("log line 10");

  const { id } = useParams();
  //   console.log("this is the id from the params on the front line 13", id);

  useEffect(() => {
    APIHandler.get("/listing/" + id)
      .then((res) => {
        // console.log("this is the relevant listing on the front", res.data);
        setListing(res.data);
      })
      .catch((e) => console.log("here err", e));
  }, []);

  // Manage stripe checkout
  const makePayment = async (token) => {
    try {
      const headers = { "Content-Type": "application/json" };
      const body = { token, listing };

      await apiHandler.post("/payment", { headers, body });

      console.log("this is the qty and payment", quantity, payment);
      console.log("this is the current user", currentUser);

      const data = {
        quantity,
        payment,
        listing: listing._id,
        buyer: currentUser._id,
      };

      console.log("Do you arrive here?");

      const newBooking = await apiHandler.post(`/listing/${listing._id}`, data);

      console.log(newBooking.data);

      navigate(`/account/bookings/${newBooking.data._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const visibilityHandler = () => {
    elementRef.current.classList.toggle("collapse");
  };

  // Just to prevent the form from refreshing the page
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
        <div className="col-12">
        <h1 className="mt-3 mb-3">LISTING DETAILS</h1>
        </div>
        <div className="row">
          <div className="col-6">
            {listing.name && <ListingCard listing={listing} />}
          </div>

          <div className="col-6">
            <button
              onClick={visibilityHandler}
              className="btn btn-primary px-5 py-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              BOOK THIS MEAL
            </button>
            <div className="collapse" id="collapseExample" ref={elementRef}>
              <div className="card card-body">
                <form onSubmit={submitHandler} className="p-4">
                  <div className="form-group m-3">
                    <label htmlFor="label" className="card-title">
                      Quantity
                    </label>
                  </div>
                  <div className="form-group m-3">
                    <input
                      type="number"
                      id="label"
                      min="1"
                      max={listing.availableQuantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="form-group m-3">
                    <label htmlFor="payment">PAYMENT</label>
                  </div>
                  <div className="form-group m-3">
                    <select
                      id="payment"
                      onChange={(e) => setPayment(e.target.value)}
                    >
                      <option id="VISA">VISA</option>
                      <option id="MASTERCARD">MASTERCARD</option>
                      <option id="PAYPAL">PAYPAL</option>
                    </select>
                  </div>
                  <StripeCheckout
                    stripeKey={import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY}
                    token={makePayment}
                    name="buy-something"
                    amount={listing.price * 100}
                  >
                    <button className="btn btn-primary px-5 py-2">
                      ${listing.price}
                    </button>
                  </StripeCheckout>
                </form>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingDetails;
