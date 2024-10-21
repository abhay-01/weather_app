// backend/models/Weather.js
import { Schema, model } from 'mongoose';

const WeatherSchema = new Schema({
    city: String,
    temp: Number,
    feels_like: Number,
    condition: String,
    timestamp: Number,
    date: String
});

export default model('Weather', WeatherSchema);
