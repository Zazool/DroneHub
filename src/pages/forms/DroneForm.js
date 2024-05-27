// src/pages/DroneForm.js
import React, { useContext } from 'react';
import { Formik } from "formik";
import { Form } from "antd";
import '../../styles/global/GlobalForms.css';
import FormDataContext from './components/FormDataContext';
import CustomInput from './components/CustomInput.js';
import CustomButton from './components/CustomButton';

const DroneForm = () => {
  const { formData, updateFormData } = useContext(FormDataContext);

  return (
    <div className="form-container">
      <h2>Drone Service Form</h2>
      <Formik
        initialValues={{ flightDuration: '', equipmentType: '' }}
        onSubmit={(values, { setSubmitting }) => {
          // Combine with existing form data and handle submission
          const combinedData = {
            ...formData,
            additionalData: values,
          };

          console.log('Combined Data:', combinedData);

          // Update the context with the additional form data
          updateFormData({ additionalData: values });

          // handle form submission here (e.g., send data to server)
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
