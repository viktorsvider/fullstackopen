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

// this should get and only then put???
// what if 2 different person do like simultaneously
const like = blog => {
  const putUrl = `/api/blogs/${blog.id}`
  blog.likes = blog.likes + 1
  const putResponse = axios.put(putUrl, blog)
  return putResponse.then(response => response.data)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, create, like, setToken }