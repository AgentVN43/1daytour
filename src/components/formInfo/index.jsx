import React from 'react';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
const { Option } = Select;

const TransactionForm = ({ provinces, infoTraveler, setInfoTraveler }) => {
    const { RangePicker } = DatePicker;
    const getProvinceCode = (name) => {
        const province = provinces.find((p) => p.name === name);
        return province ? province.code : "";
    };

    const generateTourId = (
        departure,
        destination,
        date,
        vehicleType
    ) => {
        const depCode = getProvinceCode(departure);
        const destCode = getProvinceCode(destination);
        const formattedDate = date[0].format("DDMMYY");

        const timestamp = Date.now().toString().slice(-5);
        const randomNum = Math.floor(100 + Math.random() * 900);
        const uniqueOrder = `${timestamp}${randomNum}`;

        return `${depCode}${destCode}-${uniqueOrder}-${formattedDate}${vehicleType}`;
    };

    const selectedOption = JSON.parse(localStorage.getItem('selectedOption')) || {};


    const onFinish = (values) => {

        console.log('Received values:', values);
        const generatedId = generateTourId(
            values.departure,
            values.destination,
            values.date,
            selectedOption.code
        );
        setInfoTraveler({
            ...infoTraveler,
            tourId: generatedId,
            customerName: values.customerName,
            departure: values.departure,
            destination: values.destination,
            departureDate: values.date ? values.date[0].format("YYYY-MM-DD") : "",
            returnDate: values.date ? values.date[1].format("YYYY-MM-DD") : "",
            passengers: values.passengers,
            vehicleType: selectedOption.id,
            specialRequirements: values.specialRequirements || ""
        })
        message.success('Cập nhật giao dịch thành công!');
    };

    const onFinishFailed = (errorInfo) => {
        message.error('Cập nhật giao dịch thất bại: ' + errorInfo.errorFields.map((field) => field.errors[0]).join(', '));
    };

    return (
        <div className="max-w-xl mx-auto p-5 bg-white shadow-md rounded-lg my-5">
            <h2 className="text-3xl font-bold mb-6 text-start">Nhập thông tin khách hàng</h2>
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
                                <Option key={item.code} value={item.name}>{item.name}</Option>
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
                                <Option key={item.code} value={item.name}>{item.name}</Option>
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
                    <p className='text-start'>Sô lượng hành khách</p>
                    <div className='grid grid-cols-3 gap-5'>
                        <Form.Item
                            label="Người lớn (12 tuổi trở lên)"
                            name={["passengers", "adults"]}
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
                            name={["passengers", "childrenUnder12"]}
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
                            label="Trẻ nhỏ (dưới 5 tuổi)"
                            name={["passengers", "childrenUnder2"]}
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
