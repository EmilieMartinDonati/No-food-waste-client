import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import AuthRole from "./Pages/AuthRole";
import AuthSignin from "./Pages/AuthSignin";
import AuthSignup from "./Pages/AuthSignup";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/onboarding" element={<AuthRole />} />
        <Route path="/signup" element={<AuthSignup />} />
        <Route path="/login" element={<AuthSignin />} />
      </Routes>
    </div>
  );
}

export default App;
