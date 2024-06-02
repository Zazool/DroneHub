// ./src/home.js
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Input } from 'antd';
import '../styles/global/Global.css';
import '../styles/Home.css';

const options = [
  { value: 'Commercial', label: 'Commercial' },
  { value: 'TV', label: 'TV' },
  { value: 'Marketing & PR', label: 'Marketing & PR' },
  { value: 'Inspection and Survey', label: 'Inspection and Survey' },
  { value: 'Photography', label: 'Photography' },
  { value: '3D Mapping', label: '3D Mapping' },
  { value: 'Videography', label: 'Videography' },
  { value: 'Editing', label: 'Editing' },
  { value: 'Other', label: 'Other' },
];

const Home = () => {
  const [criteria, setCriteria] = useState({ service: '', postcode: '', otherService: '' });
  const [transition, setTransition] = useState(false);
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
  }, []);

  const handleServiceChange = useCallback((selectedOption) => {
    setCriteria((prevCriteria) => ({ ...prevCriteria, service: selectedOption ? selectedOption.value : '' }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setTransition(true);
    setTimeout(() => {
      navigate('/drone-form', { state: { criteria } });
    }, 1000);
  }, [navigate, criteria]);

  const handleViewJobs = () => {
    navigate('/jobs');
  };

  return (
    <div className="home-container">
      <div className={`content ${transition ? 'fade-out' : ''}`}>
        <h2>Connect with a Drone Pilot</h2>
        <p>Ready to take on your project</p>
        <form onSubmit={handleSubmit} className="search-form">
          <div className="input-row">
            <Select
              options={options}
              value={criteria.service ? { value: criteria.service, label: criteria.service } : null}
              onChange={handleServiceChange}
              placeholder="Project Type"
              className="form-input select-input"
            />
            <input
              type="text"
              name="postcode"
              value={criteria.postcode}
              onChange={handleChange}
              placeholder="Postcode"
              className="form-input postcode-input"
            />
          </div>
          {criteria.service === 'Other' && (
            <div className="description-row">
              <Input
                type="text"
                name="otherService"
                value={criteria.otherService}
                onChange={handleChange}
                placeholder="Describe your Project type"
                className="form-input description-input"
              />
            </div>
          )}
          <div>
            <button type="submit" className="search-button">Search</button>
          </div>
        </form>
        <div>
          <button onClick={handleViewJobs} className="view-jobs-button">View Jobs</button>
        </div>
        <div className="popular-services">Certified UAV Operators.</div>
      </div>
    </div>
  );
};

export default Home;
