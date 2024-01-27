import { useState } from 'react'

const Blog = ({ blog, deleteBlog, addLike }) => {
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
            <button onClick={() => addLike(blog)}>like</button>
          </p>
          <p>User: {blog.user.name}</p>
        </div>
      }
    </div>

  )
}

export default Blog