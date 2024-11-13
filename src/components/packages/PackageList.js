import React, { useState } from 'react';
import { Table, Button, Space, Tag, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { usePackage } from '../../contexts/PackageContext';
import PackageForm from './PackageForm';

function PackageList() {
  const { packages, loading, deletePackage } = usePackage();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this package?',
      content: 'This action cannot be undone.',
      onOk: () => deletePackage(id),
    });
  };

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingPackage(null);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Services Count',
      dataIndex: 'services',
      key: 'servicesCount',
      render: (services) => services.length,
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
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
          Add New Package
        </Button>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={packages}
        loading={loading}
        rowKey="id"
      />

      <PackageForm
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        package={editingPackage}
      />
    </div>
  );
}

export default PackageList;