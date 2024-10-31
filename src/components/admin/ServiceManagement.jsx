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
} from "antd";
import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";

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

export default function ServiceManagement() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [complexity, setComplexity] = useState(50);

  // Calculate total price based on selected services and complexity
  const calculateTotalPrice = () => {
    const baseTotal = selectedServices.reduce((total, serviceId) => {
      const service = SERVICES.find((s) => s.id === serviceId);
      return total + (service ? service.basePrice : 0);
    }, 0);

    // Apply complexity multiplier (0.7 to 1.3)
    const complexityMultiplier = 0.7 + (complexity / 100) * 0.6;
    return Math.round(baseTotal * complexityMultiplier);
  };

  // Handle service selection
  const handleServiceToggle = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <>
      <Card
        className="w-full max-w-4xl mx-auto my-8 p-6"
        title={
          <Title level={3} className="text-center">
            <CheckCircleOutlined className="mr-2 text-blue-600" />
            Service Bundle Configurator
          </Title>
        }
      >
        <Row gutter={[16, 16]}>
          {/* Service Selection */}
          <Col xs={24} md={14}>
            <Card type="inner" title="Select Services">
              {SERVICES.map((service) => (
                <div
                  key={service.id}
                  className="mb-4 p-3 border rounded hover:bg-gray-50 transition"
                >
                  <Checkbox
                    checked={selectedServices.includes(service.id)}
                    onChange={() => handleServiceToggle(service.id)}
                  >
                    <div>
                      <Text strong>{service.name}</Text>
                      <div className="text-gray-500 text-sm">
                        {service.description}
                      </div>
                      <div className="text-blue-600 font-semibold">
                        Base Price: ${service.basePrice}
                      </div>
                    </div>
                  </Checkbox>
                </div>
              ))}
            </Card>
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

              {selectedServices.length > 0 ? (
                <div>
                  <Alert
                    message="Price Breakdown"
                    description={
                      <>
                        {selectedServices.map((serviceId) => {
                          const service = SERVICES.find(
                            (s) => s.id === serviceId
                          );
                          return (
                            <div
                              key={serviceId}
                              className="flex justify-between"
                            >
                              <Text>{service.name}</Text>
                              <Text strong>${service.basePrice}</Text>
                            </div>
                          );
                        })}
                        <div className="flex justify-between mt-2 border-t pt-2">
                          <Text strong>Total Price</Text>
                          <Text strong className="text-green-600">
                            ${calculateTotalPrice()}
                          </Text>
                        </div>
                      </>
                    }
                    type="info"
                    icon={<InfoCircleOutlined />}
                  />
                </div>
              ) : (
                <Alert
                  message="Select services to see pricing"
                  type="warning"
                />
              )}

              <Button
                type="primary"
                block
                className="mt-4"
                disabled={selectedServices.length === 0}
              >
                Generate Proposal
              </Button>
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
}
