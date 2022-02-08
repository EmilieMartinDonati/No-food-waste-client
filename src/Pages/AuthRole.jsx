import { useNavigate } from "react-router-dom";
import useAuth from "./../context/UseAuth";

// Creating a component that will be the first UI displayed to the user when launching the website
const AuthRole = ({ setRole }) => {
  const { isLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();

  // Function to redirect the user to the signin page
  const handleUserSubmit = () => {
    setRole("user");
    navigate("/signup");
  };

  // Function to redirect the user to the loginpage AFTER having changed its role to business
  const handleBusinessSubmit = () => {
    setRole("business");
    navigate("/signup");
  };

  // Return a simple DOM element with one header and two buttons to choose your role on the platform
  return (
    <div>
      {!isLoggedIn && (
        <div className="p-5">
          <h1 className="my-5">How will you help us stop wasting food?</h1>
          <button
            className="btn btn-primary mx-4 px-3"
            onClick={handleUserSubmit}
          >
            I will buy food
          </button>
          <button
            className="btn btn-primary mx-4 px-3"
            onClick={handleBusinessSubmit}
          >
            I will sell food
          </button>
        </div>
      )}
      {isLoggedIn && currentUser.role === "user" && navigate("/discover")}
      {isLoggedIn && currentUser.role === "business" && navigate("/dashboard")}
    </div>
  );
};

export default AuthRole;
