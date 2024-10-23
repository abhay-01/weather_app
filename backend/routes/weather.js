// backend/routes/weather.js
import { Router } from 'express';
import Weather from '../models/Weather.js';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();
const apiKey = process.env.OPENWEATHERMAP_API_KEY;

// Get daily summary
router.get('/fetch-weather', async (req, res) => {
    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
    console.log(apiKey);
    const weatherData =[];


    try {
        const fetchWeatherPromises = cities.map(async (city) => {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            const data = response.data;

            // Convert temperature from Kelvin to Celsius
            const tempCelsius = data.main.temp - 273.15;
            const feelsLikeCelsius = data.main.feels_like - 273.15;

            // Prepare weather data
            const weather = new Weather({
                city: city,
                temp: tempCelsius,
                feels_like: feelsLikeCelsius,
                condition: data.weather[0].main,
                date: new Date() // Add a timestamp for tracking
            });

            // Save to the database
            await weather.save();
            weatherData.push(weather);
        });

        // Wait for all promises to resolve
        await Promise.all(fetchWeatherPromises);


        res.json({ message: 'Weather data fetched and saved successfully.' , data: weatherData});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching weather data', error: error.message });
    }
});

// Get daily weather summary
router.get('/daily-summary', async (req, res) => {
    try {
        const summary = await Weather.aggregate([
            { $group: {
                _id: "$date",
                avgTemp: { $avg: "$temp" },
                maxTemp: { $max: "$temp" },
                minTemp: { $min: "$temp" },
                dominantCondition: { $first: "$condition" } // example for now
            }},
            { $sort: { _id: -1 } }
        ]);
        res.json(summary);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching daily summary', error: err.message });
    }
});

router.post('/alerts', async (req, res) => {
    const { temp: thresholdTemp } = req.body.thresholds;

    try {
        const recentWeather = await Weather.find().sort({ timestamp: -1 }).limit(2);
        if (recentWeather.length === 2) {
            const [latest, previous] = recentWeather;

            if (latest.temp > thresholdTemp && previous.temp > thresholdTemp) {
                res.json({
                    alert: true,
                    message: `Temperature exceeded ${thresholdTemp}°C for two consecutive updates!`
                });
            } else {
                res.json({
                    alert: false,
                    message: 'No threshold breached.'
                });
            }
        } else {
            res.status(400).json({ message: 'Not enough data to check alert.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error checking alert thresholds', error: err.message });
    }
});

export default router;