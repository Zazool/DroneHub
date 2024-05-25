// src/pages/DroneForm.js
import React from 'react';
import { Formik } from "formik";
import { Form } from "antd";
import '../../styles/global/GlobalForms.css';
import CustomInput from './components/CustomInput.js';
import CustomButton from './components/CustomButton';

const DroneForm = () => {
  return (
    <div className="form-container">
      <h2>Drone Service Form</h2>
      <Formik
        initialValues={{ flightDuration: '', equipmentType: '' }}
        onSubmit={(values, { setSubmitting }) => {
          // handle form submission here
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onFinish={handleSubmit} className="drone-form">
            <CustomInput label="Flight Duration" name="flightDuration" type="number" />
            <CustomInput label="Equipment Type" name="equipmentType" type="text" />
            <Form.Item>
              <CustomButton text="Submit" htmlType="submit" disabled={isSubmitting} />
            </Form.Item>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DroneForm;
