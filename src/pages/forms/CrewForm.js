import React, { useState } from 'react';
import { Checkbox, Form, Input, InputNumber, Select, Button } from 'antd'; 
import '../../styles/global/GlobalForms.css';

const CrewForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({
    numCrew: null,
    eventType: '',
    equipment: [],
    eventDuration: '', // Added to track event duration
  });

  const steps = [
    {
      title: 'Number of Crew Members',
      question: 'How many crew members do you need?',
      content: (
        <Form.Item
          name="numCrew"
          rules={[{ required: true, message: 'Please input the number of crew members!' }]}
        >
          <InputNumber min={1} value={formValues.numCrew} onChange={(value) => setFormValues({ ...formValues, numCrew: value })} />
        </Form.Item>
      ),
    },
    {
      title: 'Event Type',
      question: 'What type of event is this for?',
      content: (
        <Form.Item
          name="eventType"
          rules={[{ required: true, message: 'Please input the event type!' }]}
        >
          <Input value={formValues.eventType} onChange={(e) => setFormValues({ ...formValues, eventType: e.target.value })} />
        </Form.Item>
      ),
    },
    {
      title: 'Equipment Needed',
      question: 'What equipment is needed?',
      content: (
        <Form.Item
          name="equipment"
          rules={[{ required: true, message: 'Please select the equipment needed!' }]}
        >
          <Checkbox.Group
            options={['Sound Recording (Mics)', 'Lighting', 'Camera', 'Drone']}
            value={formValues.equipment}
            onChange={(checkedValues) => setFormValues({ ...formValues, equipment: checkedValues })}
          />
        </Form.Item>
      ),
    },
    {
      title: 'Event Duration',
      question: 'How long will the Crew be needed for?',
      content: (
        <Form.Item
          name="eventDuration"
          rules={[{ required: true, message: 'Please select the event duration!' }]}
        >
          <Select
            value={formValues.eventDuration}
            onChange={(value) => setFormValues({ ...formValues, eventDuration: value })}
          >
            <Select.Option value="1-2 hours">1-2 hours</Select.Option>
            <Select.Option value="3-4 hours">3-4 hours</Select.Option>
            <Select.Option value="5-6 hours">5-6 hours</Select.Option>
            <Select.Option value="7-8 hours">7-8 hours</Select.Option>
            <Select.Option value="9-10 hours">9-10 hours</Select.Option>
          </Select>
        </Form.Item>
      ),
    },
  ];

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log('Received values of form: ', formValues);
  };

  return (
    <div className="form-container">
      <h2>Crew Service</h2>
      <p>{steps[currentStep].question}</p>
      <div className="custom-form">
        <Form>
          {steps[currentStep].content}
        </Form>
        <div className="steps-action">
          {currentStep > 0 && <Button onClick={handlePrev}>Previous</Button>}
          {currentStep < steps.length - 1 && <Button type="primary" onClick={handleNext}>Next</Button>}
          {currentStep === steps.length - 1 && <Button type="primary" onClick={handleSubmit}>Submit</Button>}
        </div>
      </div>
    </div>
  );
};

export default CrewForm;
