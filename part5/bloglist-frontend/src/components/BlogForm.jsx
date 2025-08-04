import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      author,
      title,
      url,
    });

    setAuthor("");
    setUrl("");
    setTitle("");
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          ></input>
        </div>
        <div>
          author:
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          ></input>
        </div>
        <div>
          url:
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          ></input>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default BlogForm;
