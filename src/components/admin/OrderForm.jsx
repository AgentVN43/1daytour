import React, { useEffect, useState } from "react";
import { orderService } from "../../services/orderService";
import {
  Form,
  Button,
  DatePicker,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import moment from "moment";

const { Option } = Select;

// Sample Province JSON Data
const provinces = [
  { name: "An Giang", code: "AGI" },
  { name: "Bà Rịa – Vũng Tàu", code: "VTB" },
  { name: "Bạc Liêu", code: "BLI" },
];

const carOptions = [
    { type: "16-seat tourist car", capacity: 16 },
    { type: "33-seat tourist car", capacity: 33 },
    { type: "45-seat tourist car", capacity: 45 },
  ];

export default function OrderForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [tourId, setTourId] = useState("");
  const [passengers, setPassengers] = useState(0);
  const [night, setNight] = useState(0);
  const [duration, setDuration] = useState(0);

  const [selectedCars, setSelectedCars] = useState([]);

  // Function to get province code by name
  const getProvinceCode = (name) => {
    const province = provinces.find((p) => p.name === name);
    return province ? province.code : "";
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const generatedId = generateTourId(
        values.departure,
        values.destination,
        values.departureDate,
        values.vehicleType
      );
      const nights = calculateNights(values.departureDate, values.returnDate);
      const duration = calculateNightsAndDays(values.departureDate, values.returnDate);
      setDuration(duration)
      setNight(nights);
      setTourId(generatedId);
      handleCalculate()
      console.log("This is data form:", values);
      message.success("Order created successfully");
      //form.resetFields();
    } catch (error) {
      message.error("Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  const generateTourId = (
    departure,
    destination,
    departureDate,
    vehicleType
  ) => {
    const depCode = getProvinceCode(departure);
    const destCode = getProvinceCode(destination);
    const formattedDate = departureDate.format("DDMMYY");

    const timestamp = Date.now().toString().slice(-5);
    const randomNum = Math.floor(100 + Math.random() * 900);
    const uniqueOrder = `${timestamp}${randomNum}`;

    return `${depCode}${destCode}-${uniqueOrder}-${formattedDate}${vehicleType}`;
  };

  const calculateNights = (departureDate, returnDate) => {
    const msInADay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const nights = Math.round(
      (new Date(returnDate) - new Date(departureDate)) / msInADay
    );
    return nights;
  };

  const calculateNightsAndDays = (departureDate, returnDate) => {
    const msInADay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const departure = new Date(departureDate);
    const returnD = new Date(returnDate);
  
    const totalDays = Math.round((returnD - departure) / msInADay) + 1; // Add 1 to include the departure day
    const totalNights = totalDays - 1;
  
    return `${totalDays}N${totalNights}D`;
  };

  const calculateOptimalCars = (passengers) => {
    const combinations = [];

    // Calculate total seats available across all car types
    const totalAvailableSeats = carOptions.reduce((sum, car) => sum + car.capacity, 0);

    // Check if the total number of passengers exceeds the available seats
    if (passengers > totalAvailableSeats) {
      console.log("Not enough cars to accommodate all passengers.");
      return [];
    } else {
        console.log("")
    }

    // Try every combination of 1, 2, or 3 cars
    for (let i = 0; i < carOptions.length; i++) {
      for (let j = i; j < carOptions.length; j++) {
        for (let k = j; k < carOptions.length; k++) {
          const cars = [];
          if (i === j && j === k) {
            // Only one type of car
            cars.push(carOptions[i]);
          } else if (i === j) {
            // Two of the first car type and one of the second or third
            cars.push(carOptions[i], carOptions[j]);
          } else if (j === k) {
            // One of the first car and two of the second or third
            cars.push(carOptions[i], carOptions[j]);
          } else {
            // Three different car types
            cars.push(carOptions[i], carOptions[j], carOptions[k]);
          }

          const totalSeats = cars.reduce((sum, car) => sum + car.capacity, 0);
          if (totalSeats >= passengers) {
            combinations.push(cars);
          }
        }
      }
    }

    // Find the combination with the smallest total seats that still fits the passengers
    const optimalCombination = combinations.sort(
      (a, b) => a.reduce((sum, car) => sum + car.capacity, 0) - b.reduce((sum, car) => sum + car.capacity, 0)
    )[0];

    return optimalCombination || [];
  };

  const handleCalculate = () => {
    const optimalCars = calculateOptimalCars(passengers);
    setSelectedCars(optimalCars);
  };

  console.log("This is tourID:", tourId);
  console.log("This is passenger:", passengers);
  console.log("This is night:", night);
  console.log("This is duration:", duration)
  console.log("This is cars", selectedCars);

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Create Order</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="customerName"
          label="Customer Name"
          rules={[
            { required: true, message: "Please enter the customer name" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="tourId" label="Tour ID">
          <Input value={tourId} readOnly />
        </Form.Item>
        <Form.Item
          name="departure"
          label="Departure"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select Departure">
            {provinces.map((province) => (
              <Option key={province.code} value={province.name}>
                {province.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="destination"
          label="Destination"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select Destination">
            {provinces.map((province) => (
              <Option key={province.code} value={province.name}>
                {province.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="departureDate"
          label="Departure Date"
          rules={[{ required: true }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="returnDate"
          label="Return Date"
          rules={[{ required: true }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name={["passengers", "adults"]}
          label="Number of Adults"
          rules={[
            { required: true, message: "Please enter the number of adults" },
          ]}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>

        <Form.Item
          name={["passengers", "childrenUnder2"]}
          label="Children Under 2"
        >
          <InputNumber min={0} className="w-full" />
        </Form.Item>

        <Form.Item
          name={["passengers", "childrenUnder12"]}
          label="Children Under 12"
        >
          <InputNumber min={0} className="w-full" />
        </Form.Item>

        <Form.Item
          name="vehicleType"
          label="Vehicle Type"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select Vehicle Type">
            <Option value="XE">Car</Option>
            <Option value="MB">Airplane</Option>
          </Select>
        </Form.Item>

        {/* Total Passengers Calculation */}
        <Form.Item
          label="Total Passengers"
          dependencies={[
            ["passengers", "adults"],
            ["passengers", "childrenUnder2"],
            ["passengers", "childrenUnder12"],
          ]}
          shouldUpdate={(prevValues, curValues) => {
            // Check if any of the passenger fields have changed
            return (
              prevValues.passengers?.adults !== curValues.passengers?.adults ||
              prevValues.passengers?.childrenUnder2 !==
                curValues.passengers?.childrenUnder2 ||
              prevValues.passengers?.childrenUnder12 !==
                curValues.passengers?.childrenUnder12
            );
          }}
        >
          {({ getFieldValue }) => {
            const adults = getFieldValue(["passengers", "adults"]) || 0;
            const childrenUnder2 =
              getFieldValue(["passengers", "childrenUnder2"]) || 0;
            const childrenUnder12 =
              getFieldValue(["passengers", "childrenUnder12"]) || 0;
            const totalPassengers = adults + childrenUnder2 + childrenUnder12;
            setPassengers(totalPassengers);
            return <span>{totalPassengers}</span>;
          }}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
