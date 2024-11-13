import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import FilteredCountries from "./components/FilteredCountries";
import countries from "./services/countries";

function App() {
  const [filter, setFilter] = useState("");
  const [countriesData, setCountriesData] = useState(null);

  useEffect(() => {
    countries
      .getAllCountriesData()
      .then((retreivedData) => {
        setCountriesData(retreivedData.data);
        console.log("Succesfully retreived countries data", retreivedData.data);
      })
      .catch((error) =>
        console.error("Error retrieveing countries data", error)
      );
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  if (countriesData) {
    return (
      <div>
        find countries
        <Filter handleFilterChange={handleFilterChange}></Filter>
        <FilteredCountries
          countriesData={countriesData}
          filter={filter}
        ></FilteredCountries>
      </div>
    );
  } else {
    return <div>Wait till country data is retreived...</div>;
  }
}

export default App;
