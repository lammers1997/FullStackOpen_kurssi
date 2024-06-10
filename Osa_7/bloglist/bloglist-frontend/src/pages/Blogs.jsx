import { Link } from 'react-router-dom'
import Blog from '../components/Blog'

const Blogs = ({ user, blogs, handleDeleteBlog, addLike, blogForm }) => {
  if (!user) {
    return null
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const listStyle = {
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5,
    listStyleType: 'none',
  }
  return (
    <div>
      {blogForm()}
      <br />
      <ul style={listStyle}>
        {blogs.map((blog) => (
          <li key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
