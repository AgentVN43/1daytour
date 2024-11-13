import React, { useState } from 'react';
import { Table, Button, Space, Tag, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useService } from '../../contexts/ServiceContext';
import ServiceForm from './ServiceForm';

function ServiceList() {
  const { services, loading, deleteService } = useService();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this service?',
      content: 'This action cannot be undone.',
      onOk: () => deleteService(id),
    });
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingService(null);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <Tag color="blue">{category}</Tag>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'serviceType',
      key: 'serviceType',
      render: (type) => (
        <Tag color={type === 'FIXED' ? 'green' : 'orange'}>{type}</Tag>
      ),
    },
    {
      title: 'Default Price',
      dataIndex: 'defaultPrice',
      key: 'defaultPrice',
      render: (price) => price ? `$${price.toFixed(2)}` : 'Variable',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Add New Service
        </Button>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={services}
        loading={loading}
        rowKey="id"
      />

      <ServiceForm
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        service={editingService}
      />
    </div>
  );
}

export default ServiceList;