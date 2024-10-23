// src/components/TemperatureChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MetroChart = ({ cityData, tempScale }) => {
  const convertTemp = (tempCelsius) => {
    if (tempScale === "Celsius") {
      return tempCelsius;
    }
    return (tempCelsius * 9) / 5 + 32;
  };

  const cityMap = cityData;
  console.log(cityMap);
  const cities = [...new Set(cityMap?.map((data) => data.city))];
  const datasets = cities?.map((city) => {
    const cityData = cityMap.filter((data) => data.city === city); 

    return {
      label: city, 
      data: cityData.map((d) => convertTemp(d.avgTemp)),
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 1)`,
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.2)`, // Random light color
      fill: false,
    };
  });

  const chartData = {
    labels: cityData?.map((data) => data.condition),
    datasets: datasets,
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Temperature (°C)",
        },
      },
      x: {
        type: "category",
      },
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
