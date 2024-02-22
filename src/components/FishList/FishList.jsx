import React from "react";
import "./FishList.css";

function FishList({ data, onDelete }) {
  return (
    <div className="list">
      {data.map((item) => {
        return (
          <div className="item" key={item.id}>
            <span>
              jmeno: {item.name} velikost: {item.type}
            </span>
            <button className="btn-delete" onClick={() => onDelete(item.id)}>
              X
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default FishList;
