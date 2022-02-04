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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/discover" element={<Discover />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
