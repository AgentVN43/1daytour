import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";

export default function TourBooking() {
  const { tourId } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Select Date", "Passenger Info", "Review & Pay"];

  return (
    <Container maxWidth="md">
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Add booking form steps */}
    </Container>
  );
}
