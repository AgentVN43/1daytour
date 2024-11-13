import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, Switch } from 'antd';
import { useService } from '../../contexts/ServiceContext';

const { Option } = Select;

function ServiceForm({ visible, onCancel, service }) {
  const [form] = Form.useForm();
  const { addService, updateService } = useService();

  useEffect(() => {
    if (visible && service) {
      form.setFieldsValue(service);
    } else {
      form.resetFields();
    }
  }, [visible, service, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (service) {
        updateService(service.id, values);
      } else {
        addService(values);
      }
      onCancel();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={service ? 'Edit Service' : 'Add New Service'}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          isActive: true,
          isPackageEligible: true,
        }}
      >
        <Form.Item
          name="name"
          label="Service Name"
          rules={[{ required: true, message: 'Please input service name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please select category!' }]}
        >
          <Select>
            <Option value="TRANSPORT">Transport</Option>
            <Option value="ACCOMMODATION">Accommodation</Option>
            <Option value="STANDARD">Standard</Option>
            <Option value="TEAMBUILDING">Team Building</Option>
            <Option value="GALA">Gala Dinner</Option>
            <Option value="CAMPFIRE">Campfire</Option>
            <Option value="MEDIA">Media</Option>
            <Option value="OTHER">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="serviceType"
          label="Service Type"
          rules={[{ required: true, message: 'Please select service type!' }]}
        >
          <Select>
            <Option value="FIXED">Fixed Price</Option>
            <Option value="VARIABLE">Variable Price</Option>
          </Select>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => 
            prevValues.serviceType !== currentValues.serviceType
          }
        >
          {({ getFieldValue }) => 
            getFieldValue('serviceType') === 'FIXED' ? (
              <Form.Item
                name="defaultPrice"
                label="Default Price"
                rules={[{ required: true, message: 'Please input price!' }]}
              >
                <InputNumber
                  min={0}
                  prefix="$"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            ) : null
          }
        </Form.Item>

        <Form.Item
          name="isPackageEligible"
          label="Package Eligible"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

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

export default ServiceForm;