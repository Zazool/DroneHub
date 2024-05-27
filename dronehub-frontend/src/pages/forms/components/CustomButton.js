// src/components/CustomButton.js
import React from 'react';
import { Button } from 'antd';
import '../../../styles/global/GlobalForms.css';

const CustomButton = ({ text, ...props }) => (
  <Button type="primary" {...props}>
    {text}
  </Button>
);

export default CustomButton;
