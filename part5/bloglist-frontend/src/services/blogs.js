import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
  console.log(token)
}

const create = async newBlog => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const postResponse = await axios.post(baseUrl, newBlog, config)
  return postResponse.data
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, create, setToken }