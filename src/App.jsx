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

// Page Test pour le TimeSlot
import TimeSlots from "./PagesTest/TimeSlots";

function App() {
  const [role, setRole] = useState("user");

  return (
    <div className="App">
      <h1>Hello</h1>
      <Navbar />

      <Routes>
        <Route path="/" element={<AuthRole setRole={setRole} />} />
        <Route path="/signup" element={<AuthSignup role={role} />} />
        <Route path="/login" element={<AuthSignin role={role} />} />
        <Route path="/testTimeSlot" element={<TimeSlots />} />
        <Route element={<PrivateRoute />}>
           <Route path="/discover" element={<Discover />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/listings" element={<Browse />} />
        <Route Path="/listings/id" element={<ListingDetails/>} />
      </Routes>
    </div>
  );
}

export default App;
