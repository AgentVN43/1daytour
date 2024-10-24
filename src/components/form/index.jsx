import React, { useState } from 'react';
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Mentions,
    Select,
    TreeSelect,
    Segmented,
} from 'antd';
const { RangePicker } = DatePicker;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 14,
        },
    },
};
const FormInfo = () => {
    const [componentVariant, setComponentVariant] = useState('filled');
    const onFormVariantChange = ({ variant }) => {
        setComponentVariant(variant);
    };
    return (
        <Form
            {...formItemLayout}
            onValuesChange={onFormVariantChange}
            // variant={componentVariant}
            style={{
                maxWidth: 600,
                border: '1px solid #ccc'
            }}
            initialValues={{
                variant: componentVariant,
            }}
        >

            <Form.Item
                label="Input"
                name="Input"
                rules={[
                    {
                        required: true,
                        message: 'Please input!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 6,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
export default FormInfo;