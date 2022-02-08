import { useEffect, useState } from "react";
import APIHandler from "../../API/APIHandler";
import ListingCard from "../../components/ListingCard";
import { useParams, useNavigate } from "react-router-dom";
import { useRef } from 'react';
import apiHandler from "../../API/APIHandler";
import useAuth from "../../context/UseAuth";

const ListingDetails = () => {

    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const elementRef = useRef();
    // console.log("this shall be the div I'm trying to collapse", elementRef.current.className)

    const [listing, setListing] = useState([]);

    // All the states for the form.
    const [quantity, setQuantity] = useState(0);
    const [payment, setPayment] = useState("");

    console.log("log line 10")

    const { id } = useParams();
    console.log("this is the id from the params on the front line 13", id);

    useEffect(() => {
        APIHandler.get("/listing/" + id)
            .then((res) => {
                console.log("this is the relevant listing on the front", res.data);
                setListing(res.data);
            })
            .catch((e) => console.log("here err", e))
    }, [])

    const visibilityHandler = () => {
        elementRef.current.classList.toggle("collapse");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("this is the qty and payment", quantity, payment);
        console.log("this is the current user", currentUser);
        const data = {
            quantity,
            payment,
            listing: listing._id,
            buyer: currentUser._id
        }
        apiHandler.post(`/listing/${id}`, data)
        .then((res) => {
            console.log(res.data);
            navigate(`/account/bookings/${res.data._id}`);
         
          })  
        .catch((e) => console.log(e))
    }
 
    return (
        <>
            <h1>Listing details</h1>
            {listing.name && (
                <ListingCard listing={listing} />
            )}
            <p>
                <button onClick={visibilityHandler} className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    BOOK THIS MEAL
                </button>
            </p>
            <div className="collapse" id="collapseExample" ref={elementRef}>
                <div className="card card-body">
                    <form onSubmit={submitHandler}>
                    <label htmlFor="label" className="card-title">Quantity</label>
                    <input type="number" id="label" min="1" max={listing.availableQuantity} onChange={(e) => setQuantity(e.target.value)}/>

                    <label htmlFor="payment">PAYMENT</label>
                    <select id="payment" onChange={(e) => setPayment(e.target.value)}>
                        <option id="VISA">VISA</option>
                        <option id="MASTERCARD">MASTERCARD</option>
                        <option id="PAYPAL">PAYPAL</option>
                    </select>

                        <button>CONCLUDE BOOKING</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ListingDetails;