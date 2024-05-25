// src/pages/PhotographyForm.js
import React from 'react';
import './GlobalForms.css';

const PhotographyForm = () => {
  return (
    <div className="form-container">
      <h2>Photography Service Form</h2>
      <form>
        <div>
          <label>Number of Photos:</label>
          <input type="number" name="numPhotos" />
        </div>
        <div>
          <label>Event Type:</label>
          <input type="text" name="eventType" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PhotographyForm;
