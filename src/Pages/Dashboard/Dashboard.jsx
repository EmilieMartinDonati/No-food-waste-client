import React, { useEffect, useState } from "react";
import Onboarding from "./Onboarding";
import ListingsList from "./ListingsList";
import axios from "axios";
import useAuth from "../../context/UseAuth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [businessOfCurrentUser, setBusinessOfCurrentUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/business")
      .then((allBusinesses) => {
        allBusinesses.data.find(
          (business) => business.owner === currentUser._id
        );
      })
      .then((foundBusiness) => setBusinessOfCurrentUser(foundBusiness))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {!businessOfCurrentUser && <Onboarding />}
      {businessOfCurrentUser && (
        <>
          <ListingsList business={businessOfCurrentUser} />
          <button onClick={() => navigate("/listings/create")}>
            Add a listing
          </button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
