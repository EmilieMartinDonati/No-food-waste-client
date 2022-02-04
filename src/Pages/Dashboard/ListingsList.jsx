import React from "react";

const ListingsList = ({ business }) => {
  return (
    <div>
      {!business && <p>You don't have any listings for the moment</p>}
      {business && (
        <ul>
          This is the list of business of the CU
          {business.listings?.map((listing) => (
            <li key={listing._id}>{listing.name}</li>
          ))}
        </ul>
      )}
      <button>Add a listing</button>
    </div>
  );
};

export default ListingsList;
