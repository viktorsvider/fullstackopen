import axios from "axios";

const getAllCountriesData = () => {
  const countriesApi = "https://studies.cs.helsinki.fi/restcountries/api/all";
  return axios.get(countriesApi);
};

const getCountryData = (country) => {
  const countryApi = `https://studies.cs.helsinki.fi/restcountries/api/name/${country}`;
  return axios.get(countryApi);
};

export default {
  getCountryData: getCountryData,
  getAllCountriesData: getAllCountriesData,
};
