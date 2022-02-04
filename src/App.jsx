import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import AuthRole from "./Pages/AuthRole";
import AuthSignin from "./Pages/AuthSignin";
import AuthSignup from "./Pages/AuthSignup";
import Onboarding from "./Pages/Dashboard/Onboarding";

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
        <Route path="/dashboard" element={<Onboarding />} />
      </Routes>
    </div>
  );
}

export default App;
