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

const WeatherChart = ({ weatherData, tempScale }) => {
  const convertTemp = (tempCelsius) => {
    if (tempScale === 'Celsius') {
      return tempCelsius;
    }
    return (tempCelsius * 9/5) + 32;
  };

  const data = {
    labels: weatherData.map(d => d._id),  // Assuming _id is the date or label
    datasets: [
      {
        label: `Avg Temperature (${tempScale === 'Celsius' ? '°C' : '°F'})`,
        data: weatherData.map(d => convertTemp(d.avgTemp)),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default WeatherChart;
