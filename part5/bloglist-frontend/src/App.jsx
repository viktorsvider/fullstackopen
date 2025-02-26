import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [notificationMessage, setNotificationMessage] = useState("")

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
      blogService.setToken(user.token)
    }
  }, [])


  const showError = (errorMessage) => {
    return <div style={{
      fontSize: "24px",
      color: "black",
      background: "red",
      borderColor: "magenta",
      padding: "2px",
      display: "inline",
      border: "5px"
    }}>{errorMessage}</div>
  }


  const showNotification = (notificationMessage) => {
    return <div style={{
      fontSize: "24px",
      color: "black",
      background: "green",
      borderColor: "greenyellow",
      padding: "2px",
      display: "inline",
      border: "5px"
    }}>{notificationMessage}</div>
  }


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername("")
      setPassword("")
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      setNotificationMessage("Succesfully logined in")
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
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

  const handleCreateBlog = async (event) => {
    console.log("handle")
    event.preventDefault()
    const blog = {
      title,
      author,
      url
    }
    const createdBlog = await blogService.create(blog)
    if (createdBlog) {
      setNotificationMessage(`Succesfully created blog ${createdBlog.title} by ${createdBlog.author}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      setBlogs(blogs.concat(createdBlog))
      setAuthor("")
      setTitle("")
      setUrl("")
    }
    else {

      setErrorMessage(`Failed to create blog ${blog.title} by ${blog.author}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  if (user === null) {
    return (
      <div>
        {notificationMessage && showNotification(notificationMessage)}
        {errorMessage !== null && showError(errorMessage)}
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
    {notificationMessage && showNotification(notificationMessage)}
    {errorMessage && showError(errorMessage)}
    <h2>blogs</h2>
    <p>{user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </p>

    <h2>create new</h2>
    <form onSubmit={handleCreateBlog}>
      <div>
        title:<input value={title} onChange={({ target }) => setTitle(target.value)}></input>
      </div>
      <div>
        author:<input value={author} onChange={({ target }) => setAuthor(target.value)}></input>
      </div>
      <div>
        url:<input value={url} onChange={({ target }) => setUrl(target.value)}></input>
      </div>
      <button type='submit' >create</button>
    </form >
    {
      blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
    }
  </div >)
}

export default App