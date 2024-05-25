// src/pages/VideographyForm.js
import React from 'react';
import CustomInput from './components/CustomInput.js';
import CustomButton from './components/CustomButton';
import '../../styles/global/GlobalForms.css';

const VideographyForm = () => {
  return (
    <div className="form-container">
      <h2>Videography Service Form</h2>
      <form>
        <div>
          <label>Video Length:</label>
          <input type="number" name="videoLength" />
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

export default VideographyForm;
