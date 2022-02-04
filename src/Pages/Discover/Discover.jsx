import axios from "axios";
import React, { useEffect, useState } from "react";
import ListingCard from "../../components/ListingCard";

const Discover = () => {
  const [allListings, setAllListings] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:4000/listings")
      .then((dbRes) => setAllListings(dbRes.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>This is the Discover home page</h1>
      {allListings.map((listing) => {
        return <ListingCard listing={listing} />;
      })}
    </div>
  );
};

export default Discover;
