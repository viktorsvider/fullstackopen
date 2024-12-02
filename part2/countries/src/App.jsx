import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import countries from "./services/countries";
import Countries from "./components/Countries";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    countries
      .getAllCountriesData()
      .then((received) => {
        console.log("useeffect countries");
        setCountriesData(received.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    if (filter) {
      setFilteredCountries(
        countriesData.filter((country) => country.name.common.includes(filter))
      );
    }
  };

  if (countriesData) {
    return (
      <div>
        find countries
        <Filter handleFilterChange={handleFilterChange}></Filter>
        <Countries
          filteredCountries={filteredCountries}
          setCountry={setFilteredCountries}
        ></Countries>
      </div>
    );
  } else {
    return <div>Wait till country data is retreived...</div>;
  }
}

export default App;
