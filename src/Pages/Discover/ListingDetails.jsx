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
      <div className="background">
        <div className="display-flex-column align-content-center justify-content-center">
          <h1 className="p-5">LISTING DETAILS</h1>
          <div className="display-flex">
            <div id="listing-card-div-flex">
              {listing.name && <ListingCard listing={listing} />}
              <p>
                <strong>GENERAL CONDITONS: </strong>Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Nisi sunt, labore hic tempora aut
                perferendis delectus nulla doloremque, totam excepturi, eaque
                officiis veritatis ipsum dolor suscipit debitis? Dolorem, error
                ea. Facilis, optio dignissimos possimus fugit reiciendis maiores
                ipsum quia tempora eveniet! Recusandae unde nam reiciendis
                facilis fuga numquam culpa enim ratione dignissimos sunt cumque
                quas totam esse, omnis debitis sint. Asperiores quam rem dolor,
                pariatur molestias excepturi omnis commodi, magnam saepe
                architecto quidem. Deleniti modi beatae assumenda voluptates
                esse mollitia iusto repellat, eum nam, optio perspiciatis,
                facilis quibusdam sit maxime.
              </p>
            </div>
          </div>
          <div className="m-4">
            <button
              onClick={visibilityHandler}
              className="btn btn-primary px-5 py-2"
              style={{ backgroundColor: "#FF4646", border: 0 }}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              BOOK THIS MEAL
            </button>
            <div className="collapse" id="collapseExample" ref={elementRef}>
              <div
                className="card card-body"
                style={{ backgroundColor: "#FFF5C0", border: 0 }}
              >
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
                    <button
                      className="btn btn-primary px-5 py-2"
                      style={{ backgroundColor: "#FF4646", border: 0 }}
                    >
                      ${listing.price}
                    </button>
                  </StripeCheckout>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingDetails;
