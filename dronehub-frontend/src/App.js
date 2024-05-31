// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Footer from './components/Footer';
import './styles/App.css';
import './styles/global/Global.css';
import { FormDataProvider } from './pages/forms/components/FormDataContext';
import GeometricBackground from './pages/components/GeometricBackground'; // Import the GeometricBackground component

// Importing job-related components
import DroneForm from './pages/forms/DroneForm';
import JobBoard from './pages/components/jobs/JobBoard';
import JobPostDetail from './pages/components/jobs/JobPostDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <GeometricBackground /> {/* Render the GeometricBackground component */}
        <Header />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* Adding job-related routes */}
            <Route path="/drone-form" element={<DroneForm />} />
            <Route path="/jobs/:id" element={<JobPostDetail />} />
            <Route path="/jobs" element={<JobBoard />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
