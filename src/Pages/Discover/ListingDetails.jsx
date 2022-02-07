import { useEffect, useState } from "react";
import APIHandler from "../../API/APIHandler";
import ListingCard from "../../components/ListingCard";
import { useParams } from "react-router-dom";

const ListingDetails = () => {

const [listing, setListing] = useState([]);

console.log("log line 10")

const { id } = useParams();
console.log("this is the id from the params on the front line 13", id);

useEffect(() => {
   APIHandler.get("/listing/" + id)
   .then((res) => {
       console.log(res.data);
       setListing(res.data);
   })
}, [id])


    return (
        <>
        <h1>Listing details</h1>
        {/* <ListingCard listing={listing} /> */}
        </>
    )
}

export default ListingDetails;