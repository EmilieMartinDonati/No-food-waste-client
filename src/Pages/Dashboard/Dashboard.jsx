import React, { useEffect, useState } from "react";
import Onboarding from "./Onboarding";
import ListingsList from "./ListingsList";
import useAuth from "../../context/UseAuth";
import { useNavigate } from "react-router-dom";
import apiHandler from "../../API/APIHandler";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [businessOfCurrentUser, setBusinessOfCurrentUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    apiHandler
      .get("/api/business")
      .then((allBusinesses) => {
        return allBusinesses.data.find(
          (business) => business.owner === currentUser._id
        );
      })
      .then((foundBusiness) => setBusinessOfCurrentUser(foundBusiness))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="background">
      {!businessOfCurrentUser && (
        <div>
          <p className="p-5">Vous n'avez pas encore de business enregistré</p>
          <button
            className="btn btn-primary py-2 px-5"
            style={{ backgroundColor: "#FF4646", border: 0 }}
            onClick={() => navigate("/onboarding")}
          >
            New business
          </button>
        </div>
      )}
      {businessOfCurrentUser && (
        <ListingsList
          business={businessOfCurrentUser}
          setBusiness={setBusinessOfCurrentUser}
        />
      )}
    </div>
  );
};

export default Dashboard;
