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
                console.log("this is the relevant listing on the front", res.data);
                setListing(res.data);
            })
            .catch((e) => console.log("here err", e))
    }, [])

    return (
        <>
            <h1>Listing details</h1>
            {listing.name && (
                <ListingCard listing={listing} />
            )}
            <p>
                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    Button with data-bs-target
                </button>
            </p>
            <div class="collapse" id="collapseExample">
                <div class="card card-body">
                    <h3>Book your meal</h3>
                    <form>
                        <button></button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ListingDetails;