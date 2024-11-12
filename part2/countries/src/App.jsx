import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Filter from "./components/Filter.jsx";

function App() {
  const baseurl = "https://studies.cs.helsinki.fi/restcountries/api/all";
  const [countriesData, setCountriesData] = useState(null);
  const [filter, setFilter] = useState("");

  const Info = ({ country }) => {
    // console.log("country=", country);

    // const languageItems = Object.entries(country.languages).map(
    // ([code, name]) => (
    // <li key={code}>
    // {name} ({code})
    // </li>
    // )
    // );
    console.log(
      "=======stringify=============",
      JSON.stringify(Object.entries(country.languages)),
      JSON.stringify(country.languages)
    );

    return (
      <div>
        <h1>{country.name.common}</h1>
        <h3>{country.name.official}</h3>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <b>languages:</b>
        <ul>
          {Object.entries(country.languages).map(([abrev, lang]) => (
            <li key={abrev}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt="NO FLAG"></img>
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
        <p key={country.name.common}>{country.name.common}</p>
      ));
    } else if (filtered.length === 1) {
      console.log("else if");
      return <Info country={filtered[0]}></Info>;
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
