import { useEffect, useState } from "react"
import blogService from '../services/blogs'

const Blog = (props) => {
  const [detailsExposed, setDetailsExposed] = useState(false)

  const handleShowDetails = () => {
    setDetailsExposed(true)
  }
  const handleCollapseDetails = () => {
    setDetailsExposed(false)
  }


  // const handleLike = async (blog) => {
  //   const likedBlog = await blogService.like(blog)
  // }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log("props", props)
  console.log("in <blog>", props.blog)
  if (detailsExposed) {
    return (
      <div style={blogStyle}>
        <div>
          {props.blog.title}
          <button onClick={handleCollapseDetails}>hide</button>
        </div>
        <div>
          {props.blog.url === undefined ? "no url" : props.blog.url}
        </div>
        <div>
          {props.blog.likes === undefined ? 0 : props.blog.likes}
          <button onClick={() => props.likeBlog(props.blog)}>like</button>
        </div>
        <div>
          {props.blog.author}
        </div>
      </div>
    )
  }
  else {
    return <div style={blogStyle}>{props.blog.title}<button onClick={handleShowDetails}>view</button></div>
  }
}

export default Blog