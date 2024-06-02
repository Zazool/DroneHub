// src/pages/forms/DroneForm.js
import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Checkbox, Form, Input, InputNumber, Select, Button, DatePicker } from 'antd';
import '../../styles/global/GlobalForms.css';
import axios from 'axios'; 

// Define the steps for the form wizard, each step has a title and a question
const steps = [
  {
    title: 'UAS Operator Duration',
    question: 'How long do you need a drone pilot for?',
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
    title: 'Editing Needed',
    question: 'For video filming missions is editing required?',
  },
  {
    title: 'Email Address and Phone Number',
    question: 'Please enter your email address and phone number',
  },
];

const DroneForm = () => {
  // Get the location object from the router
  const location = useLocation();
  // Extract criteria from the location state, default to an empty object if not present
  const { criteria } = location.state || { criteria: {} };

  // State to keep track of the current step in the form wizard
  const [currentStep, setCurrentStep] = useState(0);
  // State to keep track of the form values
  const [formValues, setFormValues] = useState({
    title: 'Untitled Job',
    description: '',
    date_commencing: null,
    date_ending: null,
    operator_duration: 1,
    operator_duration_unit: 'hours',
    editing_options: [],
    equipment: [],
    other_equipment: '',
    service: 'Standard',
    postcode: '',
    contact_email: '',
    contact_name: '',
    contact_phone: '',
  });

  // Effect to initialize form values with criteria from the Home form
  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      service: criteria.service || '',
      postcode: criteria.postcode || '',
      otherService: criteria.otherService || '',
    }));
  }, [criteria]);

  // Create a form instance using Ant Design's Form hook
  const [form] = Form.useForm();

  // Function to handle moving to the next step
  const handleNext = useCallback(async () => {
    try {
      // Validate the current step's fields
      await form.validateFields();
      // Move to the next step
      setCurrentStep((prevStep) => prevStep + 1);
    } catch (errorInfo) {
      // Log validation errors
      console.log('Validation Failed:', errorInfo);
    }
  }, [form]);

  // Function to handle moving to the previous step
  const handlePrev = useCallback(() => {
    setCurrentStep((prevStep) => prevStep - 1);
  }, []);

  // Function to handle form submission
  const handleSubmit = useCallback(async () => {
    try {
      // Validate all fields before submission
      await form.validateFields();
      // Log the form values to verify the payload
      console.log('Form Values:', formValues);

      // Send a POST request to the backend to create a new job
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
        title: '',
        description: '',
        date_commencing: null,
        date_ending: null,
        operator_duration: 1,
        operator_duration_unit: 'hours',
        editing_options: [],
        equipment: [],
        other_equipment: '',
        service: 'Standard',
        postcode: '',
        contact_email: '',
        contact_name: '',
        contact_phone: '',
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
      
      {/* Form Wrapper */}
        <Form form={form} initialValues={formValues} onValuesChange={(changedValues, allValues) => setFormValues(allValues)}>
          {currentStep === 0 && (
            <>
            {/* Operator Duration */}
              <Form.Item
                name="operator_duration"
                rules={[{ required: true, message: 'Please input the duration for the UAS operator!' }]}
              >
                <InputNumber
                  min={1}
                  addonAfter={
                    <Select defaultValue="hours" onChange={(value) => setFormValues({ ...formValues, operator_duration_unit: value })}>
                      <Select.Option value="hours">Hours</Select.Option>
                      <Select.Option value="days">Days</Select.Option>
                    </Select>
                  }
                  onChange={(value) => setFormValues({ ...formValues, operator_duration: value })}
                />
              </Form.Item>

              {/* Date Commencing */}
              <p>Start Date</p>
              <Form.Item
                name="date_commencing"
                rules={[{ required: true, message: 'Please select the date commencing!' }]}
              >
                <DatePicker onChange={(date, dateString) => setFormValues({ ...formValues, date_commencing: dateString })} />
              </Form.Item>
              {/* Date Ending */}
              <p>End Date</p>
              <Form.Item
                name="date_ending"
                rules={[{ required: true, message: 'Please select the date ending!' }]}
              >
                <DatePicker onChange={(date, dateString) => setFormValues({ ...formValues, date_ending: dateString })} />
              </Form.Item>
            </>
          )}


          {/* Mission Description */}
          {currentStep === 1 && (
            
            <Form.Item
              name="description"
              rules={[{ required: true, message: 'Please input the Mission Description!' }]}
            >
              <Input.TextArea rows={4} placeholder="Please input the Mission Description!" autoSize={{ minRows: 4, maxRows: 10 }} onChange={(e) => setFormValues({ ...formValues, description: e.target.value })} />
            </Form.Item>
          )}
          

          {currentStep === 2 && (
            <>

            {/* equipment required */}
              <Form.Item
                name="equipment"
                rules={[{ required: true, message: 'Please select the equipment needed!' }]}
              >
                <Checkbox.Group
                  options={['Sound Recording (Mics)', 'Lighting', 'Camera', 'Gimble', 'FPV System', 'Nothing', 'Other']}
                  onChange={(checkedValues) => setFormValues({ ...formValues, equipment: checkedValues })}
                />
              </Form.Item>

              {/* Other Equipment Text Field displayed if Other is selected */}
              {formValues.equipment.includes('Other') && (
                <Form.Item
                  name="other_equipment"
                  rules={[{ required: true, message: 'Please describe the other equipment needed!' }]}
                >
                  <Input.TextArea rows={4} placeholder="Please describe the other equipment needed" 
                  onChange={(e) => setFormValues({ ...formValues, other_equipment: e.target.value })} />
                </Form.Item>
              )}
            </>
          )}

          {currentStep === 3 && (
            <>

              {/* Editing required Yes or No*/}
              <Form.Item
                name="editing_options"
                rules={[{ required: true, message: 'Please select the editing required' }]}>
                <Select
                  value={formValues.editing_options} // Bind to state
                  onChange={(value) => setFormValues({ ...formValues, editing_options: value })}
                >
                  <Select.Option value="Yes">Yes</Select.Option>
                  <Select.Option value="No">No</Select.Option>
                </Select>

              {/* Editing options if 'Yes' Selected */}
              </Form.Item>
              {formValues.editing_options === 'Yes' && (
                <Form.Item
                  name="editing_options_details"
                  rules={[{ required: true, message: 'Please select the editing options needed!' }]}
                >
                  <Checkbox.Group
                    options={['Basic Editing (Cutting, Cropping, Colour Correction)', 'Color Grading', 'Special Effects', 'Sound Editing', 'Other']}
                    onChange={(checkedValues) => setFormValues({ ...formValues, editing_options_details: checkedValues })}
                  />
               </Form.Item>
              )} 

              {/* Other Editing Text Field displayed if Other is selected */}             
              {formValues.editing_options.includes('Other') && (
                <Form.Item
                  name="other_editing"
                  rules={[{ required: true, message: 'Please describe the other editing needed.' }]}
                >
                  <Input.TextArea rows={4} placeholder="Please describe the other editing needed." 
                  onChange={(e) => setFormValues({ ...formValues, other_editing: e.target.value })} />
                </Form.Item>
              )}
            </> 
          )}
          {currentStep === 4 && (
            <>
              <Form.Item
                name="contact_name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input placeholder="Name" autoComplete="name" onChange={(e) => setFormValues({ ...formValues, contact_name: e.target.value })} />
              </Form.Item>
              <Form.Item
                name="contact_email"
                rules={[{ type: 'email', required: true, message: 'Invalid email address!' }]}
              >
                <Input placeholder="Email Address" autoComplete="email" onChange={(e) => setFormValues({ ...formValues, contact_email: e.target.value })} />
              </Form.Item>
              <Form.Item
                name="contact_phone"
                rules={[
                  { 
                    pattern: /^\d{4}[\s.-]?\d{3}[\s.-]?\d{4}$/,
                    required: true,
                    message: 'Invalid phone number!' 
                  }
                ]}
              >
                
                <Input placeholder="Phone Number" autoComplete="tel-national" inputMode="tel" onChange={(e) => setFormValues({ ...formValues, contact_phone: e.target.value })} />
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


