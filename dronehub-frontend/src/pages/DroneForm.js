// src/pages/DroneForm.js
import React from 'react';
import { Formik, Field } from 'formik';
import { Form, Input, Button } from 'antd';
import './GlobalForms.css';

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
            <Form.Item label="Flight Duration" name="flightDuration">
              <Field as={Input} name="flightDuration" type="number" />
            </Form.Item>
            <Form.Item label="Equipment Type" name="equipmentType">
              <Field as={Input} name="equipmentType" type="text" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DroneForm;
