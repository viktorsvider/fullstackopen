import React, { useState, useEffect } from "react";
import "./App.css";
import Filter from "./components/Filter.js";
import countriesService from "./services/countries";
import countries from "./services/countries";
import ButtonArray from "./components/ButtonArray";

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
      <ButtonArray commonNames={commonNames}></ButtonArray>
    </div>
  );
}

export default App;
