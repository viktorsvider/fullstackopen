import { useState, useEffect } from "react";
import Filter from "./components/Filter.js";
import countries from "./services/countries.js";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    countries
      .getAllCountriesData()
      .then((data) =>
        setAllCountries(data.sort((d1, d2) => d1.name.common > d2.name.common))
      );
  }, []);

  return (
    <div>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
        allCountries={allCountries}
      ></Filter>
    </div>
  );
}

export default App;
