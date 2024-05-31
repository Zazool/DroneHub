import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const JobBoard = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get('/api/jobs/')  // Ensure this is a relative URL
            .then(response => {
                setJobs(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the jobs!', error);
            });
    }, []);

    return (
        <div>
            <h1>Job Board</h1>
            <ul>
                {jobs.map(job => (
                    <li key={job.id}>
                        <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobBoard;
