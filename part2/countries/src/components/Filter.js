import { useState, useEffect } from "react";
import "../App.css";

const showInfo = (selectedCountry) => {
  return (
    <div>
      <h1>{selectedCountry.name.common}</h1>
      <div>capital {selectedCountry.capital}</div>
      <div>area {selectedCountry.area}</div>
      <div>
        <strong>languages:</strong>
        <ul>
          {Object.values(selectedCountry.languages).map((val) => (
            <li key={selectedCountry.cca3}>{val}</li>
          ))}
        </ul>
      </div>
      <div>
        <img
          className="flag-pic"
          src={selectedCountry.flags.svg}
          alt={selectedCountry.flags.alt}
        ></img>
      </div>
    </div>
  );
};

const Filter = ({ filter, handleFilterChange, allCountries }) => {
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const filtered = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [filter, allCountries]);

  let filteredCountriesJSX;

  if (filteredCountries.length === 1) {
    let selectedCountry = filteredCountries[0];
    filteredCountriesJSX = showInfo(selectedCountry);
  } else if (filteredCountries.length <= 10) {
    filteredCountriesJSX = (
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.cca3}>
            {country.name.common}
            <button
              id={country.name.common}
              onClick={() => {
                setFilteredCountries([country]);
                console.log("click", country, filteredCountries);
              }}
            >
              show
            </button>
          </li>
        ))}
      </ul>
    );
  } else {
    filteredCountriesJSX = (
      <ul>
        <li key="404">{"Too many matches, specify another filter"}</li>
      </ul>
    );
  }

  return (
    <div>
      find countries
      <input value={filter} onChange={handleFilterChange}></input>
      {filteredCountriesJSX}
    </div>
  );
};

export default Filter;
