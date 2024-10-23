import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import WeatherChart from './WeatherChart';
import MetroChart from './MetroChart';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [tempScale, setTempScale] = useState('Celsius'); // State to track selected temperature scale

  useEffect(() => {
    axios.get('/weather/daily-summary')
      .then(response => setWeatherData(response.data))
      .catch(error => console.error('Error fetching weather data:', error));
  }, []);

  useEffect(() => {
    axios.get('/weather/fetch-weather')
      .then(response => setCityData(response.data.data))
      .catch(error => console.error('Error fetching city data:', error));
  }, []);

  const limitedWeatherData = weatherData.slice(0, 5);

  // Function to convert temperature based on selected scale
  const convertTemp = (tempCelsius) => {
    if (tempScale === 'Celsius') {
      return tempCelsius; // Already in Celsius
    }
    // Convert Celsius to Fahrenheit
    return (tempCelsius * 9/5) + 32;
  };

  return (
    <div className="dashboard">
      <h2>Daily Weather Summary</h2>
      
      {/* Temperature scale toggle */}
      <div className="temp-toggle">
        <label>
          <input
            type="radio"
            value="Celsius"
            checked={tempScale === 'Celsius'}
            onChange={() => setTempScale('Celsius')}
          /> 
          Celsius (°C)
        </label>
        <label>
          <input
            type="radio"
            value="Fahrenheit"
            checked={tempScale === 'Fahrenheit'}
            onChange={() => setTempScale('Fahrenheit')}
          /> 
          Fahrenheit (°F)
        </label>
      </div>

      <table className="weather-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Avg Temp ({tempScale === 'Celsius' ? '°C' : '°F'})</th>
            <th>Max Temp ({tempScale === 'Celsius' ? '°C' : '°F'})</th>
            <th>Min Temp ({tempScale === 'Celsius' ? '°C' : '°F'})</th>
            <th>Condition</th>
          </tr>
        </thead>
        <tbody>
          {limitedWeatherData?.map((data, index) => (
            <tr key={index}>
              <td>{data._id}</td>
              <td>{convertTemp(data.avgTemp)?.toFixed(2)}</td>
              <td>{convertTemp(data.maxTemp)?.toFixed(2)}</td>
              <td>{convertTemp(data.minTemp)?.toFixed(2)}</td>
              <td>{data.dominantCondition}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <WeatherChart weatherData={limitedWeatherData} tempScale={tempScale} />
      <MetroChart cityData={cityData} tempScale = {tempScale}/>
    </div>
  );
}

export default WeatherDashboard;
