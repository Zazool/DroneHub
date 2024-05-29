// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import DroneForm from './pages/forms/DroneForm';
//import VideographyForm from './pages/forms/VideographyForm';
//import PhotographyForm from './pages/forms/PhotographyForm';
//import EditingForm from './pages/forms/EditingForm';
//import CrewForm from './pages/forms/CrewForm';
import Footer from './components/Footer';
import './styles/App.css';
import './styles/global/Global.css';
import { FormDataProvider } from './pages/forms/components/FormDataContext';
import GeometricBackground from './pages/components/GeometricBackground'; // Import the GeometricBackground component




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
            <Route path="/drone-form" element={<DroneForm />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}


/*
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
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}*/

export default App;

