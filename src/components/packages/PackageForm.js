import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, InputNumber, Switch, Button, Space, Table } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { usePackage } from '../../contexts/PackageContext';
import { useService } from '../../contexts/ServiceContext';

const { Option } = Select;

function PackageForm({ visible, onCancel, package: editingPackage }) {
  const [form] = Form.useForm();
  const { addPackage, updatePackage } = usePackage();
  const { services } = useService();
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    if (visible && editingPackage) {
      form.setFieldsValue(editingPackage);
      setSelectedServices(editingPackage.services);
    } else {
      form.resetFields();
      setSelectedServices([]);
    }
  }, [visible, editingPackage, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const totalPrice = selectedServices.reduce((sum, service) => {
        return sum + (service.defaultPrice * service.defaultQuantity);
      }, 0);

      const packageData = {
        ...values,
        services: selectedServices,
        totalPrice
      };

      if (editingPackage) {
        updatePackage(editingPackage.id, packageData);
      } else {
        addPackage(packageData);
      }
      onCancel();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleServiceAdd = () => {
    setSelectedServices([
      ...selectedServices,
      {
        serviceId: '',
        defaultQuantity: 1,
        defaultPrice: 0
      }
    ]);
  };

  const handleServiceRemove = (index) => {
    const newServices = [...selectedServices];
    newServices.splice(index, 1);
    setSelectedServices(newServices);
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...selectedServices];
    newServices[index] = {
      ...newServices[index],
      [field]: value
    };
    setSelectedServices(newServices);
  };

  const servicesColumns = [
    {
      title: 'Service',
      dataIndex: 'serviceId',
      key: 'serviceId',
      render: (serviceId, _, index) => (
        <Select
          style={{ width: '100%' }}
          value={serviceId}
          onChange={(value) => handleServiceChange(index, 'serviceId', value)}
        >
          {services.filter(s => s.isPackageEligible).map(service => (
            <Option key={service.id} value={service.id}>
              {service.name}
            </Option>
          ))}
        </Select>
      )
    },
    {
      title: 'Quantity',
      dataIndex: 'defaultQuantity',
      key: 'defaultQuantity',
      render: (quantity, _, index) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => handleServiceChange(index, 'defaultQuantity', value)}
        />
      )
    },
    {
      title: 'Price',
      dataIndex: 'defaultPrice',
      key: 'defaultPrice',
      render: (price, _, index) => (
        <InputNumber
          prefix="$"
          value={price}
          onChange={(value) => handleServiceChange(index, 'defaultPrice', value)}
        />
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, __, index) => (
        <Button
          type="text"
          danger
          icon={<MinusCircleOutlined />}
          onClick={() => handleServiceRemove(index)}
        />
      )
    }
  ];

  return (
    <Modal
      title={editingPackage ? 'Edit Package' : 'Add New Package'}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          isActive: true,
        }}
      >
        <Form.Item
          name="name"
          label="Package Name"
          rules={[{ required: true, message: 'Please input package name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea />
        </Form.Item>

        <div style={{ marginBottom: 16 }}>
          <Button 
            type="dashed" 
            onClick={handleServiceAdd} 
            icon={<PlusOutlined />}
          >
            Add Service
          </Button>
        </div>

        <Table
          dataSource={selectedServices}
          columns={servicesColumns}
          pagination={false}
          rowKey={(record, index) => index}
        />

        <Form.Item
          name="isActive"
          label="Active"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default PackageForm;