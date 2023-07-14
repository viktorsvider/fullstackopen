/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const create = (newObject) => {
  const request = axios
    .post(baseUrl, newObject)
    .catch((error) => console.log(error));
  return request
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const deleteObject = (id) => {
  const url = baseUrl + "/" + id;
  axios.delete(url).catch((error) => console.log(error));
};

export default { getAll: getAll, create: create, deleteObject: deleteObject };
