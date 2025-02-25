import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import login from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // loginService.setToken(user.token)
    }
  }, [])


  const renderError = (errorMessage) => {
    return <div style={{
      fontSize: "24px",
      color: "black",
      background: "red",
      padding: "2px",
      display: "inline",
      border: "5px"
    }}>{errorMessage}</div>
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername("")
      setPassword("")
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
    } catch (exception) {
      setErrorMessage("Wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    setUsername("")
    setPassword("")
    window.localStorage.removeItem("loggedUser")
  }

  if (user === null) {
    return (
      <div>
        {errorMessage !== null && renderError(errorMessage)}
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}></input>
          </div>
          <div>
            password
            <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}></input>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  return (<div>
    <h2>blogs</h2>
    <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>


    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>)
}
export default App