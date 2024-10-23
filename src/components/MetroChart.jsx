import React from 'react';
import { Line } from 'react-chartjs-2';


const MetroChart = ({ cityData, tempScale }) => {
    const convertTemp = (tempCelsius) => {
      if (tempScale === 'Celsius') {
        return tempCelsius;
      } else {
        return (tempCelsius * 9) / 5 + 32;
      }
    };
  
    const cityMap = cityData;
    console.log(cityMap);
    
    const cities = [...new Set(cityMap?.map((data) => data.city))];
    console.log(cities);

    const cityColors = [
      'rgba(255, 99, 132, 1)', // Red
      'rgba(54, 162, 235, 1)', // Blue
      'rgba(75, 192, 192, 1)', // Green
      'rgba(153, 102, 255, 1)', // Purple
      'rgba(255, 206, 86, 1)', // Yellow
      'rgba(255, 159, 64, 1)', // Orange
    ];
  
    const datasets = cities?.map((city, index) => {
      const cityDataFiltered = cityMap.filter((data) => data.city === city);
      console.log(cityDataFiltered);
  
      return {
        label: city,
        data: cityDataFiltered.map((data) => convertTemp(data.temp)),
        borderColor: cityColors[index % cityColors.length],
        backgroundColor: `${cityColors[index % cityColors.length].replace('1)', '0.2)')}`,
        fill: false,
        tension: 0.4,  // This adds a curve to the line
      };
    });
  
    const chartData = {
      labels: cityData?.map((data) => data.timestamp || data.date), // Replace with actual timestamp or date
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
        x: {
          title: {
            display: true,
            text: 'Date/Time',
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)} ${
                tempScale === 'Celsius' ? '°C' : '°F'
              }`;
            },
          },
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
