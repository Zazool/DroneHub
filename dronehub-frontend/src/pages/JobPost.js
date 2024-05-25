// src/pages/JobPost.js
import React from 'react';

const JobPost = () => {
  return (
    <div>
      <h2>Post a Job</h2>
      <form>
        <div>
          <label>Job Title:</label>
          <input type="text" />
        </div>
        <div>
          <label>Description:</label>
          <textarea />
        </div>
        <div>
          <label>Payment:</label>
          <input type="number" />
        </div>
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default JobPost;
