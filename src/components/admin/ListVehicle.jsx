import React, { useEffect, useState } from "react";
import { vehicleService } from "../../services/vehicleService";
import { vehicleTypeService } from "../../services/vehicleTypeService";
import { Table, Button, Modal, Input, Form, Select } from "antd";

export default function ListVehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);

  const [form] = Form.useForm();

  // Fetch vehicles and vehicle types on mount
  useEffect(() => {
    const getAllVehicles = async () => {
      try {
        const res = await vehicleService.getAll();
        if (res && res.data) {
          setVehicles(res.data);
        }
      } catch (error) {
        console.error("Error retrieving vehicles:", error);
        alert("Failed to retrieve vehicles");
      }
    };

    const getVehicleTypes = async () => {
      try {
        const res = await vehicleTypeService.getAll();
        if (res && res.data) {
          setVehicleTypes(res.data);
        }
      } catch (error) {
        console.error("Error retrieving vehicle types:", error);
        alert("Failed to retrieve vehicle types");
      }
    };

    getAllVehicles();
    getVehicleTypes();
  }, []);

  console.log(vehicleTypes);

  // Open Add Vehicle Modal
  const handleAdd = () => {
    setIsEditMode(false);
    form.resetFields();
    setIsModalVisible(true);
  };

  // Open Edit Vehicle Modal
  const handleEdit = (vehicle) => {
    setIsEditMode(true);
    setCurrentVehicle(vehicle);
    form.setFieldsValue(vehicle);
    setIsModalVisible(true);
  };

  // Delete vehicle
  const handleDelete = async (vehicleId) => {
    try {
      console.log(vehicleId);
      await vehicleService.delete(vehicleId);
      setVehicles((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle._id !== vehicleId)
      );
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      alert("Failed to delete vehicle");
    }
  };

  // Handle form submission for Add/Edit
  const handleFormSubmit = async () => {
    try {
      const values = form.getFieldsValue();
      console.log(values);

      if (isEditMode && currentVehicle) {
        const res = await vehicleService.update(currentVehicle._id, values);
        setVehicles((prevVehicles) =>
          prevVehicles.map((vehicle) =>
            vehicle._id === currentVehicle._id ? res.data : vehicle
          )
        );
      } else {
        const res = await vehicleService.create(values);
        setVehicles((prevVehicles) => [...prevVehicles, res.data]);
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error saving vehicle:", error);
      alert("Failed to save vehicle");
    }
  };

  const columns = [
    {
      title: "Vehicle Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Vehicle Type",
      dataIndex: "type",
      key: "type",
      render: (type) => type?.type || "Unknown",
    },
    {
      title: "Seating Capacity",
      dataIndex: "seat",
      key: "seat",
      render: (seat) => (seat ? seat : "Not specified"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Vehicle
      </Button>
      <Table dataSource={vehicles} columns={columns} rowKey="_id" />

      {/* Modal for Add/Edit Vehicle */}
      <Modal
        title={isEditMode ? "Edit Vehicle" : "Add Vehicle"}
        visible={isModalVisible}
        onOk={handleFormSubmit}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Vehicle Name"
            rules={[{ required: true, message: "Please enter vehicle name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Vehicle Type"
            rules={[{ required: true, message: "Please select vehicle type" }]}
          >
            <Select placeholder="Select vehicle type">
              {vehicleTypes.map((type) => (
                <Select.Option key={type._id} value={type._id}>
                  {type.type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="seat"
            label="Seating Capacity"
            rules={[
              { required: true, message: "Please enter seating capacity" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
