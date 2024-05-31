// src/pages/forms/DroneForm.js
import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Checkbox, Form, Input, InputNumber, Select, Button, DatePicker } from 'antd';
import '../../styles/global/GlobalForms.css';
import axios from 'axios'; // Make sure to import axios

const steps = [
  {
    title: 'UAS Operator Duration',
    question: 'How long do you need a UAS (Unmanned Aircraft System) operator for?',
  },
  {
    title: 'Describe the mission Objective',
    question: 'Describe the mission objective in detail',
  },
  {
    title: 'Equipment Needed',
    question: 'Additional equipment request?',
  },
  {
    title: 'Event Duration',
    question: 'For video filming missions is editing required?',
  },
  {
    title: 'Email Address and Phone Number',
    question: 'Please enter your email address and phone number',
  },
];

const DroneForm = () => {
  const location = useLocation();
  const { criteria } = location.state || { criteria: {} };

  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({
    operatorDuration: 1,
    operatorDurationUnit: 'hours',
    dateCommencing: null,
    dateEnding: null,
    eventType: '',
    equipment: [],
    eventDuration: '',
    firstName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    // Initialize form values with criteria from Home form
    setFormValues((prevValues) => ({
      ...prevValues,
      service: criteria.service || '',
      postcode: criteria.postcode || '',
      otherService: criteria.otherService || '',
    }));
  }, [criteria]);

  const [form] = Form.useForm();

  const handleNext = useCallback(async () => {
    try {
      await form.validateFields();
      setCurrentStep((prevStep) => prevStep + 1);
    } catch (errorInfo) {
      console.log('Validation Failed:', errorInfo);
    }
  }, [form]);

  const handlePrev = useCallback(() => {
    setCurrentStep((prevStep) => prevStep - 1);
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      await form.validateFields();
      
      // Log the form values to verify the payload
      console.log('Form Values:', formValues);
  
      const response = await axios.post('http://localhost:8000/api/jobs/', formValues, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Job created with ID:', response.data.id); // Log the response from the backend
  
      // Show success message
      alert('Form submitted successfully!');
  
      // Optionally, you can navigate to the job board or clear the form
      setFormValues({
        operatorDuration: 1,
        operatorDurationUnit: 'hours',
        dateCommencing: null,
        dateEnding: null,
        eventType: '',
        equipment: [],
        eventDuration: '',
        firstName: '',
        email: '',
        phone: '',
      });
    } catch (error) {
      console.log('Request Failed:', error);
  
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
        console.log('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log('Request data:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error message:', error.message);
      }
  
      alert('Failed to submit the form. Please try again.');
    }
  }, [form, formValues, setFormValues]);
  

  return (
    <div className="form-container">
      <h2>Drone - Mission Details</h2>
      <p>{steps[currentStep].question}</p>
      <div className="custom-form">
        <Form form={form} initialValues={formValues} onValuesChange={(changedValues, allValues) => setFormValues(allValues)}>
          {currentStep === 0 && (
            <>
              <Form.Item
                name="operatorDuration"
                rules={[{ required: true, message: 'Please input the duration for the UAS operator!' }]}
              >
                <InputNumber
                  min={1}
                  addonAfter={
                    <Select defaultValue="hours" onChange={(value) => setFormValues({ ...formValues, operatorDurationUnit: value })}>
                      <Select.Option value="hours">Hours</Select.Option>
                      <Select.Option value="days">Days</Select.Option>
                    </Select>
                  }
                  onChange={(value) => setFormValues({ ...formValues, operatorDuration: value })}
                />
              </Form.Item>
              <Form.Item
                name="dateCommencing"
                rules={[{ required: true, message: 'Please select the date commencing!' }]}
              >
                <DatePicker onChange={(date, dateString) => setFormValues({ ...formValues, dateCommencing: dateString })} />
              </Form.Item>
              <Form.Item
                name="dateEnding"
                rules={[{ required: true, message: 'Please select the date ending!' }]}
              >
                <DatePicker onChange={(date, dateString) => setFormValues({ ...formValues, dateEnding: dateString })} />
              </Form.Item>
            </>
          )}
          {currentStep === 1 && (
            <Form.Item
              name="eventType"
              rules={[{ required: true, message: 'Please input the Mission Description!' }]}
            >
              <Input.TextArea rows={4} autoSize={{ minRows: 4, maxRows: 10 }} onChange={(e) => setFormValues({ ...formValues, eventType: e.target.value })} />
            </Form.Item>
          )}
          {currentStep === 2 && (
            <>
              <Form.Item
                name="equipment"
                rules={[{ required: true, message: 'Please select the equipment needed!' }]}
              >
                <Checkbox.Group
                  options={['Sound Recording (Mics)', 'Lighting', 'Camera', 'Gimble', 'FPV System', 'Nothing', 'Other']}
                  onChange={(checkedValues) => setFormValues({ ...formValues, equipment: checkedValues })}
                />
              </Form.Item>
              {formValues.equipment.includes('Other') && (
                <Form.Item
                  name="otherEquipment"
                  rules={[{ required: true, message: 'Please describe the other equipment needed!' }]}
                >
                  <Input.TextArea rows={4} placeholder="Please describe the other equipment needed" onChange={(e) => setFormValues({ ...formValues, otherEquipment: e.target.value })} />
                </Form.Item>
              )}
            </>
          )}
          {currentStep === 3 && (
            <>
              <Form.Item
                name="eventDuration"
                rules={[{ required: true, message: 'Please select the event duration!' }]}
              >
                <Select onChange={(value) => setFormValues({ ...formValues, eventDuration: value })}>
                  <Select.Option value="Yes">Yes</Select.Option>
                  <Select.Option value="No">No</Select.Option>
                </Select>
              </Form.Item>
              {formValues.eventDuration === 'Yes' && (
                <Form.Item
                  name="editingOptions"
                  rules={[{ required: true, message: 'Please select the editing options needed!' }]}
                >
                  <Checkbox.Group
                    options={['Basic Editing (Cutting, Cropping, Colour Correction)', 'Color Grading', 'Special Effects', 'Sound Editing']}
                    onChange={(checkedValues) => setFormValues({ ...formValues, editingOptions: checkedValues })}
                  />
                </Form.Item>
              )}
            </>
          )}
          {currentStep === 4 && (
            <>
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input placeholder="Name" autoComplete="name" onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })} />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[{ type: 'email', required: true, message: 'Invalid email address!' }]}
              >
                <Input placeholder="Email Address" autoComplete="email" onChange={(e) => setFormValues({ ...formValues, email: e.target.value })} />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  { 
                    pattern: /^\d{4}[\s.-]?\d{3}[\s.-]?\d{4}$/,
                    required: true,
                    message: 'Invalid phone number!' 
                  }
                ]}
              >
                <Input placeholder="Phone Number" autoComplete="tel-national" inputMode="tel" onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })} />
              </Form.Item>
            </>
          )}
        </Form>
        <div className="steps-action">
          {currentStep > 0 && <Button onClick={handlePrev}>Previous</Button>}
          {currentStep < steps.length - 1 && <Button type="primary" onClick={handleNext}>Next</Button>}
          {currentStep === steps.length - 1 && <Button type="primary" onClick={handleSubmit}>Submit</Button>}
        </div>
      </div>
    </div>
  );
}

export default DroneForm;
