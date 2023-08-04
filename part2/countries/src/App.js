import React, { useState, useEffect } from "react";
import "./App.css";
import Filter from "./components/Filter.js";
import countriesService from "./services/countries";
import countries from "./services/countries";
const ButtonArray = ({ countriesCommonNamesArray, allCountries }) => {
  const buttonStyle = {
    backgroundColor: "blue",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    margin: "5px",
    cursor: "pointer",
  };
  return (
    <div>
      {countriesCommonNamesArray.map((countryName, index) => (
        <button
          style={buttonStyle}
          key={index}
          onClick={() => console.log(countryName, allCountries[index])}
        >
          {countryName}
        </button>
      ))}
    </div>
  );
};

function App() {
  const [filter, setFilter] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [commonNames, setCommonNames] = useState([]);

  useEffect(() => {
    countriesService.getAllCountriesData().then((data) => {
      setAllCountries(
        data.sort((a, b) => {
          const nameA = a?.name?.common.toLowerCase() ?? "NULL";
          const nameB = b?.name?.common.toLowerCase() ?? "NULL";

          return nameA.localeCompare(nameB);
        })
      );
      console.log(data);
      setCommonNames(
        data.map((country) => country?.name?.common ?? "no common name").sort()
      );
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="App">
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <ButtonArray
        countriesCommonNamesArray={commonNames}
        allCountries={allCountries}
      ></ButtonArray>
    </div>
  );
}

export default App;
