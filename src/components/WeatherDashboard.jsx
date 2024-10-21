import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import WeatherChart from './WeatherChart';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    axios.get('/weather/daily-summary')
      .then(response => setWeatherData(response.data))
      .catch(error => console.error('Error fetching weather data:', error));
  }, []);
const limitedWeatherData = weatherData.slice(0,5);


  return (
    <div className="dashboard">
      <h2>Daily Weather Summary</h2>
      <table className="weather-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Avg Temp (°C)</th>
            <th>Max Temp (°C)</th>
            <th>Min Temp (°C)</th>
            <th>Condition</th>
          </tr>
        </thead>
        <tbody>
          {limitedWeatherData.map((data, index) => (
            <tr key={index}>
              <td>{data._id}</td>
              <td>{data.avgTemp.toFixed(2)}</td>
              <td>{data.maxTemp.toFixed(2)}</td>
              <td>{data.minTemp.toFixed(2)}</td>
              <td>{data.dominantCondition}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <WeatherChart weatherData={limitedWeatherData} />
    </div>
  );
}

export default WeatherDashboard;
