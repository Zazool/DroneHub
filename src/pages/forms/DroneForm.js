// src/pages/Forms/DroneForm.js
import React from 'react';
import { Formik, Field } from 'formik';
import { Form } from 'antd';
import CustomInput from './components/CustomInput.js';
import CustomButton from './components/CustomButton';
import '../../styles/global/GlobalForms.css';

const DroneForm = () => {
  return (
    <div className="form-container">
      <h2 className="text-3xl font-bold text-white mb-4">Drone Service Form</h2>
      <Formik
        initialValues={{ flightDuration: '', equipmentType: '' }}
        onSubmit={(values, { setSubmitting }) => {
          // handle form submission here
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onFinish={handleSubmit} className="custom-form">
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
