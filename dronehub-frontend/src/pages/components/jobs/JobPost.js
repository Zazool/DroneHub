// src/pages/components/JobForm.js
import React, { useState } from 'react';
import axios from 'axios';

const JobForm = () => {
    const [formData, setFormData] = useState({
        operatorDuration: 6,
        operatorDurationUnit: 'hours',
        dateCommencing: '2024-05-29',
        dateEnding: '2024-05-29',
        eventType: 'This is a mission Objective description',
        email: 'liam-mead@live.co.uk',
        editingOptions: ['Basic Editing (Cutting, Cropping, Colour Correction)', 'Color Grading', 'Special Effects', 'Sound Editing'],
        equipment: ['Sound Recording (Mics)', 'Lighting', 'Camera', 'Gimble', 'FPV System', 'Other'],
        firstName: 'Liam Mead',
        otherEquipment: 'This is a description of other equipment that might be needed',
        otherService: 'This is a project type description',
        phone: '07534893277',
        postcode: 'CM23 3DQ',
        service: 'Other',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/jobs/', formData)
            .then(response => {
                console.log('Job created with ID:', response.data.id);
                // Redirect or update state to show the new job
            })
            .catch(error => {
                console.error('There was an error creating the job!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Render form fields and bind them to formData */}
            <button type="submit">Submit</button>
        </form>
    );
};

export default JobForm;
