import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState('')

  const compareLikes = (prev, cur) => (prev.likes > cur.likes ? -1 : 1)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort(compareLikes)))
  }, [])

  const blogFormRef = useRef()

  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  useEffect(() => {
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setNotificationMessage('Succesfully logined in')

      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    setUsername('')
    setPassword('')
    window.localStorage.removeItem('loggedUser')
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then((returnedBlog) => setBlogs(blogs.concat(returnedBlog)))
  }

  const likeBlog = async (blogObject) => {
    try {
      await blogService.update(blogObject)
      const fetched = await blogService.getAll()
      setBlogs(fetched.sort(compareLikes))
    } catch (e) {
      console.error(e)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(await blogService.getAll())
    } catch (e) {
      console.error(e)
    }
  }

  if (user === null) {
    return(<>
      <Notification errorMessage={errorMessage} notificationMessage={notificationMessage}></Notification>
      <LoginForm
        handleSubmit={handleSubmit}
        handlePasswordChange={ ({ target })  => setPassword(target.value)}
        handleUsernameChange={ ({ target })  => setUsername(target.value)}
        username={username}
        password={password}
      ></LoginForm>
    </>)
  }
  return (
    <div>
      <Notification errorMessage={errorMessage} notificationMessage={notificationMessage}></Notification>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog}></BlogForm>
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}
          user={user.username}
        />
      ))}
    </div>
  )
}

export default App
