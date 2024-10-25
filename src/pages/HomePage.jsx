import React, { useEffect, useState } from "react";
import VehicleOption from "../components/vehicleOption";
import { vehicleTypeService } from "../services/vehicleTypeService";

export default function HomePage() {

  const [vehicleType, setVehicleType] = useState([])

  const GetAllVehicleType = async (e) => {
    try {
      const res = await vehicleTypeService.getAll();
      if (res && res.data) {
        setVehicleType(res.data)
      }
    } catch (error) {
      console.error("Error creating vehicle:", error);
      alert("Failed to create vehicle.");
    }
  };

  useEffect(() => {
    GetAllVehicleType();
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-center mt-20 space-x-20">
        {
          vehicleType.map((item) => (
            <div key={item._id}>
              <VehicleOption item={item} />
            </div>
          ))
        }
      </div>
    </div>
  );
}
