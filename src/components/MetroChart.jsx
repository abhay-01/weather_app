// src/components/TemperatureChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const MetroChart = ({ cityData,tempScale }) => {
    const convertTemp = (tempCelsius) =>{
        if(tempScale === 'Celsius'){
            return tempCelsius;
        }else{
            return (tempCelsius * 9/5) + 32;
        }
    };


    const cityMap = cityData
    console.log(cityMap);
    const cities = [...new Set(cityMap?.map(data => data.city))]; // Extract unique city names
    const datasets = cities?.map(city => {
        const cityData = cityMap.filter(data => data.city === city); // Filter data for the city

        return {
            label: city, // Set city name as label
            data: cityData.map(data => convertTemp(data.temp)), // Convert temperature based on selected scale
            borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`, // Random color for the line
            backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`, // Random light color
            fill: false, 
        };
    });

    const chartData = {
        labels: cityData?.map(data => data.condition), // Dates
        datasets: datasets,
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: `Temperature (${tempScale === 'Celsius' ? '°C' : '°F'})`,
                },
            },
            x:{
                type: 'category',
            }
        },
    };

    return (
        <div>
            <h2>Daily Temperature for Metro Cities</h2>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default MetroChart;
