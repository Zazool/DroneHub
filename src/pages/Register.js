// src/pages/Register.js
import React from 'react';
import '../styles/global/GlobalForms.css';

const Register = () => {
  return (
    <div>
      <h2>Register</h2>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
