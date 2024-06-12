import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setCommentBlog } from '../reducers/blogReducer'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, deleteBlog, addLike, user }) => {
  const dispatch = useDispatch()

  const [newComment, setNewComment] = useState('')

  if (!user || !blog) {
    return null
  }

  const addComment = () => {
    dispatch(setCommentBlog(blog, newComment))
    setNewComment('')
  }

  //if user exists && if blog.user exists
  const showRemoveButton =
    user && blog.user && user.username === blog.user.username

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes
        <Button variant="secondary" onClick={() => addLike(blog)}>
          like &#x1f44d;
        </Button>
      </p>
      <p>added by {blog.user.name}</p>
      <Button
        variant="danger"
        id="removeButton"
        onClick={() => deleteBlog(blog)}
        style={{ display: showRemoveButton ? 'inline-block' : 'none' }}
      >
        remove
      </Button>
      <h3>Comments</h3>
      <input
        type="text"
        value={newComment}
        name="Comment"
        onChange={(event) => setNewComment(event.target.value)}
        id="comment-input-title"
      />
      <Button variant="success" onClick={addComment}>
        add comment
      </Button>
      {blog.comments.length === 0 ? (
        <p>Be first to comment!</p>
      ) : (
        <ul>
          {blog.comments.map((comment) => (
            <li key={`${Date.now()}-${Math.random()}`}>
              <p>{comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Blog
