// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import DroneForm from './pages/DroneForm';
import VideographyForm from './pages/VideographyForm';
import PhotographyForm from './pages/PhotographyForm';
import EditingForm from './pages/EditingForm';
import CrewForm from './pages/CrewForm';
import Footer from './components/Footer';
import './App.css';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/drone-form" element={<DroneForm />} />
            <Route path="/videography-form" element={<VideographyForm />} />
            <Route path="/photography-form" element={<PhotographyForm />} />
            <Route path="/editing-form" element={<EditingForm />} />
            <Route path="/crew-form" element={<CrewForm />} />
            {/* Add more routes here as you create more pages */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
