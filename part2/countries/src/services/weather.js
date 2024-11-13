import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

if (apiKey) {
  console.log("succesful import api key");
} else {
  console.error("failed to import api key");
}

const getWeatherCity = (city) => {
  const weatherUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  return axios.get(weatherUrlCity);
};

const getWeatherCord = (lat, lon) => {
  const weatherCoord = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  return axios.get(weatherCoord);
};

export default {
  getWeatherCity: getWeatherCity,
  getWeatherCord: getWeatherCord,
};
