import React, { useState } from "react";
import axios from "axios";

const SetYourTimeSlots = ({ setBusiness, business }) => {
  const [timeSlots, setTimeSlots] = useState([]);

  const handleStartTimeChange = (evt) => {
    const copy = [...timeSlots];
    copy.shift();
    copy.unshift(evt.target.value);
    setTimeSlots(copy);
  };

  const handleEndTimeChange = (evt) => {
    const copy = [...timeSlots];
    copy.pop();
    copy.push(evt.target.value);
    setTimeSlots(copy);
  };

  const handleClick = (evt) => {
    evt.preventDefault();

    setBusiness((prevValues) => {
      return { ...prevValues, timeSlots };
    });

    console.log(business);

    axios
      .post("http://localhost:4000/api/business/create", business)
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
