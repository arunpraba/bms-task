import React from "react";

const Alert = ({ items, isExisting }) => {
  return (
    <div className="alert">
      <div>{isExisting ? "Existing" : "Added"}</div>
      <div className="card">
        {items.map(value => (
          <div className="item" key={value}>
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alert;
