import { Link } from 'react-router-dom'
import Blog from '../components/Blog'
import { ListGroup } from 'react-bootstrap'

const Blogs = ({ user, blogs, blogForm }) => {
  if (!user) {
    return (
      <div>
        <p>Please login to see blogs!</p>
      </div>
    )
  }

  return (
    <div>
      {blogForm()}
      <br />
      <ListGroup numbered>
        {blogs.map((blog) => (
          <ListGroup.Item key={blog.id} variant="primary">
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default Blogs
