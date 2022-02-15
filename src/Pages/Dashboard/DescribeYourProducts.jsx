import React, { useEffect, useState } from "react";
import apiHandler from "../../API/APIHandler";

const DescribeYourProducts = ({ setBusiness, setStep }) => {
  const [options, setOptions] = useState([]);
  const [tags, setTags] = useState([]);

  // This hook will retrieve all possible categories that will be options for tags dropdown
  useEffect(() => {
    apiHandler
      .get("/api/category")
      .then((dbRes) => setOptions(dbRes.data))
      .catch((err) => console.error(err));
  }, []);

  // This function will add very selected tag to the tags array
  const handleChange = (evt) => {
    const newTags = [];
    const selectedOptions = evt.target.selectedOptions;

    // Note: here I use a for loop because I can't do map or ForEach the HTML collection that I get from evt.target.selectedOptions
    // Even if I do a Array.of or an equivalent to transform the collection
    for (let i = 0; i < selectedOptions.length; i++) {
      newTags.push(selectedOptions[i].value);
    }
    setTags(newTags);
  };

  // This function will handle the form submit
  const handleClick = (evt) => {
    evt.preventDefault();

    // I update all the information of the business with the tags
    setBusiness((prevValues) => {
      return { ...prevValues, tags };
    });

    // I change my state to go to my next view of the form (timeslots selection)
    setStep(3);
  };

  return (
    <form className="p-4">
      <h2>Describe the products you sell</h2>
      <p>
        Tell us what kind of products you will be selling. This information will
        appear in the app.
      </p>

      <h3>Which tags best describe your business and products?</h3>

      <div className="dropdown m-3">
        <select
          // className="dropdown-menu"
          type="text"
          name="tags"
          placeholder="Select all relevant tags"
          onChange={(evt) => handleChange(evt)}
          multiple
        >
          {options &&
            options.map((option) => (
              <option className="dropdown-item" value={option._id}>
                {option.name}
              </option>
            ))}
        </select>
      </div>

      <button className="btn" onClick={(evt) => handleClick(evt)} style={{backgroundColor: "rgb(255, 70, 70)"}}>
        Ok
      </button>
    </form>
  );
};

export default DescribeYourProducts;
