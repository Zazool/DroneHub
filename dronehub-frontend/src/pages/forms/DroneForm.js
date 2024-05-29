// src/pages/forms/DroneForm.js
import React, { useContext, useState } from 'react';
import { Checkbox, Form, Input, InputNumber, Select, Button, DatePicker } from 'antd'; 
import '../../styles/global/GlobalForms.css';
import FormDataContext from './components/FormDataContext';

const DroneForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({
    operatorDuration: 1,
    operatorDurationUnit: 'hours',
    dateCommencing: null,
    dateEnding: null,
    eventType: '',
    equipment: [],
    eventDuration: '',
  });

  const steps = [
    {
      title: 'UAS Operator Duration',
      question: 'How long do you need a UAS (Unmanned Aircraft System) operator for?',
      content: (
        <>
          <p>Duration</p>
          <Form.Item
            name="operatorDuration"
            rules={[{ required: true, message: 'Please input the duration for the UAS operator!' }]}
          >
            <InputNumber
              min={1}
              value={formValues.operatorDuration}
              onChange={(value) => setFormValues({ ...formValues, operatorDuration: value })}
              addonAfter={
                <Select
                  value={formValues.operatorDurationUnit}
                  onChange={(value) => setFormValues({ ...formValues, operatorDurationUnit: value })}
                >
                  <Select.Option value="hours">Hours</Select.Option>
                  <Select.Option value="days">Days</Select.Option>
                </Select>
              }
            />
          </Form.Item>
          <p>Start Date</p>
          <Form.Item
            name="dateCommencing"
            rules={[{ required: true, message: 'Please select the date commencing!' }]}
          >
            <DatePicker
              value={formValues.dateCommencing}
              onChange={(date, dateString) => setFormValues({ ...formValues, dateCommencing: dateString })}
            />
          </Form.Item>
          <p>End Date</p>
          <Form.Item
            name="dateEnding"
            rules={[{ required: true, message: 'Please select the date ending!' }]}
          >
            <DatePicker
              value={formValues.dateEnding}
              onChange={(date, dateString) => setFormValues({ ...formValues, dateEnding: dateString })}
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Describe the mission Objective',
      question: 'Describe the mission objective in detail',
      content: (
        <Form.Item
          name="Mission Description"
          rules={[{ required: true, message: 'Please input the Mission Description!' }]}
        >
          <Input.TextArea
            value={formValues.eventType}
            onChange={(e) => setFormValues({ ...formValues, eventType: e.target.value })}
            rows={4} // Set the number of rows for the initial height
            autoSize={{ minRows: 4, maxRows: 10 }} // Make it expandable
          />
        </Form.Item>
      ),
    },
    {
      title: 'Equipment Needed',
      question: 'Additional equipment request?',
      content: (
        <>
          <Form.Item
            name="equipment"
            rules={[{ required: true, message: 'Please select the equipment needed!' }]}
          >
            <Checkbox.Group
              options={['Sound Recording (Mics)', 'Lighting', 'Camera', 'Gimble', 'FPV System', 'Nothing', 'Other']}
              value={formValues.equipment}
              onChange={(checkedValues) => setFormValues({ ...formValues, equipment: checkedValues })}
            />
          </Form.Item>
          {formValues.equipment.includes('Other') && (
            <Form.Item
              name="otherEquipment"
              rules={[{ required: true, message: 'Please describe the other equipment needed!' }]}
            >
              <Input.TextArea
                value={formValues.otherEquipment}
                onChange={(e) => setFormValues({ ...formValues, otherEquipment: e.target.value })}
                rows={4}
                placeholder="Please describe the other equipment needed"
              />
            </Form.Item>
          )}
        </>
      ),
    },
    {
      title: 'Event Duration',
      question: 'For video filming missions is editing required?',
      content: (
        <>
          <Form.Item
            name="eventDuration"
            rules={[{ required: true, message: 'Please select the event duration!' }]}
          >
            <Select
              value={formValues.eventDuration}
              onChange={(value) => setFormValues({ ...formValues, eventDuration: value })}
              className="custom-select"
            >
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
                value={formValues.editingOptions}
                onChange={(checkedValues) => setFormValues({ ...formValues, editingOptions: checkedValues })}
              />
            </Form.Item>
          )}
        </>
      ),
    },
    {
      title: 'Email Address and Phone Number',
      question: 'Please enter your email address and phone number',
      content: (
        <Form
        name="contactInfo"
        initialValues={formValues}
        onValuesChange={(changedValues, allValues) => setFormValues(allValues)}
        rules={[{ required: true, message: 'Please input your email address and phone number!' }]}
      >
        <Form.Item
          name="name"
          rules={[{ type: 'firstName', message: 'Invalid email address!', required: true }]}
        >
          <Input
            type="firstName"
            value={formValues.firstName}
            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
            placeholder="Name"
            autoComplete="name"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ type: 'email', message: 'Invalid email address!', required: true }]}
        >
          <Input
            type="email"
            value={formValues.email}
            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
            placeholder="Email Address"
            autoComplete="email"
          />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            { 
              pattern: /^\d{4}[\s.-]?\d{3}[\s.-]?\d{4}$/,
              message: 'Invalid phone number!',
              required: true 
            }
          ]}
        >
          <Input
            type="tel"
            value={formValues.phone}
            onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
            placeholder="Phone Number"
            autoComplete="tel-national"
            inputMode="tel"
          />
        </Form.Item>
      </Form>
      ),
    }
  ];


  const [form] = Form.useForm();

  const handleNext = async () => {
    try {
      await form.validateFields();
      setCurrentStep(currentStep + 1);
    } catch (errorInfo) {
      console.log('Validation Failed:', errorInfo);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      console.log('Received values of form: ', formValues);
    } catch (errorInfo) {
      console.log('Validation Failed:', errorInfo);
    }
  };

  return (
    <div className="form-container">
      <h2>Drone - Mission Details</h2>
      <p>{steps[currentStep].question}</p>
      <div className="custom-form">
        <Form form={form}>
          {steps[currentStep].content}
        </Form>
        <div className="steps-action">
         <div className="previous-button"> {currentStep > 0 && <Button onClick={handlePrev}>Previous</Button>}</div>
         <div className="next-button"> {currentStep < steps.length - 1 && <Button type="primary" onClick={handleNext}>Next</Button>}</div>
          {currentStep === steps.length - 1 && <Button type="primary" onClick={handleSubmit}>Submit</Button>}
        </div>
      </div>
    </div>
  );
}

export default DroneForm;
