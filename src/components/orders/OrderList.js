import React from "react";
import { useOrder } from "../../contexts/OrderContext";
import { useService } from "../../contexts/ServiceContext";
import { usePackage } from "../../contexts/PackageContext";
import { Card, Table, Tag, Space, Button, Popconfirm, message } from "antd";
import {
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

export default function OrderList() {
  const { orders, updateOrderStatus, deleteOrder } = useOrder();
  const { services } = useService();
  const { packages } = usePackage();

  const getStatusTag = (status) => {
    const colors = {
      PENDING: "gold",
      CONFIRMED: "blue",
      COMPLETED: "green",
      CANCELLED: "red",
    };
    return <Tag color={colors[status]}>{status}</Tag>;
  };

  const getItemDetails = (order) => {
    if (order.type === "PACKAGE") {
      return (
        packages.find((pkg) => pkg.id === order.packageId)?.name ||
        "Unknown Package"
      );
    }
    return (
      services.find((service) => service.id === order.serviceId)?.name ||
      "Unknown Service"
    );
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    message.success(`Order status updated to ${newStatus}`);
  };

  const handleDelete = (orderId) => {
    deleteOrder(orderId);
    message.success("Order deleted successfully");
  };

  const columns = [
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Item",
      key: "item",
      render: (_, record) => getItemDetails(record),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => <Tag>{type}</Tag>,
    },
    {
      title: "Event Date",
      dataIndex: "eventDate",
      key: "eventDate",
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => `$${amount}`,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => getStatusTag(status),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          {record.status === "PENDING" && (
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={() => handleStatusUpdate(record.id, "CONFIRMED")}
            >
              Confirm
            </Button>
          )}
          {record.status === "CONFIRMED" && (
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={() => handleStatusUpdate(record.id, "COMPLETED")}
            >
              Complete
            </Button>
          )}
          <Popconfirm
            title="Are you sure to delete this order?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card title="Orders" className="orders-list">
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );
}
