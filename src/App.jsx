import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import AuthRole from "./Pages/AuthRole";
import AuthSignin from "./Pages/AuthSignin";
import AuthSignup from "./Pages/AuthSignup";

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
      </Routes>
    </div>
  );
}

export default App;
