import React from "react";
import found from "./../images/datanotfound.gif";

const DataNotFound = () => {
  return (
    <>
      <div className="nodatafound">
        <img style={{ height: "200px" }} src={found} />
        <p>Data Not Found</p>
      </div>
    </>
  );
};

export default DataNotFound;
