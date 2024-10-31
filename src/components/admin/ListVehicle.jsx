import React, { useEffect } from "react";
import { vehicleService } from "../../services/vehicleService";

export default function ListVehicle() {
  const [vehicle, setVehicle] = React.useState([]);

  useEffect(() => {
    const GetAllVehicle = async () => {
      try {
        const res = await vehicleService.getAll();
        if (res && res.data) {
          setVehicle(res.data);
        }
      } catch (error) {
        console.error("Error retrieving vehicles:", error);
        alert("Failed to retrieve vehicles");
      }
    };
    GetAllVehicle();
  });
  return (
    <div>
      {vehicle.map((item) => (
        <div key={item._id}>
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
}
