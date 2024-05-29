// src/pages/Home.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global/Global.css';
import FormDataContext from './forms/components/FormDataContext';
import '../styles/Home.css';

const Home = () => {
  const { updateFormData } = useContext(FormDataContext);
  const [criteria, setCriteria] = useState({ service: '', postcode: '' });
  const navigate = useNavigate();
  const [transition, setTransition] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCriteria({ ...criteria, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the form data context with the criteria
    updateFormData(criteria);
    setTransition(true);
    setTimeout(() => {
      switch (criteria.service.toLowerCase()) {
        case 'drone':
          navigate('/drone-form');
          break;
        case 'videography':
          navigate('/videography-form');
          break;
        case 'photography':
          navigate('/photography-form');
          break;
        case 'editing':
          navigate('/editing-form');
          break;
        case 'crew':
          navigate('/crew-form');
          break;
        default:
          navigate('/');
          break;
      }
    }, 1000); // Duration of the transition
  };

  return (
    <div className={`home-container ${transition ? 'fade-out' : ''}`}>
      <h2>Find the perfect professional for you</h2>
      <p>Get free quotes within minutes</p>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          name="service"
          value={criteria.service}
          onChange={handleChange}
          placeholder="What service are you looking for?"
          className="form-input"
          list="services"
        />
        <datalist id="services">
          <option value="Drone" />
          <option value="Videography" />
          <option value="Photography" />
          <option value="Editing" />
          <option value="Crew" />
        </datalist>
        <input
          type="text"
          name="postcode"
          value={criteria.postcode}
          onChange={handleChange}
          placeholder="Postcode"
          className="form-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="popular-services">
        Popular: House Cleaning, Web Design, Personal Trainers
      </div>
    </div>
  );
};

export default Home;