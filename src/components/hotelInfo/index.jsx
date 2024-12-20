import { DeleteOutlined, PlusOneOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  Input,
  InputNumber,
  Select,
  Space,
  Table,
  Typography,
  Tabs,
} from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState } from "react";
import FormStandar from "./formStandar";
import FormCustom from "./formCustom";
const { Title, Text } = Typography;
const { TabPane } = Tabs;
// <<<<<<<< HEAD:src/components/hotelsInfo/index.jsx
// export default function HotelsInfo({ infoTraveler, setInfoTraveler }) {
// ========
export default function HotelInfo({ infoTraveler, setInfoTraveler }) {
  console.log("🚀 ~ FoodInfo ~ infoTraveler:", infoTraveler)
// >>>>>>>> 20351de89ff533e4d3d15a0b855f0e035493d36e:src/components/hotelInfo/index.jsx
  const [nights, setNights] = useState(0);
  const [days, setDays] = useState("");
  const [data, setData] = useState([]);

  const [totalPassengers, setTotalPassengers] = useState(
    infoTraveler.passengers
  );

  const [roomType, setRoomType] = useState("2 people/room"); // Default to 2 people/room
  const [roomCount, setRoomCount] = useState(0);

  console.log("This is food info:", infoTraveler);

  const calculateNights = () => {
    const departureDate = new Date(infoTraveler.departureDate);
    const returnDate = new Date(infoTraveler.returnDate);

    // Check for valid dates and correct order
    if (isNaN(departureDate) || isNaN(returnDate)) {
      console.error("Invalid dates provided");
      return; // Exit if dates are invalid
    }

    if (returnDate <= departureDate) {
      console.error("Return date must be after departure date");
      setNights(0); // Set nights to 0 if invalid
      return; // Exit if dates are not valid
    }

    const msInADay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const nights = Math.round((returnDate - departureDate) / msInADay);
    setNights(nights); // Update the state with the calculated nights
  };

  const calculateNightsAndDays = () => {
    const departureDate = infoTraveler.departureDate;
    const returnDate = infoTraveler.returnDate;

    const msInADay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const departure = new Date(departureDate);
    const returnD = new Date(returnDate);

    const totalDays = Math.round((returnD - departure) / msInADay) + 1; // Add 1 to include the departure day
    const totalNights = totalDays - 1;
    const days = `${totalDays}N${totalNights}D`;
    setDays(days);
  };

  const calculateRoomCount = (roomType) => {
    let count;
    switch (roomType) {
      case "1 person/room":
        count = totalPassengers;
        break;
      case "2 people/room":
        count = Math.ceil(totalPassengers / 2);
        break;
      case "3 people/room":
        count = Math.ceil(totalPassengers / 3);
        break;
      default:
        count = 0;
    }
    setRoomCount(count);
    return count;
  };

  useEffect(() => {
    calculateNights();
    calculateNightsAndDays();
    calculateRoomCount(roomType);
  }, [infoTraveler, roomType]);

  return (
    <>
      {/* <Card style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
        <Title level={3} style={{ marginBottom: 24 }}>
          Hotels Optimizer
        </Title>

        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          rowKey="key"
          style={{ marginBottom: 16 }}
        />

        <Space style={{ width: "100%", justifyContent: "center" }}>
          <Button
            type="dashed"
            onClick={handleAddRow}
            icon={<PlusOneOutlined />}
          >
            Add Room
          </Button>
        </Space>
      </Card> */}

      <Card style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
        <Title level={3} style={{ marginBottom: 24 }}>
          Hotels Optimizer
        </Title>

        <Tabs defaultActiveKey="1">
          <TabPane tab="Standard" key="1">
            {/* Standard tab content */}
            <FormStandar
              nights={nights}
              totalPassengers={totalPassengers}
              departureDate={infoTraveler.departureDate}
              returnDate={infoTraveler.returnDate}
              infoTraveler={infoTraveler}
              setInfoTraveler={setInfoTraveler}
            />
          </TabPane>

          <TabPane tab="Custom" key="2">
            <FormCustom
              nights={nights}
              totalPassengers={totalPassengers}
              departureDate={infoTraveler.departureDate}
              returnDate={infoTraveler.returnDate}
              infoTraveler={infoTraveler}
              setInfoTraveler={setInfoTraveler}
            />
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
}
