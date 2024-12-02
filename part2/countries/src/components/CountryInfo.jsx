import Weather from "./Weather";

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital ? country.capital[0] : "no capital"}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {country.languages ? (
          Object.entries(country.languages).map(([abrev, lang]) => (
            <li key={abrev}>{lang}</li>
          ))
        ) : (
          <li key="no lang">no official language</li>
        )}
      </ul>
      <img src={country.flags.png} alt="error loading flag"></img>
      <Weather city={country.capital[0]}></Weather>
    </div>
  );
};

export default CountryInfo;
