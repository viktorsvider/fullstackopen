/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const allCountriesEndpoint =
  "https://studies.cs.helsinki.fi/restcountries/api/all";
const specificCountryEndpoint =
  "https://studies.cs.helsinki.fi/restcountries/api/name/";

const getAllCountriesData = () => {
  console.log("getAll");
  const request = axios.get(allCountriesEndpoint);
  return request.then((response) => response.data);
};

const getSpecificCountryData = (countryName) => {
  const request = axios.get(specificCountryEndpoint + countryName);
  return request.then((response) => response.data);
};

export default {
  getAllCountriesData: getAllCountriesData,
  getSpecificCountryData: getSpecificCountryData,
};
