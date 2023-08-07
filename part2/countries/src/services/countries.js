import axios from "axios";

const getAllCountriesData = () => {
  const allCountriesDataEndpoint =
    "https://studies.cs.helsinki.fi/restcountries/api/all";
  const request = axios.get(allCountriesDataEndpoint);
  return request
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const getSpecificCountryData = (country) => {
  const specificCountryEndpoint =
    "https://studies.cs.helsinki.fi/restcountries/api/name/" + country;
  const request = axios.get(specificCountryEndpoint);
  return request
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

let countries = {
  getAllCountriesData: getAllCountriesData,
  getSpecificCountryData: getSpecificCountryData,
};

export default countries;
