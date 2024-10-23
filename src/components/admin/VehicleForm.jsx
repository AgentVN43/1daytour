import React, { useState } from "react";
import { vehicleService } from "../services/vehicleServices";
import { TextField, Button, Checkbox, FormControlLabel, Box, Typography } from "@mui/material";

export default function VehicleForm() {
  const [vehicle, setVehicle] = useState({
    vehicleId: "",
    type: "",
    seatingCapacity: "",
    isActive: false,
    features: "",
    pricePerDay: "",
    pricePerKm: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVehicle((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Splitting the features string by commas to convert it into an array
    const formattedVehicle = {
      ...vehicle,
      seatingCapacity: parseInt(vehicle.seatingCapacity, 10),
      pricePerDay: parseInt(vehicle.pricePerDay, 10),
      pricePerKm: parseInt(vehicle.pricePerKm, 10),
      features: vehicle.features.split(",").map((f) => f.trim()),
    };

    try {
      await vehicleService.create(formattedVehicle);
      alert("Vehicle created successfully!");
      setVehicle({
        vehicleId: "",
        type: "",
        seatingCapacity: "",
        isActive: false,
        features: "",
        pricePerDay: "",
        pricePerKm: "",
      });
    } catch (error) {
      console.error("Error creating vehicle:", error);
      alert("Failed to create vehicle.");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add New Vehicle
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Vehicle ID"
          name="vehicleId"
          value={vehicle.vehicleId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Type"
          name="type"
          value={vehicle.type}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Seating Capacity"
          name="seatingCapacity"
          type="number"
          value={vehicle.seatingCapacity}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              name="isActive"
              checked={vehicle.isActive}
              onChange={handleChange}
            />
          }
          label="Is Active"
        />
        <TextField
          label="Features (comma separated)"
          name="features"
          value={vehicle.features}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price Per Day"
          name="pricePerDay"
          type="number"
          value={vehicle.pricePerDay}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Price Per Km"
          name="pricePerKm"
          type="number"
          value={vehicle.pricePerKm}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
}
