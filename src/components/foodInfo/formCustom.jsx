// import { DeleteOutlined, PlusOneOutlined } from "@mui/icons-material";
// import { Button, Input, InputNumber, Select, Space, Table, Typography } from "antd";
// import { Option } from "antd/es/mentions";
// import React, { useEffect, useState } from "react";

// export default function FormCustom({
//   nights,
//   totalPassengers,
//   departureDate,
//   returnDate,
//   infoTraveler,
//   setInfoTraveler,
// }) {
//   const [roomType, setRoomType] = useState("2 people/room"); // Default to 2 people/room
//   const [roomCount, setRoomCount] = useState(0);
//   const [data, setData] = useState([]);

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const calculateRoomCount = (roomType) => {
//     let count;
//     switch (roomType) {
//       case "1 person/room":
//         count = totalPassengers;
//         break;
//       case "2 people/room":
//         count = Math.ceil(totalPassengers / 2);
//         break;
//       case "3 people/room":
//         count = Math.ceil(totalPassengers / 3);
//         break;
//       default:
//         count = 0;
//     }
//     setRoomCount(count);
//     return count;
//   };

//   const handleInputChange = (value, key, column) => {
//     setData((prevData) =>
//       prevData.map((row) => {
//         if (row.key === key) {
//           const updatedRow = { ...row, [column]: value };

//           // Update Room Count if Room Type changes
//           if (column === "roomType") {
//             updatedRow.roomCount = calculateRoomCount(value);
//           }

//           return updatedRow;
//         }
//         return row;
//       })
//     );
//   };

//   const handleAddRow = () => {
//     const newRow = {
//       key: Date.now().toString(), // Unique key
//       checkin: infoTraveler.departureDate,
//       checkout: infoTraveler.returnDate,
//       nights: nights,
//       roomType: "2 people/room",
//       roomCount: calculateRoomCount("2 people/room"),
//     };
//     setData((prevData) => [...prevData, newRow]);
//   };

//   const handleDeleteRow = (key) => {
//     setData((prevData) => prevData.filter((row) => row.key !== key));
//   };

//   const columns = [
//     {
//       title: "Check-in Date",
//       dataIndex: "checkin",
//       key: "checkin",
//       render: (text, record) => (
//         <Input
//           value={record.checkin}
//           onChange={(e) =>
//             handleInputChange(e.target.value, record.key, "checkin")
//           }
//         />
//       ),
//     },
//     {
//       title: "Check-out Date",
//       dataIndex: "checkout",
//       key: "checkout",
//       render: (text, record) => (
//         <Input
//           value={record.checkout}
//           onChange={(e) =>
//             handleInputChange(e.target.value, record.key, "checkout")
//           }
//         />
//       ),
//     },
//     {
//       title: "Nights",
//       dataIndex: "nights",
//       key: "nights",
//       render: (text, record) => (
//         <InputNumber
//           min={1}
//           value={record.nights}
//           onChange={(value) => handleInputChange(value, record.key, "nights")}
//         />
//       ),
//     },
//     {
//       title: "Room Type",
//       dataIndex: "roomType",
//       key: "roomType",
//       render: (text, record) => (
//         <Select
//           value={record.roomType}
//           onChange={(value) => handleInputChange(value, record.key, "roomType")}
//         >
//           <Option value="1 person/room">1 person/room</Option>
//           <Option value="2 people/room">2 people/room</Option>
//           <Option value="3 people/room">3 people/room</Option>
//         </Select>
//       ),
//     },
//     {
//       title: "Room Count",
//       dataIndex: "roomCount",
//       key: "roomCount",
//       render: (text, record) => (
//         <InputNumber
//           min={1}
//           value={record.roomCount}
//           onChange={(value) =>
//             handleInputChange(value, record.key, "roomCount")
//           }
//         />
//       ),
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <Button
//           type="danger"
//           icon={<DeleteOutlined />}
//           onClick={() => handleDeleteRow(record.key)}
//         />
//       ),
//     },
//   ];

//   useEffect(() => {
//     calculateRoomCount();
//   }, [calculateRoomCount, nights, roomType]);

//   return (
//     <>
//       <Table
//         dataSource={data}
//         columns={columns}
//         pagination={false}
//         rowKey="key"
//         style={{ marginBottom: 16 }}
//       />
//       <Space style={{ width: "100%", justifyContent: "center" }}>
//         <Button type="dashed" onClick={handleAddRow} icon={<PlusOneOutlined />}>
//           Add Room
//         </Button>
//       </Space>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Card,
  InputNumber,
  Button,
  Table,
  Alert,
  Typography,
  Select,
  Form,
} from "antd";
const { Title, Text } = Typography;
const { Option } = Select;

const FormCustom = () => {
  const [form] = Form.useForm();
  const [result, setResult] = useState(null);

  const ROOM_TYPES = [
    { id: 1, name: "Single Room", capacity: 1 },
    { id: 2, name: "Double Room", capacity: 2 },
    { id: 3, name: "Triple Room", capacity: 3 },
  ];

  const findOptimalRooms = (values) => {
    const { totalGuests, selectedRoomType, selectedRoomCount } = values;

    if (!totalGuests || !selectedRoomType || !selectedRoomCount) {
      return { error: "Please fill in all fields" };
    }

    // Find the selected room type
    const primaryRoom = ROOM_TYPES.find((room) => room.id === selectedRoomType);

    // Calculate remaining guests after primary room allocation
    const guestsInPrimaryRooms = primaryRoom.capacity * selectedRoomCount;

    if (guestsInPrimaryRooms > totalGuests) {
      return { error: "Selected rooms exceed total guests" };
    }

    const remainingGuests = totalGuests - guestsInPrimaryRooms;

    // If no remaining guests, return only primary room allocation
    if (remainingGuests === 0) {
      return {
        totalGuests,
        distribution: [
          {
            ...primaryRoom,
            count: selectedRoomCount,
            totalCapacity: guestsInPrimaryRooms,
          },
        ],
        totalRooms: selectedRoomCount,
        totalCapacity: guestsInPrimaryRooms,
      };
    }

    // Get remaining room types for optimization
    const remainingRoomTypes = ROOM_TYPES.filter(
      (room) => room.id !== selectedRoomType
    ).sort((a, b) => b.capacity - a.capacity); // Sort by capacity descending

    let distribution = [
      {
        ...primaryRoom,
        count: selectedRoomCount,
        totalCapacity: guestsInPrimaryRooms,
      },
    ];

    let guests = remainingGuests;

    // Optimize remaining guests allocation
    for (const roomType of remainingRoomTypes) {
      const roomCount = Math.floor(guests / roomType.capacity);
      if (roomCount > 0) {
        const allocatedGuests = roomCount * roomType.capacity;
        distribution.push({
          ...roomType,
          count: roomCount,
          totalCapacity: allocatedGuests,
        });
        guests -= allocatedGuests;
      }
    }

    // Handle any remaining guests with smallest room type
    if (guests > 0) {
      const smallestRoom = remainingRoomTypes[remainingRoomTypes.length - 1];
      const extraRooms = Math.ceil(guests / smallestRoom.capacity);
      const existingRoom = distribution.find(
        (room) => room.id === smallestRoom.id
      );

      if (existingRoom) {
        existingRoom.count += extraRooms;
        existingRoom.totalCapacity += guests;
      } else {
        distribution.push({
          ...smallestRoom,
          count: extraRooms,
          totalCapacity: guests,
        });
      }
    }

    // Calculate totals
    const totalRooms = distribution.reduce((sum, room) => sum + room.count, 0);
    const totalCapacity = distribution.reduce(
      (sum, room) => sum + room.totalCapacity,
      0
    );

    return {
      totalGuests,
      distribution,
      totalRooms,
      totalCapacity,
    };
  };

  const handleCalculate = (values) => {
    const result = findOptimalRooms(values);
    setResult(result);
  };

  const handleConfirm = () => {
    if (result && !result.error) {
      console.log("Hotel Room Distribution:", {
        totalGuests: result.totalGuests,
        totalRooms: result.totalRooms,
        totalCapacity: result.totalCapacity,
        utilization:
          ((result.totalGuests / result.totalCapacity) * 100).toFixed(1) + "%",
        distribution: result.distribution,
      });
    }
  };

  const columns = [
    {
      title: "Room Type",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      render: (value) => `${value} person${value > 1 ? "s" : ""}/room`,
    },
    {
      title: "Number of Rooms",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Total Capacity",
      dataIndex: "totalCapacity",
      key: "totalCapacity",
      render: (value) => `${value} guests`,
    },
  ];

  return (
    <Card style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
      <Title level={3} style={{ marginBottom: 24 }}>
        Hotel Room Optimizer
      </Title>

      <Form form={form} onFinish={handleCalculate} layout="vertical">
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          <Form.Item
            name="totalGuests"
            label="Total Guests"
            style={{ flex: 1 }}
            rules={[{ required: true, message: "Please enter total guests" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={1}
              placeholder="Enter total guests"
            />
          </Form.Item>

          <Form.Item
            name="selectedRoomType"
            label="Primary Room Type"
            style={{ flex: 1 }}
            rules={[{ required: true, message: "Please select room type" }]}
          >
            <Select placeholder="Select room type">
              {ROOM_TYPES.map((room) => (
                <Option key={room.id} value={room.id}>
                  {room.name} ({room.capacity} person
                  {room.capacity > 1 ? "s" : ""})
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="selectedRoomCount"
            label="Number of Rooms"
            style={{ flex: 1 }}
            rules={[
              { required: true, message: "Please enter number of rooms" },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={1}
              placeholder="Enter number of rooms"
            />
          </Form.Item>
        </div>

        <Form.Item>
          <div style={{ display: "flex", gap: 16 }}>
            <Button type="primary" htmlType="submit" size="large">
              Calculate
            </Button>
            {result && !result.error && (
              <Button type="default" size="large" onClick={handleConfirm}>
                Confirm
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>

      {result && !result.error && (
        <div style={{ marginTop: 24 }}>
          <Card size="small" style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <Text strong>Total Guests: {result.totalGuests}</Text>
              <Text strong>Total Rooms: {result.totalRooms}</Text>
              <Text strong>Total Capacity: {result.totalCapacity}</Text>
              <Text strong>
                Utilization:{" "}
                {((result.totalGuests / result.totalCapacity) * 100).toFixed(1)}
                %
              </Text>
            </div>
          </Card>

          <Table
            dataSource={result.distribution}
            columns={columns}
            pagination={false}
            rowKey="id"
          />
        </div>
      )}

      {result?.error && (
        <Alert
          message="Error"
          description={result.error}
          type="error"
          showIcon
        />
      )}
    </Card>
  );
};

export default FormCustom;
