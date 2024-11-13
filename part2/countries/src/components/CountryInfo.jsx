const CountryInfo = ({ country }) => {
  console.log(country.languages instanceof Object);
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
    </div>
  );
};

export default CountryInfo;
