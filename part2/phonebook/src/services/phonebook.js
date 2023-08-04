/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const deleteObject = (id) => {
  const url = `${baseUrl}/${id}`;

  return axios
    .delete(url)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        throw new Error("Object not found");
      }
      throw error; // Re-throw the error to propagate it
    });
};

export default {
  getAll: getAll,
  create: create,
  deleteObject: deleteObject,
  update: update,
};
