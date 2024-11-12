import { useState, useEffect } from "react";
// import "./App.css";
import axios from "axios";
import Filter from "./components/Filter.jsx";

// useEffect(() => {
//   fetchWeather(country.capital[0]);
//   console.log("on filter change:", filter);
// }, [filter]);

function App() {
  const baseurl = "https://studies.cs.helsinki.fi/restcountries/api/all";
  const [countriesData, setCountriesData] = useState(null);
  const [filter, setFilter] = useState("");
  const weather_api_key = import.meta.env.VITE_WEATHER_API_KEY;
  const [weather, setWeather] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const fetchWeather = (city) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_api_key}`;
    console.log(">city:", city);
    console.log(">", weatherUrl);
    axios
      .get(weatherUrl)
      .catch((error) => console.error(error))
      .then((retrievedData) => {
        setWeather(retrievedData.data);
        console.log(retrievedData.data);
      });
  };

  const Weather = ({ city }) => {
    // current weather in place
    // GET https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    // OR
    // GET https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

    console.log("weather STATE before component render:", weather);
    return (
      <div>
        <h2>Weather in {city}</h2>
        <p>temperature: {weather.main.temp}</p>
        <img alt="no icon"></img>
        <p>wind: {weather.wind.speed} m/s</p>
      </div>
    );
  };

  const Button = ({ text, handleClick }) => {
    return <button onClick={handleClick}>{text}</button>;
  };

  const Info = ({ country }) => {
    // console.log("country=", country);

    // const languageItems = Object.entries(country.languages).map(
    // ([code, name]) => (
    // <li key={code}>
    // {name} ({code})
    // </li>
    // )
    // );
    // console.log(
    //   "=======stringify=============",
    //   JSON.stringify(Object.entries(country?.languages ?? "null or undefined")),
    //   JSON.stringify(country.languages)
    // );
    useEffect(() => {
      if (selectedCountry && selectedCountry.capital) {
        const fetchWeather = async () => {
          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital[0]}&appid=${weather_api_key}&units=metric`
            );
            setWeather(response.data);
          } catch (error) {
            console.error("Error fetching weather data:", error);
          }
        };

        fetchWeather();
      }
    }, [selectedCountry]);

    return (
      <div>
        <h1>{country.name.common}</h1>
        <h3>{country.name.official}</h3>
        <p>capital: {country?.capital || "no capital info"}</p>
        <p>area: {country?.area || "no area info"}</p>
        <b>languages:</b>
        {
          <ul>
            {Object.entries(
              country?.languages || { abrev: "no lang info" }
            ).map(([abrev, lang]) => (
              <li key={abrev}>{lang}</li>
            ))}
          </ul>
        }
        <img src={country.flags.png} alt="NO FLAG"></img>
        {weather && <Weather city={country.capital}></Weather>}
      </div>
    );
  };

  const FilteredCountries = ({ filter, countriesData }) => {
    const filtered = countriesData.filter((country) =>
      country.name.common.includes(filter)
    );
    console.log("filtered=", filtered, filtered.length);

    if (filtered.length <= 10 && filtered.length > 1) {
      return filtered.map((country) => (
        <>
          <p key={country.name.common}>{country.name.common}</p>
          <Button
            text="show"
            handleClick={() => {
              setSelectedCountry(filtered[0]);
            }}
          ></Button>
        </>
      ));
    } else if (filtered.length === 1) {
      console.log("else if");
      return <Info country={filtered[0]}></Info>;
    } else {
      return null;
    }
  };

  useEffect(() => {
    axios
      .get(baseurl)
      .then((retrievedData) => {
        setCountriesData(retrievedData.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleFilterChange = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  };

  if (countriesData) {
    return (
      <div>
        <Filter
          filter={filter}
          handleFilterChange={handleFilterChange}
        ></Filter>
        <FilteredCountries
          filter={filter}
          countriesData={countriesData}
        ></FilteredCountries>
      </div>
    );
  } else {
    return <p>Wait until retrieving countries data...</p>;
  }
}

export default App;
