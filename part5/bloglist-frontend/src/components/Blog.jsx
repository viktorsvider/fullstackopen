import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [detailsExposed, setDetailsExposed] = useState(false)

  const handleShowDetails = () => {
    setDetailsExposed(true)
  }
  const handleCollapseDetails = () => {
    setDetailsExposed(false)
  }

  const handleLike = (blog) => {
    const likedBlog = blogService.like(blog)
    console.log(likedBlog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log("in <blog>", blog)
  if (detailsExposed) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title}
          <button onClick={handleCollapseDetails}>hide</button>
        </div>
        <div>
          {blog.url === undefined ? "no url" : blog.url}
        </div>
        <div>
          {blog.likes === undefined ? 0 : blog.likes}
          <button onClick={() => { handleLike(blog) }}>like</button>
        </div>
        <div>
          {blog.author}
        </div>
      </div>
    )
  }
  else {
    return <div style={blogStyle}>{blog.title}<button onClick={handleShowDetails}>view</button></div>
  }
}

export default Blog