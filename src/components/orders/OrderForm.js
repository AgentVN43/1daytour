// import React from 'react';
// import { useOrder } from '../../contexts/OrderContext';
// import { useService } from '../../contexts/ServiceContext';
// import { usePackage } from '../../contexts/PackageContext';
// import {
//   Card, Form, Input, Select, DatePicker, InputNumber,
//   Button, message
// } from 'antd';

// const { Option } = Select;

// export default function OrderForm() {
//   const { addOrder } = useOrder();
//   const { services } = useService();
//   const { packages } = usePackage();
//   const [form] = Form.useForm();

//   const calculateTotalAmount = (values) => {
//     if (values.type === 'PACKAGE') {
//       const selectedPackage = packages.find(pkg => pkg.id === values.packageId);
//       return selectedPackage ? selectedPackage.totalPrice * values.participants : 0;
//     } else {
//       const selectedService = services.find(service => service.id === values.serviceId);
//       return selectedService?.defaultPrice ? selectedService.defaultPrice * values.quantity : 0;
//     }
//   };

//   const onFinish = (values) => {
//     const totalAmount = calculateTotalAmount(values);
//     const formattedValues = {
//       ...values,
//       eventDate: values.eventDate.format('YYYY-MM-DD'),
//       totalAmount,
//     };

//     addOrder(formattedValues);
//     message.success('Order created successfully');
//     form.resetFields();
//   };

//   return (
//     <Card title="Create New Order" className="order-form">
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={onFinish}
//         initialValues={{
//           type: 'SERVICE',
//           quantity: 1,
//           participants: 1,
//         }}
//       >
//         <Form.Item
//           name="customerName"
//           label="Customer Name"
//           rules={[{ required: true, message: 'Please enter customer name' }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="customerEmail"
//           label="Customer Email"
//           rules={[
//             { required: true, message: 'Please enter customer email' },
//             { type: 'email', message: 'Please enter a valid email' }
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="type"
//           label="Order Type"
//           rules={[{ required: true }]}
//         >
//           <Select>
//             <Option value="SERVICE">Service</Option>
//             <Option value="PACKAGE">Package</Option>
//           </Select>
//         </Form.Item>

//         <Form.Item
//           noStyle
//           shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
//         >
//           {({ getFieldValue }) =>
//             getFieldValue('type') === 'SERVICE' ? (
//               <Form.Item
//                 name="serviceId"
//                 label="Select Service"
//                 rules={[{ required: true, message: 'Please select a service' }]}
//               >
//                 <Select>
//                   {services.map(service => (
//                     <Option key={service.id} value={service.id}>
//                       {service.name}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             ) : (
//               <Form.Item
//                 name="packageId"
//                 label="Select Package"
//                 rules={[{ required: true, message: 'Please select a package' }]}
//               >
//                 <Select>
//                   {packages.map(pkg => (
//                     <Option key={pkg.id} value={pkg.id}>
//                       {pkg.name}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             )
//           }
//         </Form.Item>

//         <Form.Item
//           noStyle
//           shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
//         >
//           {({ getFieldValue }) =>
//             getFieldValue('type') === 'SERVICE' ? (
//               <Form.Item
//                 name="quantity"
//                 label="Quantity"
//                 rules={[{ required: true }]}
//               >
//                 <InputNumber min={1} />
//               </Form.Item>
//             ) : (
//               <Form.Item
//                 name="participants"
//                 label="Number of Participants"
//                 rules={[{ required: true }]}
//               >
//                 <InputNumber min={1} />
//               </Form.Item>
//             )
//           }
//         </Form.Item>

//         <Form.Item
//           name="eventDate"
//           label="Event Date"
//           rules={[{ required: true, message: 'Please select event date' }]}
//         >
//           <DatePicker className="w-full" />
//         </Form.Item>

//         <Form.Item
//           name="notes"
//           label="Notes"
//         >
//           <Input.TextArea rows={4} />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" block>
//             Create Order
//           </Button>
//         </Form.Item>
//       </Form>
//     </Card>
//   );
// }

import React from "react";
import { useOrder } from "../../contexts/OrderContext";
import { useService } from "../../contexts/ServiceContext";
import { usePackage } from "../../contexts/PackageContext";
import {
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Button,
  message,
  Space,
  Table,
  Typography,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Title } = Typography;

export default function OrderForm() {
  const { addOrder } = useOrder();
  const { services } = useService();
  const { packages } = usePackage();
  const [form] = Form.useForm();
  const [cartItems, setCartItems] = React.useState([]);

  const calculateItemAmount = (item) => {
    if (item.type === "PACKAGE") {
      const selectedPackage = packages.find((pkg) => pkg.id === item.packageId);
      return selectedPackage
        ? selectedPackage.totalPrice * item.participants
        : 0;
    } else {
      const selectedService = services.find(
        (service) => service.id === item.serviceId
      );
      return selectedService ? selectedService.defaultPrice * item.quantity : 0;
    }
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + calculateItemAmount(item),
      0
    );
  };

  const addToCart = () => {
    form
      .validateFields([
        "type",
        "serviceId",
        "packageId",
        "quantity",
        "participants",
      ])
      .then((values) => {
        const newItem = {
          id: Date.now(),
          type: values.type,
          serviceId: values.serviceId,
          packageId: values.packageId,
          quantity: values.quantity || 1,
          participants: values.participants || 1,
          amount: calculateItemAmount(values),
        };

        setCartItems([...cartItems, newItem]);

        // Reset only the service/package selection fields
        form.setFieldsValue({
          type: "SERVICE",
          serviceId: undefined,
          packageId: undefined,
          quantity: 1,
          participants: 1,
        });
      });
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const cartColumns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Item",
      key: "item",
      render: (_, record) => {
        if (record.type === "SERVICE") {
          const service = services.find((s) => s.id === record.serviceId);
          return service?.name;
        } else {
          const pkg = packages.find((p) => p.id === record.packageId);
          return pkg?.name;
        }
      },
    },
    {
      title: "Quantity/Participants",
      key: "quantity",
      render: (_, record) =>
        record.type === "SERVICE" ? record.quantity : record.participants,
    },
    {
      title: "Amount",
      key: "amount",
      render: (_, record) => `$${calculateItemAmount(record).toFixed(2)}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => removeFromCart(record.id)}
        />
      ),
    },
  ];

  const onFinish = (values) => {
    if (cartItems.length === 0) {
      message.error("Please add at least one item to the cart");
      return;
    }

    const formattedValues = {
      ...values,
      eventDate: values.eventDate.format("YYYY-MM-DD"),
      items: cartItems,
      totalAmount: calculateTotalAmount(),
    };

    addOrder(formattedValues);
    message.success("Order created successfully");
    form.resetFields();
    setCartItems([]);
  };

  return (
    <Card title="Create New Order" className="order-form">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          type: "SERVICE",
          quantity: 1,
          participants: 1,
        }}
      >
        <Form.Item
          name="customerName"
          label="Customer Name"
          rules={[{ required: true, message: "Please enter customer name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="customerEmail"
          label="Customer Email"
          rules={[
            { required: true, message: "Please enter customer email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Card title="Add Items" className="mb-4">
          <Space direction="vertical" className="w-full">
            <Form.Item
              name="type"
              label="Order Type"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="SERVICE">Service</Option>
                <Option value="PACKAGE">Package</Option>
              </Select>
            </Form.Item>

            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.type !== currentValues.type
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("type") === "SERVICE" ? (
                  <Form.Item
                    name="serviceId"
                    label="Select Service"
                    rules={[
                      { required: true, message: "Please select a service" },
                    ]}
                  >
                    <Select>
                      {services.map((service) => (
                        <Option key={service.id} value={service.id}>
                          {service.name} - ${service.defaultPrice}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                ) : (
                  <Form.Item
                    name="packageId"
                    label="Select Package"
                    rules={[
                      { required: true, message: "Please select a package" },
                    ]}
                  >
                    <Select>
                      {packages.map((pkg) => (
                        <Option key={pkg.id} value={pkg.id}>
                          {pkg.name} - ${pkg.totalPrice}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                )
              }
            </Form.Item>

            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.type !== currentValues.type
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("type") === "SERVICE" ? (
                  <Form.Item
                    name="quantity"
                    label="Quantity"
                    rules={[{ required: true }]}
                  >
                    <InputNumber min={1} />
                  </Form.Item>
                ) : (
                  <Form.Item
                    name="participants"
                    label="Number of Participants"
                    rules={[{ required: true }]}
                  >
                    <InputNumber min={1} />
                  </Form.Item>
                )
              }
            </Form.Item>

            <Button
              type="dashed"
              onClick={addToCart}
              block
              icon={<PlusOutlined />}
            >
              Add to Cart
            </Button>
          </Space>
        </Card>

        <div className="mb-4">
          <Title level={5}>Order Items</Title>
          <Table
            columns={cartColumns}
            dataSource={cartItems}
            pagination={false}
            rowKey="id"
            summary={() => (
              <Table.Summary>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={3}>
                    <strong>Total Amount</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    <strong>${calculateTotalAmount().toFixed(2)}</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} />
                </Table.Summary.Row>
              </Table.Summary>
            )}
          />
        </div>

        <Form.Item
          name="eventDate"
          label="Event Date"
          rules={[{ required: true, message: "Please select event date" }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>

        <Form.Item name="notes" label="Notes">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Order
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
