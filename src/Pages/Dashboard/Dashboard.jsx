import React, { useEffect, useState } from "react";
import Onboarding from "./Onboarding";
import ListOfBusiness from "./ListOfBusiness";
import useAuth from "./../context/UseAuth";
import axios from "axios";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [businessOfCurrentUser, setBusinessOfCurrentUser] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/business")
      .then((allBusinesses) => {
        allBusinesses.find((business) => business.owner === currentUser._id);
      })
      .then((foundBusinesses) => setBusinessOfCurrentUser(foundBusinesses))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {!businessOfCurrentUser && <Onboarding />}
      {businessOfCurrentUser && (
        <ListOfBusiness business={businessOfCurrentUser} />
      )}
    </div>
  );
};

export default Dashboard;
