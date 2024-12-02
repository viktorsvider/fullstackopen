import { useEffect, useState } from "react";
import weather from "../services/weather";

const Weather = ({ city }) => {
  const [cityWeather, setCityWeather] = useState(null);
  useEffect(() => {
    weather
      .getWeatherCity(city)
      .then((response) => setCityWeather(response.data))
      .catch((error) => console.error(error));
  }, []);

  console.log(" redraw weather=", cityWeather);
  if (cityWeather) {
    return (
      <div>
        <h2>Weather in {city}</h2>
        <p>temperature: {cityWeather.main.temp}</p>
        <img alt="no icon"></img>
        <p>wind: {cityWeather.wind.speed} m/s</p>
      </div>
    );
  } else {
    return null;
  }
};

export default Weather;
