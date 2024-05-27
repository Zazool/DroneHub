// src/components/CustomInput.js
import React from 'react';
import { Form, Input } from 'antd';
import '../../../styles/global/GlobalForms.css';

const CustomInput = ({ label, name, type = 'text' }) => (
  <Form.Item label={label} name={name}>
    <Input type={type} name={name} />
  </Form.Item>
);

export default CustomInput;
