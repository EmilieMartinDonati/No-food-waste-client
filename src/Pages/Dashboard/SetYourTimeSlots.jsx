import React, { useState } from "react";
import axios from "axios";

const SetYourTimeSlots = ({ business }) => {
  const [startTimeSlot, setStartTimeSlot] = useState(null);
  const [endTimeSlot, setEndTimeSlot] = useState(null);

  const handleStartTimeChange = (evt) => {
    console.log("start time", evt.target.value);
    console.log("start time typeof", typeof evt.target.value);
    // setStartTimeSlot(evt.target.value);
  };

  const handleEndTimeChange = (evt) => {
    console.log("end time", evt.target.value);
    console.log("end time typeof", typeof evt.target.value);
    // setEndTimeSlot(evt.target.value);
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

    axios
      .post("http://localhost:4000/api/business/create", formData)
      .then((dbRes) => {
        console.log(dbRes);
        // navigate("/dashboard");
      })
      .catch((err) => console.error(err));
  };

  return (
    <form>
      <h2>At what time can users pick up their order?</h2>
      <p>
        Set your timeslots below for pickup. Note that the majority of our
        partners set this timeslot between 15 to 30 minutes before closing.
      </p>

      <label htmlFor="startTime"></label>
      <input
        type="datetime-local"
        id="startTime"
        onChange={(evt) => handleStartTimeChange(evt)}
      />

      <label htmlFor="endTime"></label>
      <input
        type="datetime-local"
        id="endTime"
        onChange={(evt) => handleEndTimeChange(evt)}
      />

      <button onClick={(evt) => handleClick(evt)}>Register timeslots</button>
    </form>
  );
};

export default SetYourTimeSlots;
