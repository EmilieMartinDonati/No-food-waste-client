import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import AuthRole from "./Pages/AuthRole";
import AuthSignin from "./Pages/AuthSignin";
import AuthSignup from "./Pages/AuthSignup";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Discover from "./Pages/Discover/Discover";
import PrivateRoute from "./components/PrivateRoute";
import Browse from "./Pages/Discover/Browse";
import ListingDetails from "./Pages/Discover/ListingDetails";
import Onboarding from "./Pages/Dashboard/Onboarding";
import CreateListing from "./Pages/Listing-CRUD/CreateListing";
import ModifyListing from "./Pages/Listing-CRUD/ModifyListing";
import Account from "./Pages/Account/Account";
// import Bookings from "./Pages/Account/Bookings";
import OneBooking from "./Pages/Account/OneBooking";
import Favorites from "./Pages/Account/Favorites";
// import Welcome from "./Pages/Welcome";

// // Page Test pour le TimeSlot
// import TimeSlots from "./PagesTest/TimeSlots";

function App() {
  const [role, setRole] = useState("user");

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<AuthRole setRole={setRole} />} />
        <Route path="/signup" element={<AuthSignup role={role} />} />
        <Route path="/login" element={<AuthSignin role={role} />} />
        <Route element={<PrivateRoute />}>
          <Route path="/discover" element={<Discover />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/bookings/:id" element={<OneBooking />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/listings/create" element={<CreateListing />} />
          <Route
            path="/listings/:listingId/update"
            element={<ModifyListing />}
          />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
        <Route path="/listings" element={<Browse />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
      </Routes>
    </div>
  );
}

export default App;
