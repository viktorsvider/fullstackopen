import CountryInfo from "./CountryInfo";

const FilteredCountries = ({ countriesData, filter }) => {
  const filteredCountries = countriesData.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredCountries.length === 1) {
    return <CountryInfo country={filteredCountries[0]}></CountryInfo>;
  } else if (filteredCountries.length <= 10) {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <div>
            <li key={country.name.common}>{country.name.common}</li>
          </div>
        ))}
      </ul>
    );
  } else {
    return <p>Too many matches, specify another filter</p>;
  }
};

export default FilteredCountries;
