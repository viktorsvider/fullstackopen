import { useEffect, useState } from "react";
import weather from "../services/weather";

const Weather = ({ city }) => {
  const [cityWeather, setCityWeather] = useState(null);
  const [iconUrl, setIconUrl] = useState(null);
  useEffect(() => {
    weather
      .getWeatherCity(city)
      .then((response) => {
        setCityWeather(response.data);
        setIconUrl(
          `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        );
      })
      .catch((error) => console.error(error));
  }, []);

  if (cityWeather) {
    return (
      <div>
        <h2>Weather in {city}</h2>
        <p>temperature: {cityWeather.main.temp}</p>
        <img src={iconUrl} alt="no icon"></img>
        <p>wind: {cityWeather.wind.speed} m/s</p>
      </div>
    );
  } else {
    return null;
  }
};

export default Weather;
