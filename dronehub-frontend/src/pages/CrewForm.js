// src/pages/CrewForm.js
import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import './GlobalForms.css';

const CrewForm = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className="form-container">
      <h2>Crew Service Form</h2>
      <Form
        name="crew_form"
        onFinish={onFinish}
      >
        <Form.Item
          label="Number of Crew Members"
          name="numCrew"
          rules={[{ required: true, message: 'Please input the number of crew members!' }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          label="Event Type"
          name="eventType"
          rules={[{ required: true, message: 'Please input the event type!' }]}
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

export default CrewForm;