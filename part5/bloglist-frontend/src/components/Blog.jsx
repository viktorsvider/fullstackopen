import { useEffect, useState } from "react";
import blogService from "../services/blogs";

const Blog = (props) => {
  const [detailsExposed, setDetailsExposed] = useState(false);

  const handleShowDetails = () => {
    setDetailsExposed(true);
  };
  const handleCollapseDetails = () => {
    setDetailsExposed(false);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Do you want to delete ${props.blog.title} by ${props.blog.author}`
      )
    ) {
      props.deleteBlog(props.blog.id);
    }
  };

  const showDeleteButton = props.user.id === props.blog.user.id;

  console.log("user.id", props.user.id, "blog.user.id", props.blog.user.id);
  console.log("props", props);
  if (detailsExposed) {
    return (
      <div style={blogStyle}>
        <div>
          {props.blog.title}
          <button onClick={handleCollapseDetails}>hide</button>
        </div>
        <div>{props.blog.url === undefined ? "no url" : props.blog.url}</div>
        <div>
          {props.blog.likes === undefined ? 0 : props.blog.likes}
          <button onClick={() => props.likeBlog(props.blog)}>like</button>
        </div>
        <div>{props.blog.author}</div>
        <div>
          {showDeleteButton && <button onClick={handleDelete}>delete</button>}
        </div>
      </div>
    );
  } else {
    return (
      <div style={blogStyle}>
        {props.blog.title}
        <button onClick={handleShowDetails}>view</button>
      </div>
    );
  }
};

export default Blog;
