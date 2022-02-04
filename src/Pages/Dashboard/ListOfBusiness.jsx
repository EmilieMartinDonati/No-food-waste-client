import React from "react";

const ListOfBusiness = ({ business }) => {
  return (
    <div>
      <h1>This is the list of business of the CU</h1>
      {business.map((biz) => (
        <li>{biz.name}</li>
      ))}
    </div>
  );
};

export default ListOfBusiness;
