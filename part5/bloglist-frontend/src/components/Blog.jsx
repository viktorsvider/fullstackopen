import { useState } from "react"

const Blog = ({ blog }) => {
  const [detailsExposed, setDetailsExposed] = useState(false)

  const handleShowDetails = () => {
    setDetailsExposed(true)
  }
  const handleCollapseDetails = () => {
    setDetailsExposed(false)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (detailsExposed) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title}
          <button onClick={handleCollapseDetails}>hide</button>
        </div>
        <div>
          {blog.url ? "no url" : blog.url}
        </div>
        <div>
          {blog.likes ? 0 : blog.likes}
          <button>like</button>
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