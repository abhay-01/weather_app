import express, { json } from 'express';
import { connect } from 'mongoose';
import weatherRoutes from './routes/weather.js';
import axios from 'axios';
import { schedule } from 'node-cron';
import cors from 'cors';
import Weather from './models/Weather.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(cors());
app.use(json());

// Connect to MongoDB
connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(err));

// Import routes
app.use('/api/weather', weatherRoutes);

// Fetch weather data periodically (every 5 minutes)
const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const apiKey = process.env.OPENWEATHERMAP_API_KEY;

schedule('*/5 * * * *', async () => {
    for (let city of cities) {
        try {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            const { temp, feels_like } = response.data.main;
            const condition = response.data.weather[0].main;
            const timestamp = response.data.dt;
            const date = new Date(timestamp * 1000).toISOString().split('T')[0]; // Extract date
            // Convert temperature from Kelvin to Celsius
            const tempCelsius = temp - 273.15;
            const feelsLikeCelsius = feels_like - 273.15;

            const weatherData = new Weather({
                city,
                temp: tempCelsius,
                feels_like: feelsLikeCelsius,
                condition,
                timestamp,
                date
            });
            await weatherData.save();
            console.log(`Weather data for ${city} saved`);
        } catch (err) {
            console.error(`Failed to fetch weather data for ${city}:`, err.message);
        }
    }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
