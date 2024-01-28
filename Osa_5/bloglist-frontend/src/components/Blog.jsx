import { useState } from 'react'

const Blog = ({ blog, deleteBlog, addLike, user }) => {
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

  //if user exists && if blog.user exists
  const showRemoveButton = user && blog.user && user.username === blog.user.username

  return (
    <li className='blog'>
      <div style={blogStyle}>
        <div>
          <p>{blog.title} {blog.author}</p>
          <button onClick={toggleViewInfo}>
            {viewInfo ? 'hide' : 'view'}
          </button>
        </div>
        {viewInfo &&
          <div style={viewInfoStyle} className = 'toggleMoreInfo'>
            <p>{blog.url}</p>
            <p>
              likes {blog.likes}
              <button onClick={() => addLike(blog)}>like</button>
            </p>
            <p>{blog.user.name}</p>
            <button onClick={() => deleteBlog(blog)} style={{ display: showRemoveButton ? 'inline-block' : 'none' }}>
              remove
            </button>
          </div>
        }
      </div>
    </li>

  )
}

export default Blog