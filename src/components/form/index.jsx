"use client"; // Make sure this is a client component

import React from 'react';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
const { Option } = Select;

const TransactionForm = ({ provinces }) => {
    const { RangePicker } = DatePicker;
    const onFinish = (values) => {
        message.success('Cập nhật giao dịch thành công!');
        console.log('Received values:', values);
    };

    const onFinishFailed = (errorInfo) => {
        message.error('Cập nhật giao dịch thất bại: ' + errorInfo.errorFields.map((field) => field.errors[0]).join(', '));
    };

    return (
        <div className="max-w-xl mx-auto p-5 bg-white shadow-md rounded-lg mt-5">
            <h2 className="text-3xl font-bold mb-6 text-start">Nhập thông tin tour</h2>
            <Form
                name="transactionForm"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
            >
                <Form.Item
                    label="Tên khách hàng"
                    name="customerName"
                    rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                >
                    <Input placeholder='Nhập tên khách hàng' type="text" className="w-full" />
                </Form.Item>
                <div className='grid grid-cols-2 gap-5'>
                    <Form.Item
                        label="Khởi hành"
                        name="departure"
                        rules={[{ required: true, message: 'Vui lòng chọn điểm khởi hành!' }]}
                    >
                        <Select placeholder="Chọn điểm khởi hành" className="w-full">
                            {provinces.map((item) => (
                                <Option key={item.code} value={item.code}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Đích đến"
                        name="destination"
                        rules={[{ required: true, message: 'Vui lòng chọn đích đến!' }]}
                    >
                        <Select placeholder="Chọn đích đến" className="w-full">
                            {provinces.map((item) => (
                                <Option key={item.code} value={item.code}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>

                <Form.Item
                    label="Ngày đi - Ngày về"
                    name="date"
                    rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}
                >
                    <RangePicker placeholder={['Nhập ngày bắt đầu', 'Nhập ngày kết thúc']} className="w-full" />
                </Form.Item>
                <div>
                    <p>Sô lượng hành khách</p>
                    <div className='grid grid-cols-3 gap-5'>
                        <Form.Item
                            label="Người lớn"
                            name="adults"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số lượng hợp lệ!',
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.reject(new Error('Vui lòng nhập số lượng!'));
                                        }
                                        if (isNaN(value) || value <= 0) {
                                            return Promise.reject(new Error('Số lượng phải là số dương!'));
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <Input placeholder='Nhập số lượng' type="number" step="1" className="w-full" />
                        </Form.Item>
                        <Form.Item
                            label="Trẻ em (dưới 12 tuổi)"
                            name="childrenUnder2"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số lượng hợp lệ!',
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.reject(new Error('Vui lòng nhập số lượng!'));
                                        }
                                        if (isNaN(value) || value <= 0) {
                                            return Promise.reject(new Error('Số lượng phải là số dương!'));
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <Input placeholder='Nhập số lượng' type="number" step="1" className="w-full" />
                        </Form.Item>
                        <Form.Item
                            label="Trẻ em (dưới 2 tuổi)"
                            name="childrenUnder12"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số lượng hợp lệ!',
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.reject(new Error('Vui lòng nhập số lượng!'));
                                        }
                                        if (isNaN(value) || value <= 0) {
                                            return Promise.reject(new Error('Số lượng phải là số dương!'));
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <Input placeholder='Nhập số lượng' type="number" step="1" className="w-full" />
                        </Form.Item>
                    </div>
                </div>

                <Form.Item
                    label="Lưu ý"
                    name="specialRequirements"
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default TransactionForm;
