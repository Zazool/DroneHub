// src/pages/components/JobPostDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const JobPostDetail = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/jobs/${id}/`)
            .then(response => {
                setJob(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the job details!', error);
                setError('There was an error fetching the job details.');
            });
    }, [id]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!job) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{job.title}</h1>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Commencing:</strong> {job.date_commencing}</p>
            <p><strong>Ending:</strong> {job.date_ending}</p>
            <p><strong>Operator Duration:</strong> {job.operator_duration} {job.operator_duration_unit}</p>
            <p><strong>Event Duration:</strong> {job.event_duration}</p>
            <p><strong>Editing Options:</strong> {Object.entries(job.editing_options).map(([key, value]) => `${key}: ${value}`).join(', ')}</p>
            <p><strong>Equipment:</strong> {Object.entries(job.equipment).map(([key, value]) => `${key}: ${value}`).join(', ')}</p>
            <p><strong>Other Equipment:</strong> {job.other_equipment}</p>
            <p><strong>Service:</strong> {job.service}</p>
            <p><strong>Postcode:</strong> {job.postcode}</p>
            <p><strong>Contact Email:</strong> {job.contact_email}</p>
            <p><strong>Contact Name:</strong> {job.contact_name}</p>
            <p><strong>Contact Phone:</strong> {job.contact_phone}</p>
        </div>
    );
};

export default JobPostDetail;
