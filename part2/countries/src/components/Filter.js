import React, { useState, useEffect } from "react";
import "../App.css";
const Filter = ({ filter, handleFilterChange, allCountries }) => {
  const [filteredCountries, setFilteredCountries] = useState([]);
  useEffect(() => {
    // Filter countries based on the filter value
    const filtered = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [filter, allCountries]);

  let filteredCountriesJSX;

  if (filteredCountries.length === 1) {
    let selectedCountry = filteredCountries[0];
    filteredCountriesJSX = (
      <div>
        <h1>{selectedCountry.name.common}</h1>
        <div>capital {selectedCountry.capital}</div>
        <div>area {selectedCountry.area}</div>
        <div>
          <strong>languages:</strong>
          <ul>
            {Object.values(selectedCountry.languages).map((val) => (
              <li>{val}</li>
            ))}
          </ul>
        </div>
        <div className="emoji-big">{selectedCountry.flag}</div>
        <div>
          <img
            className="flag-pic"
            src={selectedCountry.flags.svg}
            alt={selectedCountry.flags.alt}
          ></img>
        </div>
      </div>
    );
    // Display single country name directly
  } else if (filteredCountries.length <= 10) {
    filteredCountriesJSX = (
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.cca3}>{country.name.common}</li>
        ))}
      </ul>
    );
  } else {
    filteredCountriesJSX = (
      <ul>
        <li>{"Too many matches, specify another filter"}</li>
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
