import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHandler from "../../API/APIHandler";

const SetYourTimeSlots = ({ business }) => {
  const [startTimeSlot, setStartTimeSlot] = useState(null);
  const [endTimeSlot, setEndTimeSlot] = useState(null);
  const navigate = useNavigate();

  const handleStartTimeChange = (evt) => {
    setStartTimeSlot(new Date(evt.target.value));
  };

  const handleEndTimeChange = (evt) => {
    setEndTimeSlot(new Date(evt.target.value));
  };

  const handleClick = (evt) => {
    evt.preventDefault();

    const formData = new FormData();

    formData.append("name", business.name);
    formData.append("address", business.address);
    formData.append("phone", business.phone);
    formData.append("description", business.description);
    formData.append("picture", business.picture);
    formData.append("tags", business.tags);
    formData.append("startTimeSlot", startTimeSlot);
    formData.append("endTimeSlot", endTimeSlot);

    apiHandler
      .post("/api/business/create", formData)
      .then(() => {
        console.log("Hey, do you arrive here??????");
        navigate("/dashboard");
      })
      .catch((err) => console.error(err));
  };

  return (
    <form className="p-4">
      <h2>At what time can users pick up their order?</h2>
      <p>
        Set your timeslots below for pickup. Note that the majority of our
        partners set this timeslot between 15 to 30 minutes before closing.
      </p>

      <label htmlFor="startTime"></label>
      <input
        className="m-3"
        type="datetime-local"
        id="startTime"
        onChange={(evt) => handleStartTimeChange(evt)}
      />

      <label htmlFor="endTime"></label>
      <input
        className="m-3"
        type="datetime-local"
        id="endTime"
        onChange={(evt) => handleEndTimeChange(evt)}
      />

      <button
        className="btn btn-primary mx-4 px-5"
        style={{ backgroundColor: "#FF4646", border: 0 }}
        onClick={(evt) => handleClick(evt)}
      >
        Register timeslots
      </button>
    </form>
  );
};

export default SetYourTimeSlots;
