import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, deleteBlog }) => {
  const [viewInfo, setViewInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const viewInfoStyle = {
    margin: '5px',
    paddingLeft: '25px',
    border: '1px solid #ccc',
    color: '#333',
    fontSize: '16px',
    fontWeight: 'normal',
    textAlign: 'left',
    textDecoration: 'none',
  }

  const toggleViewInfo = () => {
    setViewInfo(!viewInfo)
  }

  // const deleteBlog = (blogId) => {
  //   console.log(blogId)
  //   blogService
  //     .deleteBlog(blogId)
  //     .then(() => {
  //       setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
  //     })
  // }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleViewInfo}>
          {viewInfo ? 'hide' : 'view'}
        </button>
        <button onClick={() => deleteBlog(blog.id)}>delete</button>
      </div>
      {viewInfo &&
        <div style={viewInfoStyle}>
          <p>URL: {blog.url}</p>
          <p>
            Likes: {blog.likes}
            <button>like</button>
          </p>
          <p>User: {blog.user.name}</p>
        </div>
      }
    </div>

  )
}

export default Blog