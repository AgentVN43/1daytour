import {
    Table,
    Typography
} from "antd";
import React, { useEffect, useState } from "react";

export default function FormStandar({
  nights,
  totalPassengers,
  departureDate,
  returnDate,
  infoTraveler,
  setInfoTraveler,
}) {
  const [roomType, setRoomType] = useState("2 people/room"); // Default to 2 people/room
  const [roomCount, setRoomCount] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculateRoomCount = () => {
    const count = Math.ceil(totalPassengers / 2);
    setRoomCount(count);
    return count;
  };

  const columnst = [
    {
      title: "Check-in Date",
      dataIndex: "checkin",
      key: "checkin",
      render: (text) => <Typography.Text>{departureDate}</Typography.Text>,
    },
    {
      title: "Check-out Date",
      dataIndex: "checkout",
      key: "checkout",
      render: (text) => <Typography.Text>{returnDate}</Typography.Text>,
    },
    {
      title: "Nights",
      dataIndex: "nights",
      key: "nights",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Room Type",
      dataIndex: "roomType",
      key: "roomType",
      render: (text) => <Typography.Text>{"2 people/room"}</Typography.Text>,
    },
    {
      title: "Room Count",
      dataIndex: "roomCount",
      key: "roomCount",
      render: (text) => <Typography.Text>{roomCount}</Typography.Text>,
    },
  ];

  const datast = [
    {
      key: "1",
      nights: nights,
      roomType: roomType,
      roomCount: roomCount,
    },
  ];

  useEffect(() => {
    calculateRoomCount();
  }, [calculateRoomCount, nights, roomType]);

  return (
    <>
      <Table
        dataSource={datast}
        columns={columnst}
        pagination={false}
        rowKey="key"
        style={{ marginBottom: 16 }}
      />
    </>
  );
}
