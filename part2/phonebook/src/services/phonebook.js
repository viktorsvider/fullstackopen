import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios
    .post(baseUrl, newObject)
    .catch((error) => console.log(error));
  return request.then((response) => response.data);
};

export default { getAll: getAll, create: create };
