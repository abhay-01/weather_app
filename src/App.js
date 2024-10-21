import React from 'react';
import Navbar from './components/Navbar';
import WeatherDashboard from './components/WeatherDashboard';
import AlertSettings from './components/AlertSettings';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<WeatherDashboard />} />
          <Route path="/alerts" element={<AlertSettings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
