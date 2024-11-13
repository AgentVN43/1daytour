import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Checkbox,
  Typography,
  Slider,
  Button,
  Alert,
  Radio,
  Tag,
  Divider,
  Form,
  message,
  Input,
  Modal,
} from "antd";
import {
  CheckCircleOutlined,
  CrownOutlined,
  EditOutlined,
  GiftOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const { Title, Text } = Typography;

const SERVICES = [
  {
    id: "frontend",
    name: "Frontend Development (ReactJS)",
    basePrice: 1500,
    description: "Modern, responsive web application development using React",
  },
  {
    id: "uxui",
    name: "UX/UI Design (Ant Design)",
    basePrice: 1000,
    description: "Professional user interface and experience design",
  },
  {
    id: "backend",
    name: "Backend Development (Node.js)",
    basePrice: 2000,
    description: "Robust server-side logic and API development",
  },
  {
    id: "devops",
    name: "DevOps & Deployment",
    basePrice: 800,
    description: "Cloud deployment, CI/CD, and infrastructure setup",
  },
];

// Predefined packages
const DEFAULT_PACKAGES = [
  {
    id: "web-basic",
    name: "Web Basic",
    description: "Essential web development package",
    services: ["frontend", "backend"],
    discount: 0.1,
    tag: "Popular",
    isDefault: true,
  },
  {
    id: "web-pro",
    name: "Web Pro",
    description: "Professional web solution with enhanced UI/UX",
    services: ["frontend", "uxui", "backend"],
    discount: 0.15,
    tag: "Best Value",
    isDefault: true,
  },
  {
    id: "web-premium",
    name: "Web Premium",
    description: "Complete web solution with deployment and maintenance",
    services: ["frontend", "uxui", "backend", "devops"],
    discount: 0.2,
    tag: "Most Complete",
    isDefault: true,
  },
];

export default function ServiceManagement() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [complexity, setComplexity] = useState(50);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectionType, setSelectionType] = useState("individual");

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [customPackages, setCustomPackages] = useState([]);
  const [form] = Form.useForm();

  // Combine default and custom packages
  const allPackages = [...DEFAULT_PACKAGES, ...customPackages];

  const calculateBasePrice = (serviceIds) => {
    return serviceIds.reduce((total, serviceId) => {
      const service = SERVICES.find((s) => s.id === serviceId);
      return total + (service ? service.basePrice : 0);
    }, 0);
  };

  // Calculate final price based on services, complexity, and package discount
  const calculateFinalPrice = () => {
    const serviceIds =
      selectionType === "package" && selectedPackage
        ? allPackages.find((p) => p.id === selectedPackage).services
        : selectedServices;

    let baseTotal = calculateBasePrice(serviceIds);

    if (selectionType === "package" && selectedPackage) {
      const packageServices = allPackages.find((p) => p.id === selectedPackage);
      baseTotal *= 1 - packageServices.discount;
    }

    const complexityMultiplier = 0.7 + (complexity / 100) * 0.6;
    return Math.round(baseTotal * complexityMultiplier);
  };

  // Create new custom package
  const handleCreatePackage = (values) => {
    if (selectedServices.length === 0) {
      message.error("Please select at least one service for the package");
      return;
    }

    const newPackage = {
      id: `custom-${Date.now()}`,
      name: values.name,
      description: values.description,
      services: [...selectedServices],
      discount: values.discount / 100,
      tag: "Custom",
      isDefault: false,
    };

    setCustomPackages((prev) => [...prev, newPackage]);
    setIsCreateModalVisible(false);
    message.success("Custom package created successfully!");
    form.resetFields();
  };

  // Delete custom package
  const handleDeletePackage = (packageId) => {
    setCustomPackages((prev) => prev.filter((p) => p.id !== packageId));
    if (selectedPackage === packageId) {
      setSelectedPackage(null);
    }
    message.success("Package deleted successfully");
  };

  return (
    <>
      <Card
        className="w-full max-w-4xl mx-auto my-8"
        title={
          <Title level={3} className="text-center mb-0">
            <CrownOutlined className="mr-2 text-blue-600" />
            Service Configuration
          </Title>
        }
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Radio.Group
              value={selectionType}
              onChange={(e) => {
                setSelectionType(e.target.value);
                setSelectedServices([]);
                setSelectedPackage(null);
              }}
              className="w-full mb-4"
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Card
                    hoverable
                    className={
                      selectionType === "individual" ? "border-blue-500" : ""
                    }
                  >
                    <Radio value="individual">
                      <Title level={4}>Individual Services</Title>
                      <Text>Choose specific services you need</Text>
                    </Radio>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card
                    hoverable
                    className={
                      selectionType === "package" ? "border-blue-500" : ""
                    }
                  >
                    <Radio value="package">
                      <Title level={4}>Packages</Title>
                      <Text>Choose from predefined or custom packages</Text>
                    </Radio>
                  </Card>
                </Col>
              </Row>
            </Radio.Group>
          </Col>

          {/* Service/Package Selection */}
          <Col xs={24} md={14}>
            {selectionType === "individual" ? (
              <Card
                type="inner"
                title="Select Individual Services"
                extra={
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsCreateModalVisible(true)}
                    disabled={selectedServices.length === 0}
                  >
                    Create Package
                  </Button>
                }
              >
                {SERVICES.map((service) => (
                  <div
                    key={service.id}
                    className="mb-4 p-3 border rounded hover:bg-gray-50 transition"
                    onClick={() => {
                      setSelectedServices((prev) =>
                        prev.includes(service.id)
                          ? prev.filter((id) => id !== service.id)
                          : [...prev, service.id]
                      );
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <Radio checked={selectedServices.includes(service.id)}>
                      <div>
                        <Text strong>{service.name}</Text>
                        <div className="text-gray-500 text-sm">
                          {service.description}
                        </div>
                        <div className="text-blue-600 font-semibold">
                          ${service.basePrice}
                        </div>
                      </div>
                    </Radio>
                  </div>
                ))}
              </Card>
            ) : (
              <Card type="inner" title="Select Package">
                {allPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`mb-4 p-4 border rounded hover:bg-gray-50 transition ${
                      selectedPackage === pkg.id ? "border-blue-500" : ""
                    }`}
                    onClick={() => setSelectedPackage(pkg.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <Title level={4} className="mb-0">
                        {pkg.name}
                      </Title>
                      <div>
                        <Tag color={pkg.isDefault ? "blue" : "green"}>
                          {pkg.tag}
                        </Tag>
                        {!pkg.isDefault && (
                          <Button
                            type="text"
                            danger
                            icon={<EditOutlined />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePackage(pkg.id);
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <Text className="block mb-2">{pkg.description}</Text>
                    <div className="text-gray-600">
                      <GiftOutlined className="mr-2" />
                      Includes:
                    </div>
                    <ul className="list-disc ml-8 mb-2">
                      {pkg.services.map((serviceId) => (
                        <li key={serviceId}>
                          {SERVICES.find((s) => s.id === serviceId).name}
                        </li>
                      ))}
                    </ul>
                    <div className="text-green-600 font-semibold">
                      {pkg.discount * 100}% package discount
                    </div>
                  </div>
                ))}
              </Card>
            )}
          </Col>

          {/* Pricing Details */}
          <Col xs={24} md={10}>
            <Card type="inner" title="Project Configuration">
              <div className="mb-4">
                <Text>Project Complexity</Text>
                <Slider
                  value={complexity}
                  onChange={setComplexity}
                  tooltipVisible
                  tipFormatter={(val) => `${val}%`}
                />
              </div>

              {selectedServices.length > 0 || selectedPackage ? (
                <Alert
                  message="Price Breakdown"
                  description={
                    <>
                      {(selectionType === "package" && selectedPackage
                        ? allPackages.find((p) => p.id === selectedPackage)
                            .services
                        : selectedServices
                      ).map((serviceId) => {
                        const service = SERVICES.find(
                          (s) => s.id === serviceId
                        );
                        return (
                          <div key={serviceId} className="flex justify-between">
                            <Text>{service.name}</Text>
                            <Text strong>${service.basePrice}</Text>
                          </div>
                        );
                      })}

                      {selectionType === "package" && selectedPackage && (
                        <div className="text-green-600 mt-2">
                          Package Discount:{" "}
                          {allPackages.find((p) => p.id === selectedPackage)
                            .discount * 100}
                          %
                        </div>
                      )}

                      <Divider />

                      <div className="flex justify-between mt-2">
                        <Text strong>Final Price</Text>
                        <Text strong className="text-green-600">
                          ${calculateFinalPrice()}
                        </Text>
                      </div>
                    </>
                  }
                  type="info"
                  icon={<InfoCircleOutlined />}
                />
              ) : (
                <Alert
                  message="Select services or a package to see pricing"
                  type="warning"
                />
              )}

              <Button
                type="primary"
                block
                className="mt-4"
                disabled={!(selectedServices.length > 0 || selectedPackage)}
              >
                Generate Proposal
              </Button>
            </Card>
          </Col>
        </Row>

        {/* Create Package Modal */}
        <Modal
          title="Create Custom Package"
          visible={isCreateModalVisible}
          onCancel={() => {
            setIsCreateModalVisible(false);
            form.resetFields();
          }}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreatePackage}
            initialValues={{ discount: 10 }}
          >
            <Form.Item
              name="name"
              label="Package Name"
              rules={[{ required: true, message: "Please enter package name" }]}
            >
              <Input placeholder="Enter package name" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Package Description"
              rules={[
                { required: true, message: "Please enter package description" },
              ]}
            >
              <TextArea rows={3} placeholder="Enter package description" />
            </Form.Item>

            <Form.Item
              name="discount"
              label="Package Discount (%)"
              rules={[
                { required: true, message: "Please enter discount percentage" },
                { type: "number", min: 0, max: 100 },
              ]}
            >
              <Slider tooltipVisible />
            </Form.Item>

            <Form.Item className="mb-0">
              <div className="flex justify-end space-x-2">
                <Button
                  onClick={() => {
                    setIsCreateModalVisible(false);
                    form.resetFields();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  htmlType="submit"
                >
                  Create Package
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </>
  );
}
