import React from "react";
import { Steps } from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";

export default function OrderSteps({ status }) {
  const getStepStatus = (stepValue) => {
    const statusMap = {
      PENDING: 0,
      CONFIRMED: 1,
      COMPLETED: 2,
      CANCELLED: -1,
    };

    const currentStep = statusMap[status];
    return currentStep;
  };

  const items = [
    {
      title: "Pending",
      icon: <ClockCircleOutlined />,
    },
    {
      title: "Confirmed",
      icon: <CheckCircleOutlined />,
    },
    {
      title: "Completed",
      icon: <FileDoneOutlined />,
    },
  ];

  return (
    <Steps
      current={getStepStatus(status)}
      items={items}
      className="order-steps"
      status={status === "CANCELLED" ? "error" : "process"}
    />
  );
}
