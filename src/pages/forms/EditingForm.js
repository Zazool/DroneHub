// src/pages/EditingForm.js
import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import CustomInput from './components/CustomInput.js';
import CustomButton from './components/CustomButton';
import '../../styles/global/GlobalForms.css';

const EditingForm = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className="form-container">
      <h2>Editing Service Form</h2>
      <Form
        name="editing_form"
        onFinish={onFinish}
      >
        <Form.Item
          label="Video Length"
          name="videoLength"
          rules={[{ required: true, message: 'Please input the video length!' }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          label="Editing Style"
          name="editingStyle"
          rules={[{ required: true, message: 'Please input the editing style!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditingForm;