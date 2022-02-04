import { useEffect, useState } from "react";
import APIHandler from "../../API/APIHandler";
import ListingCard from "../../components/ListingCard";

const ListingDetails = () => {

const [listing, setListing] = useState([]);

useEffect(() => {
   APIHandler.get("/listings/:id")
   .then((res) => {
       console.log(res.data);
       setListing(res.data);
   })
}, [])


    return (
        <>
        <h1>Listing details</h1>
        <ListingCard listing={listing} />
        </>
    )
}

export default ListingDetails;