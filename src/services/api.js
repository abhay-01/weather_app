import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://weather-backend-8ser.onrender.com/api',
});

export default instance;
