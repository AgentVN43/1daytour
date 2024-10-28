import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

export default function VehicleOption({ item, id }) {
  console.log("🚀 ~ VehicleOption ~ item:", item);
  console.log("🚀 ~ ID vehicle ~ id:", id);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/tour");
        // Store both item.code and item._id in localStorage as a JSON string
        localStorage.setItem(
          "selectedOption",
          JSON.stringify({
            code: item.code ? item.code : null,
            id: item._id ? item._id : null,
          })
        );
      }}
      className="card"
    >
      {item.type}
    </div>
  );
}
