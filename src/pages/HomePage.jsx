import React from "react";
import VehicleOption from "../components/vehicleOption";

export default function HomePage() {

  const vehicle = [
    {
      id: 1,
      name: 'Xe du lịch'
    },
    {
      id: 2,
      name: 'Máy bay'
    }
  ]
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-center mt-20 space-x-20">
        {
          vehicle.map((item) => (
            <div key={item.id}>
              <VehicleOption name={item.name} />
            </div>
          ))
        }
      </div>
    </div>
  );
}
