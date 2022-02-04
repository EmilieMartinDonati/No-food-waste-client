import React, { useState } from "react";

const DescribeYourProducts = ({ setBusiness, setStep }) => {
  const [tags, setTags] = useState([]);

  const handleChange = (evt) => {
    const options = evt.target.options;
    setTags(Array.of(options).filter((option) => option.selected === true));
    console.log(tags);
  };

  const handleClick = (evt) => {
    evt.preventDefault();
    setBusiness((prevValues) => {
      return { ...prevValues, tags };
    });
    setStep(3);
  };

  return (
    <form onSelect={(evt) => handleChange(evt)}>
      <h2>Describe the products you sell</h2>
      <p>
        Tell us what kind of products you will be selling. This information will
        appear in the app.
      </p>

      <h3>Which segments best describes your business and products?</h3>
      <select
        type="text"
        name="tags"
        placeholder="Select all relevant tags"
        multiple
      >
        <option value="japonais">japonais</option>
        <option value="coréen">coréen</option>
        <option value="thaï">thaï</option>
        <option value="vegan">vegan</option>
        <option value="boulangerie">Boulangerie</option>
      </select>

      <button onClick={(evt) => handleClick(evt)}>Ok</button>
    </form>
  );
};

export default DescribeYourProducts;
