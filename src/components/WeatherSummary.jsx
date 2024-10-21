// src/components/WeatherSummary.jsx
import React from 'react';

const WeatherSummary = ({ summary }) => {
    return (
        <div>
            <h2>Daily Weather Summary</h2>
            {summary.map((day, index) => (
                <div key={index}>
                    <p>Date: {day.date}</p>
                    <p>Average Temperature: {day.avgTemp} °C</p>
                    <p>Max Temperature: {day.maxTemp} °C</p>
                    <p>Min Temperature: {day.minTemp} °C</p>
                    <p>Dominant Condition: {day.dominantCondition}</p>
                </div>
            ))}
        </div>
    );
};

export default WeatherSummary;
