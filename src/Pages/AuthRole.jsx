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
        <div id="cover-image-auth-role">
          <div
            className="d-flex-wrap row align-items-center"
            style={{ height: "100%" }}
          >
            <h1 style={{ "font-size": "7rem", color: "white" }}>
              How will you help us stop wasting food?
            </h1>
            <div>
              <button
                className="btn btn-primary mx-4 px-5"
                style={{ backgroundColor: "#FF4646", border: 0 }}
                onClick={handleUserSubmit}
              >
                I will buy food
              </button>
              <button
                className="btn btn-primary mx-4 px-5"
                style={{ backgroundColor: "#FF4646", border: 0 }}
                onClick={handleBusinessSubmit}
              >
                I will sell food
              </button>
            </div>
          </div>
        </div>
      )}
      {isLoggedIn && currentUser.role === "user" && navigate("/discover")}
      {isLoggedIn && currentUser.role === "business" && navigate("/dashboard")}
    </div>
  );
};

export default AuthRole;
