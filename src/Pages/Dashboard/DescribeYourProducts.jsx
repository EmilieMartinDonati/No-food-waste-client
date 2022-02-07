import React, { useState } from "react";

const DescribeYourProducts = ({ setBusiness, setStep }) => {
  const [tags, setTags] = useState([]);

  // This function will add very selected tag to the tags array
  const handleChange = (evt) => {
    const newTags = [];
    const options = evt.target.selectedOptions;

    // Note: here I use a for loop because I can't map or ForEach the HTML collection
    // that I get from evt.target.selectedOptions
    // Even if I do a Array.of or an equivalent to transform the collection
    for (let i = 0; i < options.length; i++) {
      newTags.push(options[i].value);
    }

    console.log("This is newTags on line 18", newTags);

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
          <option className="dropdown-item" value="Restaurant">
            Restaurant
          </option>
          <option className="dropdown-item" value="Bakery">
            Bakery
          </option>
          <option className="dropdown-item" value="Supermarket">
            Supermarket
          </option>
          <option className="dropdown-item" value="Vegan">
            Vegan
          </option>
          <option className="dropdown-item" value="Vegetarian">
            Vegetarian
          </option>
          <option className="dropdown-item" value="Italian">
            Italian
          </option>
        </select>
      </div>

      <button className="btn btn-primary" onClick={(evt) => handleClick(evt)}>
        Ok
      </button>
    </form>
  );
};

export default DescribeYourProducts;
