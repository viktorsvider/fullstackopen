import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");

  const compareLikes = (prev, cur) => (prev.likes > cur.likes ? -1 : 1);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort(compareLikes)));
  }, []);

  const blogFormRef = useRef();

  const loggedUserJSON = window.localStorage.getItem("loggedUser");
  useEffect(() => {
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showError = (errorMessage) => {
    return (
      <div
        style={{
          fontSize: "24px",
          color: "black",
          background: "red",
          borderColor: "magenta",
          padding: "2px",
          display: "inline",
          border: "5px",
        }}
      >
        {errorMessage}
      </div>
    );
  };

  const showNotification = (notificationMessage) => {
    return (
      <div
        style={{
          fontSize: "24px",
          color: "black",
          background: "green",
          borderColor: "greenyellow",
          padding: "2px",
          display: "inline",
          border: "5px",
        }}
      >
        {notificationMessage}
      </div>
    );
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername("");
      setPassword("");
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setNotificationMessage("Succesfully logined in");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch (exception) {
      console.log("here", exception);
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    setUser(null);
    setUsername("");
    setPassword("");
    window.localStorage.removeItem("loggedUser");
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();

    blogService
      .create(blogObject)
      .then((returnedBlog) => setBlogs(blogs.concat(returnedBlog)));
  };

  const likeBlog = async (blogObject) => {
    try {
      const updated = await blogService.update(blogObject);
      console.log(updated);
      const fetched = await blogService.getAll();
      setBlogs(
        fetched
          .map((blog) => (blog.id === updated.id ? updated : blog))
          .sort(compareLikes)
      );
    } catch (e) {
      console.error(e);
    }
  };

  const deleteBlog = async (id) => {
    console.log("deleteBlog");
    try {
      await blogService.deleteBlog(id);
      setBlogs(await blogService.getAll());
    } catch (e) {
      console.error(e);
    }
  };

  if (user === null) {
    return (
      <div>
        {notificationMessage && showNotification(notificationMessage)}
        {errorMessage !== null && showError(errorMessage)}
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            ></input>
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            ></input>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }
  return (
    <div>
      {notificationMessage && showNotification(notificationMessage)}
      {errorMessage && showError(errorMessage)}
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
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
