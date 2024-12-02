import CountryInfo from "./CountryInfo";
import Button from "./Button";

const Countries = ({ filteredCountries, setCountry }) => {
  if (filteredCountries === null) {
    return null;
  } else if (filteredCountries.length === 1) {
    return <CountryInfo country={filteredCountries[0]}></CountryInfo>;
  } else if (filteredCountries.length <= 10) {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <div>
            <li key={country.name.common}>
              {country.name.common}
              <Button
                text="show"
                handleClick={() => setCountry([country])}
              ></Button>
            </li>
          </div>
        ))}
      </ul>
    );
  } else {
    return <p>Too many matches, specify another filter</p>;
  }
};

export default Countries;
